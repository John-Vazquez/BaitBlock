import requests
import json

URL = 'http://127.0.0.1:5000/receive-email'

email_data = {
    'fromEmail': 'external@example.com',
    'toEmail': 'website@example.com',
    'subject': 'Test Email from External Script',
    'emailBody': 'This is a test email sent from an external script.'
}

def send_email():
    try:
        response = requests.post(URL, json=email_data)
        if response.status_code == 200:
            print("Email sent successfully to the website.")
        else:
            print(f"Failed to send email: {response.text}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    send_email()
