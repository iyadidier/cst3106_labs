// app.js

const rollButton = document.getElementById('roll-button');
const diceElements = Array.from(document.getElementsByClassName('dice'));
const errorMessage = document.getElementById('error-message');

// Function to update the dice display with values
function updateDiceDisplay(diceValues) {
    diceValues.forEach((value, index) => {
        diceElements[index].textContent = value;
    });
}

// Function to handle the roll dice button click
rollButton.addEventListener('click', () => {
    errorMessage.textContent = '';  // Clear any previous error messages

    // Send a GET request to fetch dice values from the server
    fetch('http://localhost:4000/roll-dices')  // Adjust port if needed
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse the JSON response
        })
        .then(data => {
            updateDiceDisplay(data);  // Update the dice display with the received values
        })
        .catch(error => {
            console.error('There was an error!', error);
            errorMessage.textContent = 'Error rolling the dice. Please try again later.';  // Show an error message
        });
});
