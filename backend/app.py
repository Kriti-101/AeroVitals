from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_chatbot_response  # Ensure this imports the correct function
from music import should_play_music  # Ensure this imports the correct function

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message', '')  # Get the message sent by the user
    response = get_chatbot_response(user_input)  # Get the chatbot's response
    return jsonify({'response': response})  # Return the response as JSON

@app.route('/heartrate', methods=['POST'])
def heart_rate():
    hr = request.json.get('heart_rate')  # Get the heart rate
    play_music = should_play_music(hr)  # Check if we need to play calming music
    return jsonify({'play_music': play_music})  # Return the result

if __name__ == '__main__':
    app.run(debug=True)
