import requests
import os
from dotenv import load_dotenv

# Load Hugging Face token from .env file
load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

# API settings
API_URL = "https://api-inference.huggingface.co/models/gpt2"
headers = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

def test_chatbot():
    """Test the chatbot API with a simple text input."""
    if not HF_TOKEN:
        print("Error: HF_TOKEN not found in environment variables.")
        return
    
    test_input = "I have a headache"
    payload = {
        "inputs": f"Medical emergency on flight: {test_input}",
        "parameters": {"temperature": 0.7, "max_new_tokens": 100}
    }

    try:
        print(f"Testing with input: {test_input}")
        response = requests.post(API_URL, headers=headers, json=payload)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            output = response.json()
            print(f"Success! Response: {output}")
        else:
            print(f"Error: {response.status_code}")
            print(f"Response Text: {response.text}")
            
    except Exception as e:
        print(f"Exception: {str(e)}")

if __name__ == "__main__":
    test_chatbot() 