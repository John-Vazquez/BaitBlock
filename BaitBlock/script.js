// Function to gather selected emails from the list
function getSelectedEmails() {
    const selectedEmails = [];
    document.querySelectorAll('.form-check-input:checked').forEach((checkbox) => {
        const emailContent = checkbox.closest('.card-body').innerText;
        selectedEmails.push(emailContent);
    });
    return selectedEmails;
}

// Function to initiate phishing detection when the button is clicked
async function checkForPhishing() {
    const selectedEmails = getSelectedEmails();
    
    if (selectedEmails.length === 0) {
        alert('Please select at least one email to check.');
        return;
    }

    // Send the selected emails to a serverless function or OpenAI API
    try {
        // Uncomment below to use with a serverless function
        /*
        const response = await fetch('/.netlify/functions/phishing-detection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emails: selectedEmails })
        });

        const data = await response.json();
        const results = JSON.parse(data.results); // Assuming response returns classification as JSON
        */

        // Temporary fake response for demonstration
        const results = selectedEmails.map(() => Math.random() > 0.5 ? 'Phishing' : 'Legitimate');

        // Update UI based on phishing detection results
        document.querySelectorAll('.form-check-input:checked').forEach((checkbox, index) => {
            const card = checkbox.closest('.card-body');
            card.classList.remove('phishing', 'legitimate');
            if (results[index] === 'Phishing') {
                card.classList.add('phishing');
            } else {
                card.classList.add('legitimate');
            }
        });

    } catch (error) {
        console.error('Error checking emails:', error);
    }
}

// Attach event listener to the "Check for Phishing" button
document.querySelector('button.btn-primary').addEventListener('click', checkForPhishing);
