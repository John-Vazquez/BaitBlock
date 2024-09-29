from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will allow cross-origin requests from any domain

# Example route
@app.route('/get-emails', methods=['GET'])
def get_emails():
    # Your logic to return email data
    return jsonify([{"emailBody": "This is a test email sent from an external script.",
                     "fromEmail": "external@example.com", 
                     "subject": "Test Email from External Script", 
                     "timestamp": "2024-09-28 14:14:11", 
                     "toEmail": "website@example.com"}])

if __name__ == '__main__':
    app.run(debug=True)
