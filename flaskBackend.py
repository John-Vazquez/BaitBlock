from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample email data
emails = [
    {"id": 0, "emailBody": "Test email body", "fromEmail": "example@example.com", "subject": "Test Subject", "timestamp": "2024-09-28 14:00:00", "toEmail": "receiver@example.com"},
    # Add more emails as necessary
]

@app.route('/get-emails', methods=['GET'])
def get_emails():
    return jsonify(emails)

@app.route('/delete-email/<int:email_id>', methods=['DELETE'])
def delete_email(email_id):
    global emails
    emails = [email for email in emails if email['id'] != email_id]
    return jsonify({"message": "Email deleted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
