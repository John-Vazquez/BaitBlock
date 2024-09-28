// script.js
async function sendEmail() {
    const sender = document.getElementById('sender').value;
    const recipient = document.getElementById('recipient').value;
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('body').value;

    const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, recipient, subject, body })
    });

    const result = await response.json();
    if (response.ok) {
        alert('Email sent!');
        loadInbox();
    } else {
        alert('Error sending email: ' + result.error);
    }
}

async function loadInbox() {
    const response = await fetch('/api/emails/inbox');
    const emails = await response.json();
    const inbox = document.getElementById('inbox');
    inbox.innerHTML = '';
    emails.forEach(email => {
        const emailDiv = document.createElement('div');
        emailDiv.className = 'email-item';
        emailDiv.innerHTML = `
            <p><strong>From:</strong> ${email.sender}</p>
            <p><strong>To:</strong> ${email.recipient}</p>
            <p><strong>Subject:</strong> ${email.subject}</p>
            <p>${email.body}</p>
            ${email.isScam ? `<p class="scam-warning">⚠️ This email might be a scam: ${email.flaggedReason}</p>` : ''}
        `;
        inbox.appendChild(emailDiv);
    });
}

// Load inbox on page load
window.onload = loadInbox;