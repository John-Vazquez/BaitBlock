// Call the loadInbox function when the page loads
document.addEventListener('DOMContentLoaded', loadInbox);

function changeSidebarItem(oldItem, newItem)
{
	oldItem.classList.remove("active");
	newItem.classList.add("active");
}

function switchLog(id1, id2)
{
	console.log("hi");
	let name = id1.value;
	let click = id1.onclick;
	id1.value = id2.value;
	id1.onclick = id2.onclick;
	id2.value = name;
	id2.onclick = click;
}

// Function to gather selected emails from the list
function getSelectedEmails() {
    const selectedEmails = [];
    document.querySelectorAll('.form-check-input:checked').forEach((checkbox) => {
        const emailContent = checkbox.closest('.card-body').innerText;
        selectedEmails.push(emailContent);
    });
    return selectedEmails;
}

function sendEmail() 
{
    const sender = document.getElementById('sender').value;
    const recipient = document.getElementById('recipient').value;
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('body').value;

    const response = await fetch('/api/emails/send', 
	{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, recipient, subject, body })
    });
	
    const result = await response.json();
    if (response.ok) 
	{
        alert('Email sent!');
        loadInbox();
    } else {
        alert('Error sending email: ' + result.error);
    }
}

async function loadInbox() {
    try {
        // Fetch emails from the backend
        const response = await fetch('http://127.0.0.1:5000/get-emails');
        const emails = await response.json();
        console.log("Fetched Emails:", emails); // Add this line to see the data in the console


        // Container where the emails will be displayed
        const inboxContainer = document.querySelector('.col-md-9');
        inboxContainer.innerHTML = '<h4>Inbox</h4>';

        // Loop through the emails and create cards for each email
        emails.forEach((email, index) => {
            const emailCard = document.createElement('div');
            emailCard.className = 'card mb-3';
            emailCard.innerHTML = `
                <div class="card-body">
                    <input class="form-check-input me-2" type="checkbox" id="email${index}">
                    <label for="email${index}" class="form-check-label">
                        <strong>Subject:</strong> ${email.subject} <br>
                        <strong>From:</strong> ${email.fromEmail} <br>
                        <strong>To:</strong> ${email.toEmail} <br>
                        <strong>Time:</strong> ${email.timestamp} <br>
                        ${email.emailBody}
                    </label>
                </div>
            `;
            inboxContainer.appendChild(emailCard);
        });

    } catch (error) {
        console.error("Error loading inbox:", error);
    }
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

async function deleteEmail(emailId) {
    console.log('Delete button clicked for email ID:', emailId); // Debugging line

    try {
        const response = await fetch(`http://127.0.0.1:5000/delete-email/${emailId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Email deleted successfully!');
            loadInbox(); // Reload the inbox to reflect the changes
        } else {
            alert('Failed to delete email.');
        }
    } catch (error) {
        console.error('Error deleting email:', error);
    }
}
