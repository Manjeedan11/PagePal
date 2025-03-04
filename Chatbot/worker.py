import os
import requests
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from langchain.chains import ConversationalRetrievalChain
from langchain.document_loaders import PyPDFLoader
from dotenv import load_dotenv
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.llms import HuggingFaceHub

# Load environment variables
load_dotenv()

# Initialize global variables
conversation_retrieval_chain = None
chat_history = []
llm_embeddings = None

# Function to initialize the embeddings using Hugging Face Transformers
def init_embeddings():
    global llm_embeddings
    print("Initializing embeddings...")
    model_name = "sentence-transformers/all-MiniLM-L6-v2"
    llm_embeddings = HuggingFaceEmbeddings(model_name=model_name)

# Function to process a PDF document
def process_document(document_path):
    global conversation_retrieval_chain, llm_embeddings
    
    # Create the uploads directory if it does not exist
    current_dir = os.path.dirname(__file__)

    if not os.path.exists(os.path.join(current_dir, 'uploads')):
        os.makedirs(os.path.join(current_dir, 'uploads'))
    
    # Load the document from the uploads directory instead of passing it as an argument to this function.
    loader = PyPDFLoader(document_path)
    documents = loader.load()
    
    # Split the document into chunks.
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    
    # Split each document into chunks.
    texts = text_splitter.split_documents(documents)
    
    # Create a vector store from the document chunks.
    db = Chroma.from_documents(texts, llm_embeddings)
    
    # Create a retriever interface from the vector store.
    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 2})
    
     # Create a conversational retrieval chain from the retriever.
    llm = HuggingFaceHub(repo_id="t5-small", model_kwargs={"temperature": 0.5, "max_length": 512})
    conversation_retrieval_chain = ConversationalRetrievalChain.from_llm(llm, retriever)

# Function to process a user prompt.
def process_prompt(prompt):
   global conversation_retrieval_chain
    
   # If conversation_retrieval_chain is not initialized, raise an error.
   if conversation_retrieval_chain is None:
       raise ValueError("Conversation retrieval chain is not initialized. Please process a document first.")
   
   context=conversation_retrieval_chain({"question": prompt})
   
   return context["answer"]
