from langchain.text_splitter import CharacterTextSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter

class ChunkingApproaches:
    def chunking_RecursiveCharacterTextSplitter(pdf_doc):
        text = '\n\n'.join([page.page_content for page in pdf_doc])
        text_splitter = RecursiveCharacterTextSplitter(
            separators=["\n\n", "\n", " "],
            chunk_size=200,
            chunk_overlap=100,
            length_function=len,
            is_separator_regex=False
        )

        chunk_list = text_splitter.create_documents([text])
        return chunk_list