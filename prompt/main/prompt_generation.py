from prompt.main.base import (
    BaseResource
)
from prompt.utils.database import fetch_stored_embedding_from_promptdb
from prompt.utils.reranking import CrossEncoderReranker
from prompt.utils.file import FileReader
from prompt.utils.prompt_evalutation import prompt_evaluation, test_case_evaluation
import os, json
import openai
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_core.documents import Document
from langchain_community.vectorstores import SupabaseVectorStore
from supabase.client import create_client
from langchain.docstore.document import Document
from flask import request, jsonify
from tenacity import retry, stop_after_attempt, wait_exponential
from dotenv import dotenv_values

env_vars = dotenv_values('.env')
openai.api_key = env_vars.get('OPENAI_API_KEY')
openai_client = openai.OpenAI(api_key=openai.api_key)
SUPABASE_URL = env_vars.get('SUPABASE_URL')
SUPABASE_KEY = env_vars.get('SUPABASE_KEY')

CANDIDATE_MODEL = 'gpt-4'
CANDIDATE_MODEL_TEMPERATURE = 0.9
NUMBER_OF_PROMPTS = 2
N_RETRIES = 3
WANDB_PROJECT_NAME = "mine-gpt-prompt-eng" 
WANDB_RUN_NAME = None 
EVAL_MODEL = 'gpt-3.5-turbo'
EVAL_MODEL_TEMPERATURE = 0
EVAL_MODEL_MAX_TOKENS = 1



class GeneratingTestCasesWithLLM(BaseResource):
    def post(self):
        try:
            value = request.get_json()
            description = value.get('description')
            number_of_tests = value.get('number_of_tests')
            test_data = self.generate_test_cases(description, number_of_tests)
            test_cases = self.get_test_data(test_data[0])
            return test_cases
        except Exception as e:
            return f'Error: {str(e)}'  
        
    @retry(stop=stop_after_attempt(N_RETRIES), wait=wait_exponential(multiplier=1, min=4, max=70))
    def generate_test_cases(self, description, number_of_tests):
        outputs = openai_client.chat.completions.create(
            model=CANDIDATE_MODEL,
            messages=[
                {"role": "system", "content":  FileReader.file_reader("./contexts/gen_system_test_cases.txt")},
                {"role": "user", "content": f"Here is the description of the use-case: `{description.strip()}`\n\n Here is the number of test cases you should create {number_of_tests}\n\n Do not add \n in you responses.\n\nRespond with your test case prompts, and nothing else. Be creative."}
                ],
            temperature=CANDIDATE_MODEL_TEMPERATURE,
            )

        prompts = []

        for i in outputs.choices:
            prompts.append(i.message.content)
        return prompts
    
    def get_test_data(self, test_data):
        data = json.loads(test_data)
        return data

class PromptGenerationForTestCases(BaseResource):
    @retry(stop=stop_after_attempt(N_RETRIES), wait=wait_exponential(multiplier=1, min=4, max=70))
    def post(self):
        try:
            value = request.get_json()
            description = value.get('description')
            test_cases = value.get('test_cases')
            number_of_prompts = value.get('number_of_prompts')
            outputs = openai_client.chat.completions.create(
                model=CANDIDATE_MODEL,
                messages=[
                    {"role": "system", "content": FileReader.file_reader("./contexts/gen_system_prompt.txt")},
                    {"role": "user", "content": f"Here are the test cases:`{test_cases}`\n\nHere is the description of the use-case: `{description.strip()}`\n\nRespond with your prompt, and nothing else. Be creative."}
                    ],
                temperature=CANDIDATE_MODEL_TEMPERATURE,
                n=number_of_prompts,
                # headers=HEADERS
                )

            candidate_prompts = []

            for i in outputs.choices:
                candidate_prompts.append(i.message.content)
   
            eval_test_cases = test_case_evaluation(candidate_prompts)
            return eval_test_cases
        except Exception as e:
            return f'Error: {str(e)}'    
    # test on the prompts is needed here on the candidate prompts
    
class SimilaritySearchPromptGenerate(BaseResource):
    def post(self):
        try:
            value = request.get_json()
            user_picked_prompt = value.get('user_picked_prompt')
            number_of_prompts = value.get('number_of_prompts')
            vector_store = fetch_stored_embedding_from_promptdb()     
            context = vector_store.similarity_search(user_picked_prompt)
            ranked_docs = CrossEncoderReranker.cross_encoder_reranker(user_picked_prompt, context)
            final_prompts_from_the_rag = self.generate_candidate_prompts(user_picked_prompt, ranked_docs, number_of_prompts)
            print(final_prompts_from_the_rag)
            eval_final_prompts = prompt_evaluation(final_prompts_from_the_rag)

            return eval_final_prompts
        except Exception as e:
            return f'Error: {str(e)}'    
    
    @retry(stop=stop_after_attempt(N_RETRIES), wait=wait_exponential(multiplier=1, min=4, max=70))
    def generate_candidate_prompts(self, user_picked_prompt, ranked_docs, number_of_prompts):
        try:            
            context = ranked_docs            
            outputs = openai_client.chat.completions.create(
                model=CANDIDATE_MODEL,
                messages=[
                    {"role": "system", "content": FileReader.file_reader("./contexts/candidate_gen_system_prompt.txt")},
                    {"role": "user", "content": f"Here are the context:`{context}`\n\n  and these is the user input:{user_picked_prompt}\n\nRespond with your prompt, and nothing else. Be creative.\n\n If the context and user input are unrelated at all semantically, Respond by saying unrelated data is given, no prompt is generated!"}
                    ],
                temperature=CANDIDATE_MODEL_TEMPERATURE,
                n=number_of_prompts
                )

            final_prompts_from_the_rag = []

            for i in outputs.choices:
               final_prompts_from_the_rag.append(i.message.content)
            return final_prompts_from_the_rag
        except Exception as e:
            return f'Error: {str(e)}'    
         # test on the prompts is needed here on the candidate prompts