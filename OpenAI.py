import openai

# Initialize OpenAI API key
openai.api_key = 'org-BIPIQjaCbtRytCPPzmzw3GjT'  # Replace with your actual API key

@app.route('/check-phishing', methods=['POST'])
def check_phishing():
    data = request.json  # Expecting a JSON payload
    emails = data.get('emails', [])
    
    if not emails:
        return jsonify({"error": "No emails provided"}), 400

    results = []
    
    for email in emails:
        # Call OpenAI API for phishing detection
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"Is this email legitimate or a phishing attempt? {email}"}
            ]
        )
        result = response.choices[0].message['content']
        results.append(result)
    
    return jsonify({"results": results}), 200
