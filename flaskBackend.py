from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

emails = []  # Store received emails

@app.route('/receive-email', methods=['POST'])
def receive_email():
    global emails
    data = request.json
    emails.append(data)
    print("Received Email:", data)  # This line should print the email data to the terminal
    return jsonify({"message": "Email received"}), 200

if __name__ == '__main__':
    app.run(debug=True)
