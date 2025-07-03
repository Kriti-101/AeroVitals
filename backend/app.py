from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_chatbot_response  # Ensure this imports the correct function
from music import should_play_music  # Ensure this imports the correct function
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load models and encoders
sleep_model = joblib.load('sleep_disorder_pred_v2.pkl')
stress_model = joblib.load('stress_level_pred_v2.pkl')

# Load label encoders if they exist
try:
    sleep_le = joblib.load('sleep_disorder_label_encoder.pkl')
except:
    sleep_le = None

try:
    stress_le = joblib.load('stress_level_label_encoder.pkl')
except:
    stress_le = None

@app.route('/chat', methods=['POST'])
def chat():
    if request.json is not None:
        user_input = request.json.get('message', '')  # Get the message sent by the user
    else:
        user_input = ''
    response = get_chatbot_response(user_input)  # Get the chatbot's response
    return jsonify({'response': response})  # Return the response as JSON

@app.route('/heartrate', methods=['POST'])
def heart_rate():
    if request.json is not None:
        hr = request.json.get('heart_rate')  # Get the heart rate
    else:
        hr = None
    play_music = should_play_music(hr)  # Check if we need to play calming music
    return jsonify({'play_music': play_music})  # Return the result

@app.route('/predict_sleep_disorder', methods=['POST'])
def predict_sleep_disorder():
    data = request.json  # expects a dict of features
    X = pd.DataFrame([data])
    pred = sleep_model.predict(X)[0]
    if sleep_le:
        pred = sleep_le.inverse_transform([pred])[0]
    # Convert to Python str or int for JSON serialization
    if hasattr(pred, 'item'):
        pred = pred.item()
    pred = str(pred)
    return jsonify({'prediction': pred})

@app.route('/predict_stress_level', methods=['POST'])
def predict_stress_level():
    data = request.json
    X = pd.DataFrame([data])
    pred = stress_model.predict(X)[0]
    if stress_le:
        pred = stress_le.inverse_transform([pred])[0]
    if hasattr(pred, 'item'):
        pred = pred.item()
    pred = str(pred)
    return jsonify({'prediction': pred})

if __name__ == '__main__':
    app.run(debug=True)
