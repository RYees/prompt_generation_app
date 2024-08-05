## Database connection ##
import pandas.io.sql as sqlio
import psycopg2 as ps
from sqlalchemy import text
from sqlalchemy import create_engine, Column, Integer, String, Float, Table, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_community.vectorstores import SupabaseVectorStore
from supabase.client import create_client
import pandas as pd
import openai
import json
from flask import request, jsonify
from dotenv import dotenv_values

env_vars = dotenv_values('../.env')
openai.api_key = env_vars.get('OPENAI_API_KEY')
openai_client = openai.OpenAI(api_key=openai.api_key)
supabase_url=env_vars.get('SUPABASE_URL')
supabase_key=env_vars.get('SUPABASE_KEY')

def store_to_supabase_for_promptdb(docs: list):
    try:
        embeddings = OpenAIEmbeddings(model="text-embedding-3-small", openai_api_key=openai.api_key)
        supabase_client = create_client(supabase_url, supabase_key)
        vector_store = SupabaseVectorStore.from_documents(
            docs,
            embeddings,
            client=supabase_client,
            table_name="prompts",
            query_name="match_prompts",
            chunk_size=500,
        )
        return vector_store
    except Exception as e:
        return f'Error: {str(e)}'    

def fetch_stored_embedding_from_promptdb():
    print(env_vars.get('SUPABASE_URL'))
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small", openai_api_key=openai.api_key)
    supabase_client = create_client(supabase_url, supabase_key)
    vector_store = SupabaseVectorStore(
        client=supabase_client,
        embedding=embeddings,
        table_name="prompts",
        query_name="match_prompts",
    )
    return vector_store
    
def db_connection_psycopg():    
    try:
        pgconn = ps.connect(dbname="postgres",
                        user= "postgres.aupiqrhfzctlqrqcybxu",
                        password= "CaUUHclMrtNUe3Vt",
                        host="aws-0-eu-central-1.pooler.supabase.com",
                        port="6543")
        return pgconn
    except Exception as e:
        return f'Error: {str(e)}'    

def db_read_table_psycopg(pgconn) -> None:
    try:
        sql = """ SELECT * FROM prompts """
        df = sqlio.read_sql_query(sql, pgconn)
        return df
    except Exception as e:
        return f'Error: {str(e)}'
    
def db_insert_data_psycopg(pgconn, prompt):
    try:
        cur = pgconn.cursor()
        sql = "INSERT INTO prompts (prompt) VALUES (%s)"
        values = (prompt,)
        cur.execute(sql, values)
        pgconn.commit()
        return "Data inserted successfully!"
    except Exception as e:
        pgconn.rollback()
        return f'Error: {str(e)}'

def db_connection_sqlalchemy():
    try:   
        engine = create_engine('postgresql://postgres.aupiqrhfzctlqrqcybxu:CaUUHclMrtNUe3Vt@aws-0-eu-central-1.pooler.supabase.com:6543/postgres')
        return engine
    except Exception as e:
            return f'Error: {str(e)}'

def db_create_table_sqlalchemy(engine, tablename) -> None:
    try:
        meta = MetaData()
        TableCreation = Table(
            tablename, meta
        )
        meta.create_all(engine)
    except Exception as e:
        return f'Error: {str(e)}'


# import os
# def file_reader(path):
#     try:
#         print("blow")
#         fname = os.path.join(path)
#         print(fname)
#         with open(fname, 'r') as f:
#             system_message = f.read()
#             print(system_message)
#         return system_message
#     except Exception as e:
#         return f'Error: {str(e)}'    
    
# file_reader("./main/contexts/possible_prompts_from_doc.txt")