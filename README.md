# AeroVitals: https://aerovitals-clean.vercel.app/

## Real-Time Wearable Health Monitoring for In-Flight Safety

AeroVitals is an innovative IoT-based health monitoring system designed to enhance aviation safety by providing real-time biometric monitoring for pilots and crew members during flight operations. The system combines advanced biosensors, AI-powered analytics, and automated alert systems to detect potential health emergencies before they become critical.

## 🚀 Features

### Real-Time Health Monitoring
- **Continuous Biometric Tracking**: Monitor heart rate, oxygen saturation, and body temperature
- **Real-Time Data Transmission**: Live streaming of health metrics via ESP32 microcontroller
- **Non-Invasive Sensors**: Comfortable wearable design suitable for extended flight operations

### AI-Powered Analytics
- **Intelligent Stress Detection**: Machine learning algorithms analyze biometric patterns
- **Automated Alert System**: Instant notifications when anomalies are detected
- **Predictive Health Insights**: Early warning system for potential health emergencies

### Interactive Support System
- **AI Chatbot First Aid**: Immediate medical guidance and first aid instructions
- **Emergency Response**: Automated alerts to ground control and medical personnel
- **User-Friendly Interface**: Intuitive dashboard for monitoring multiple crew members

## 🛠️ Technology Stack

### Hardware
- **ESP32 Microcontroller**: Core IoT processing unit
- **MAX30102 Sensor**: Heart rate and oxygen saturation monitoring
- **MLX90614 Sensor**: Non-contact infrared temperature measurement
- **Wearable Form Factor**: Lightweight and comfortable design

### Software
- **Frontend**: ReactJS with modern UI/UX design
- **Backend**: Flask (Python) REST API
- **AI/ML**: TensorFlow/Scikit-learn for stress detection algorithms
- **Real-Time Communication**: WebSocket connections for live data streaming
- **Database**: SQLite/PostgreSQL for data storage

### Deployment
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render
- **IoT Communication**: MQTT/HTTP protocols
- **Cloud Services**: Real-time data processing and storage

## 📋 Prerequisites

### Hardware Requirements
- ESP32 development board
- MAX30102 pulse oximeter sensor
- MLX90614 infrared temperature sensor
- Breadboard and connecting wires
- Power supply (battery pack recommended)

### Software Requirements
- Python 3.8+
- Node.js 16+
- Arduino IDE
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Kriti-101/AeroVitals.git
cd AeroVitals
```

### 2. Hardware Setup
```arduino
// ESP32 Pin Configuration
MAX30102 -> ESP32
VCC -> 3.3V
GND -> GND
SDA -> GPIO21
SCL -> GPIO22

MLX90614 -> ESP32
VCC -> 3.3V
GND -> GND
SDA -> GPIO21
SCL -> GPIO22
```

### 3. ESP32 Firmware
```bash
# Open Arduino IDE
# Install required libraries:
# - MAX30105lib
# - MLX90614
# - WiFi
# - WebSocketsClient

# Upload the firmware to ESP32
```

### 4. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export FLASK_APP=app.py
export FLASK_ENV=development

# Run the Flask server
flask run
```

### 5. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 📊 API Documentation

### Health Data Endpoints
```
GET  /api/health/current     - Get current health metrics
POST /api/health/data        - Receive sensor data from ESP32
GET  /api/health/history     - Get historical health data
GET  /api/alerts             - Get active alerts
POST /api/emergency          - Trigger emergency alert
```

### WebSocket Events
```
connect         - Establish real-time connection
health_data     - Real-time health metrics
stress_alert    - Stress detection notification
emergency       - Emergency situation alert
```

## 🧠 AI Stress Detection Algorithm

The system uses machine learning to analyze multiple biometric parameters:

```python
# Feature extraction from sensor data
features = [
    heart_rate_variability,
    oxygen_saturation_trend,
    temperature_deviation,
]

# Stress level classification
stress_level = model.predict(features)
# Output: Normal, Elevated, Critical
```

## 📱 Usage

1. **Device Setup**: Wear the sensor device comfortably on your wrist
2. **System Activation**: Power on the device and ensure WiFi connectivity
3. **Dashboard Monitoring**: Access the web dashboard to view real-time metrics
4. **Alert Response**: Follow automated first aid instructions if alerts are triggered
5. **Emergency Protocol**: System automatically notifies emergency contacts during critical events


## 🤝 Contributing

We welcome contributions to improve AeroVitals! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🚀 Future Roadmap

- [ ] Integration with medical databases
- [ ] Mobile app development (iOS/Android)
- [ ] Advanced predictive analytics
- [ ] Integration with aircraft systems
- [ ] Multi-language support
- [ ] Expanded sensor compatibility

---

**Built with ❤️ for aviation safety and crew wellbeing**

*AeroVitals - Making the skies safer, one heartbeat at a time.*
