# Full-Stack Quantum Random Number Generator (QRNG)

A full-stack web application that generates genuine random numbers derived from quantum superposition using IBM's Qiskit. 
It features a premium, modern, glassmorphism-style UI.

## Features
- Generates 1, 4, 8, or 16 random bits using simulated quantum superposition.
- Modern dark-mode UI with smooth micro-animations.
- Visual distribution chart showing the randomness of the generated figures over time.
- Built using Flask, HTML/CSS/JS, and Qiskit.

## Setup Instructions

### 1. Backend (Python/Flask/Qiskit)

```bash
# Navigate to the project directory
cd "Random Generator"

# Create a virtual environment (optional but recommended)
python -m venv venv

# Activate the virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install the required Python packages
pip install -r backend/requirements.txt

# Run the Flask API server
python backend/app.py
```
The Flask server will run on `http://127.0.0.1:5000`.

### 2. Frontend
You can serve the frontend in the browser using a local development server so that module fetches work properly.
For example, if you have Python installed, you can open a new terminal, navigate to the `frontend` directory, and run:
```bash
cd frontend
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser to use the application!
