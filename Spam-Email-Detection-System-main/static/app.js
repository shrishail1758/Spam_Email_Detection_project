document.getElementById('emailForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const emailContent = document.getElementById('emailText').value;

    if (!emailContent.trim()) {
        document.getElementById('result').innerHTML = 'Please enter email content!';
        document.getElementById('result').style.display = 'block';
        return;
    }

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailText: emailContent }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerHTML = `Prediction: ${data.prediction}`;
        document.getElementById('result').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = 'An error occurred. Please try again.';
        document.getElementById('result').style.display = 'block';
    });
});
