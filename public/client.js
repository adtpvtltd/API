const socket = io();

const chatOutput = document.getElementById('chatOutput');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Function to display message in chat output
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerText = message;
    chatOutput.appendChild(messageElement);
    // Scroll to bottom of chat output
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Function to send message to server
function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        socket.emit('message', message);
        messageInput.value = '';
    }
}

// Add an event listener for the Send button click
sendButton.addEventListener('click', sendMessage);

// Add an event listener for the Enter key press event
messageInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13 && !event.shiftKey) { // Check if Enter key is pressed without Shift key
        event.preventDefault(); // Prevent the default action of Enter key
        sendMessage(); // Call the sendMessage function to send the message
    }
});

// Receive message from server and display it
socket.on('message', message => {
    displayMessage(message);
});
