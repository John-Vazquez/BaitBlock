from flask import Flask, request, jsonify
import json
from datetime import datetime

app = Flask(__name__)

EMAIL_STORAGE_FILE = 'emails.json'

# Function to save incoming email data to a JSON file
def save_email(data):
    try:
        # Read existing emails from the JSON file
        with open(EMAIL_STORAGE_FILE, 'r') as file:
            emails = json.load(file)
    except FileNotFoundError:
        # If the file doesn't exist, start with an empty list
        emails = []

    # Add a timestamp to the email data
    data['timestamp'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    # Append the new email data to the list
    emails.append(data)

    # Write the updated email list back to the file
    with open(EMAIL_STORAGE_FILE, 'w') as file:
        json.dump(emails, file, indent=4)

# Endpoint to receive email data from the external sender
@app.route('/receive-email', methods=['POST'])
def receive_email():
    data = request.json
    # Validate that all required fields are present
    required_fields = ['fromEmail', 'toEmail', 'subject', 'emailBody']

    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Save the received email
    save_email(data)
    return jsonify({"message": "Email received and saved successfully"}), 200

# Endpoint to get all saved emails (used by the website to display inbox)
@app.route('/get-emails', methods=['GET'])
def get_emails():
    try:
        # Read emails from the JSON file
        with open(EMAIL_STORAGE_FILE, 'r') as file:
            emails = json.load(file)
    except FileNotFoundError:
        # If no emails exist, return an empty list
        emails = []

    return jsonify(emails)

# Serve the HTML file for the website (update this as needed)
@app.route('/')
def serve_html():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(port=5000)
