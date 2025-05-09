import requests
import os
from dotenv import load_dotenv

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")  # stored in your .env file

API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta"
headers = {
    "Authorization": f"Bearer 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",
    "Content-Type": "application/json"
}

def get_chatbot_response(user_input):
    payload = {
        "inputs": f"<|system|>You are an inflight medical assistant.<|user|>{user_input}<|assistant|>",
        "parameters": {"temperature": 0.7, "max_new_tokens": 256}
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code == 200:
        output = response.json()
        return output[0]["generated_text"].split("<|assistant|>")[-1].strip()
    else:
        return f"[Error] {response.status_code}: {response.text}"

# def get_chatbot_response(user_input):
#     # Simulate basic response logic
#     user_input_lower = user_input.lower()

#     if "choking" in user_input_lower:
#         return "If someone is choking, encourage them to cough. If they cannot breathe, perform the Heimlich maneuver immediately."
#     elif "stress" in user_input_lower:
#         return "Try deep breathing, listening to calming music, and focusing on slow, steady breaths."
#     elif "heart" in user_input_lower:
#         return "A high heart rate may indicate stress or other health issues. Monitor it closely and seek help if needed."
#     else:
#         return "I'm here to help with inflight medical issues. You can ask me about first aid or stress management."
