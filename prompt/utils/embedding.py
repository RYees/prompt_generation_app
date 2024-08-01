from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_core.documents import Document
from langchain.embeddings import HuggingFaceEmbeddings
import numpy as np
import openai
import uuid
from scipy.spatial.distance import cosine
from dotenv import dotenv_values


class EmbeddingResource:    
    def bge_model_embedding(chunked_list):
        try:
            model_name = "BAAI/bge-base-en-v1.5"
            model_kwargs = {"device":'cpu'}
            encode_kwargs = {'normalize_embeddings':True}

            hf = HuggingFaceEmbeddings(
                model_name = model_name,
                model_kwargs = model_kwargs,
                encode_kwargs = encode_kwargs
            )
            embedded_docs = [hf.embed_query(doc.page_content) for doc in chunked_list]
            return embedded_docs
        except Exception as e:
            return f'Error: {str(e)}'   

 