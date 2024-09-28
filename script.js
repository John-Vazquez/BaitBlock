document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const loginModal = document.getElementById("loginModal");
    const closeButton = document.querySelector(".close-button");

    // Show the modal when login is clicked
    loginButton.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default link behavior
        loginModal.style.display = "flex"; // Show modal
    });

    // Hide the modal when the close button is clicked
    closeButton.addEventListener("click", function () {
        loginModal.style.display = "none"; // Hide modal
    });

    // Hide the modal when clicking outside the modal content
    window.addEventListener("click", function (e) {
        if (e.target == loginModal) {
            loginModal.style.display = "none"; // Hide modal
        }
    });
});

// Handle login action
function handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple validation check
    if (username.trim() !== "" && password.trim() !== "") {
        alert("Logged in successfully!");
        document.getElementById("loginModal").style.display = "none"; // Hide modal after successful login
    } else {
        alert("Please enter a valid username and password.");
    }
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

// Function to initiate phishing detection when the button is clicked
async function checkForPhishing() {
    const selectedEmails = getSelectedEmails();

    if (selectedEmails.length === 0) {
        alert('Please select at least one email to check.');
        return;
    }

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
}

// Function to gather data from the email composition form and send it
async function sendEmail() {
    // Gather form data
    const fromEmail = document.getElementById("fromEmail").value;
    const toEmail = document.getElementById("toEmail").value;
    const subject = document.getElementById("subject").value;
    const emailBody = document.getElementById("emailBody").value;

    if (!fromEmail || !toEmail || !subject || !emailBody) {
        alert("Please fill in all fields before sending the email.");
        return;
    }

    const emailContent = `From: ${fromEmail}\nTo: ${toEmail}\nSubject: ${subject}\n\n${emailBody}`;

    // Temporary fake response for demonstration
    const result = Math.random() > 0.5 ? 'Phishing' : 'Legitimate';

    // Display result to the user
    if (result === 'Phishing') {
        alert("Warning: This email has been classified as a phishing attempt.");
    } else {
        alert("This email has been classified as legitimate.");
    }
}
