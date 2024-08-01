from prompt.main.base import (
    BaseResource
)
from prompt.utils.database import db_insert_data_psycopg, db_connection_psycopg, db_read_table_psycopg
import os
import openai
from langchain_community.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.docstore.document import Document
from prompt.utils.chunking import ChunkingApproaches
from prompt.utils.embedding import EmbeddingResource
from prompt.utils.database import store_to_supabase_for_promptdb
from prompt.utils.file import FileReader
from scipy.spatial.distance import cosine
import numpy as np
from flask import request, jsonify
from tenacity import retry, stop_after_attempt, wait_exponential
from dotenv import dotenv_values

env_vars = dotenv_values('.env')
openai.api_key = env_vars.get('OPENAI_API_KEY')
openai_client = openai.OpenAI(api_key=openai.api_key)


CANDIDATE_MODEL = 'gpt-4'
CANDIDATE_MODEL_TEMPERATURE = 0.9
NUMBER_OF_PROMPTS = 2
N_RETRIES = 3
WANDB_PROJECT_NAME = "mine-gpt-prompt-eng" 
WANDB_RUN_NAME = None 
EVAL_MODEL = 'gpt-3.5-turbo'
EVAL_MODEL_TEMPERATURE = 0
EVAL_MODEL_MAX_TOKENS = 1


class UploadDocResource(BaseResource):
    def post(self):
        try:
            value = request.get_json()
            file_path = value.get('file_path')
            documents = FileReader.pdf_reader_to_document_format(file_path)
            chunked_list = ChunkingApproaches.chunking_RecursiveCharacterTextSplitter(documents)
            embedded_docs = EmbeddingResource.bge_model_embedding(chunked_list)
            filtered_list = self.filtering_unique_embeds(chunked_list, embedded_docs)    
            self.generate_candidate_prompts_from_uploaded_doc(filtered_list, NUMBER_OF_PROMPTS)     
            return {"response": "Document Successfully Analysed and Saved"}, 200
        except Exception as e:
            return f'Error: {str(e)}'   
        
    def filtering_unique_embeds(self, line_list, embedded_docs):
        try:
            similarity_matrix = np.zeros((len(embedded_docs), len(embedded_docs)))
            for i, emb1 in enumerate(embedded_docs):
                for j, emb2 in enumerate(embedded_docs):
                    similarity_matrix[i, j] = 1 - cosine(emb1, emb2)

            filtered_indices = []
            similarity_threshold = 0.8
            for i in range(len(embedded_docs)):
                if i not in filtered_indices:
                    for j in range(i + 1, len(embedded_docs)):
                        if similarity_matrix[i, j] > similarity_threshold:
                            if similarity_matrix[i, j] > similarity_matrix[j, i]:
                                filtered_indices.append(j)
                            else:
                                filtered_indices.append(i)
                                break

            filtered_line_list = [line_list[i] for i in set(range(len(line_list))) - set(filtered_indices)]
            filtered_list = [page.page_content for page in filtered_line_list]
            return filtered_list
        except Exception as e:
            return f'Error: {str(e)}'   
        
    @retry(stop=stop_after_attempt(N_RETRIES), wait=wait_exponential(multiplier=1, min=4, max=70))
    def generate_candidate_prompts_from_uploaded_doc(self, chunked_contents, number_of_prompts):
        try:
            possible_prompts_from_doc = self.file_reader("./contexts/possible_prompts_from_doc.txt")
            outputs = openai_client.chat.completions.create(
                model=CANDIDATE_MODEL,
                messages=[
                    {"role": "system", "content": possible_prompts_from_doc},
                    {"role": "user", "content": f"Here are list of data:`{chunked_contents}`\n\nRespond with your prompt, and nothing else. Be creative."}
                    ],
                temperature=CANDIDATE_MODEL_TEMPERATURE,
                n=number_of_prompts
                )

            possible_prompts = []

            for i in outputs.choices:
                possible_prompts.append(i.message.content)
            
            documents = self.convert_prompts_to_documents(possible_prompts)   
            store_to_supabase_for_promptdb(documents)
            return "Prompts Stored Successfully!"
        except Exception as e:
            return f'Error: {str(e)}' 

    def convert_prompts_to_documents(self, prompts):
        documents = []
        for index, prompt in enumerate(prompts):
            document = Document(page_content=prompt, metadata={'index': index})
            documents.append(document)
        return documents

    
    def file_reader(self, path: str ) -> str:
        try:
            fname = os.path.join(path)
            with open(fname, 'r') as f:
                system_message = f.read()
            return system_message
        except Exception as e:
            return f'Error: {str(e)}'    
        
    # def save_to_vectorstore(pgcon):
    #     try:
    #         prompt_db = db_read_table_psycopg(pgcon)
    #         prompt_docs = [Document(page_content=prompt) for prompt in prompt_db["prompt"]]
    #         embed = OpenAIEmbeddings(model="text-embedding-3-small", openai_api_key=openai.api_key)
    #         vectorstore = FAISS.from_documents(prompt_docs, embed)
    #         return vectorstore
    #     except Exception as e:
    #         return f'Error: {str(e)}'    
