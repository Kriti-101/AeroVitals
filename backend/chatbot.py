import requests
import os
import speech_recognition as sr
import pyttsx3
from dotenv import load_dotenv

# Load Hugging Face token from .env file
load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

# API settings
API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta"
headers = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

# Initialize text-to-speech engine
engine = pyttsx3.init()

def speak(text):
    """Convert text to speech."""
    engine.say(text)
    engine.runAndWait()

def listen():
    """Capture voice input from the user and convert it to text."""
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("🎤 Listening...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
        try:
            print("🧠 Recognizing...")
            return recognizer.recognize_google(audio)
        except sr.UnknownValueError:
            return "Sorry, I didn't catch that."
        except sr.RequestError:
            return "Speech recognition service is unavailable."

def get_chatbot_response(user_input):
    """Send user input to the Hugging Face model and return the response."""
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

# Main loop for interaction
if __name__ == "__main__":
    speak("Hello, I am your inflight medical assistant. How can I help you?")
    while True:
        user_input = listen()
        print(f"You said: {user_input}")
        
        if "exit" in user_input.lower() or "stop" in user_input.lower():
            speak("Goodbye! Stay safe.")
            break

        response = get_chatbot_response(user_input)
        print(f"Assistant: {response}")
        speak(response)
