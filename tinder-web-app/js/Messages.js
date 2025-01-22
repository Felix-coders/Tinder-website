// Select elements from the DOM
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatBox = document.getElementById('chat-box');

// Create a custom context menu for delete
const customMenu = document.createElement('ul');
customMenu.id = 'custom-context-menu';
customMenu.style.display = 'none';
customMenu.style.position = 'absolute';
customMenu.style.listStyle = 'none';
customMenu.style.padding = '10px';
customMenu.style.margin = '0';
customMenu.style.backgroundColor = '#fff';
customMenu.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
customMenu.style.borderRadius = '5px';
document.body.appendChild(customMenu);

const deleteOption = document.createElement('li');
deleteOption.textContent = 'Delete';
deleteOption.style.cursor = 'pointer';
deleteOption.style.padding = '5px 10px';
deleteOption.addEventListener('click', () => {
    if (customMenu.targetMessage) {
        handleDeleteMessage(customMenu.targetMessage);
        hideCustomMenu();
    }
});
customMenu.appendChild(deleteOption);

// Function to create a new message element
function createMessageElement(text, isOutgoing = true) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', isOutgoing ? 'outgoing' : 'incoming');

    const messageText = document.createElement('p');
    messageText.textContent = text;

    // Add right-click event to show custom menu
    messageDiv.addEventListener('contextmenu', (event) => {
        event.preventDefault(); // Prevent default context menu
        showCustomMenu(event, messageDiv);
    });

    messageDiv.appendChild(messageText);
    return messageDiv;
}

// Function to show the custom context menu
function showCustomMenu(event, messageDiv) {
    hideCustomMenu(); // Hide any existing menu
    customMenu.targetMessage = messageDiv;
    customMenu.style.left = `${event.pageX}px`;
    customMenu.style.top = `${event.pageY}px`;
    customMenu.style.display = 'block';
}

// Function to hide the custom context menu
function hideCustomMenu() {
    customMenu.style.display = 'none';
    customMenu.targetMessage = null;
}

// Function to send a message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    // Create outgoing message
    const outgoingMessage = createMessageElement(messageText, true);
    chatBox.appendChild(outgoingMessage);

    messageInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to handle message deletion
function handleDeleteMessage(messageDiv) {
    const deleteForBoth = confirm('Delete for both users?');

    if (deleteForBoth) {
        alert('Message deleted for both users.');
        chatBox.removeChild(messageDiv);
    } else {
        alert('Message deleted only for this user.');
        chatBox.removeChild(messageDiv);
    }
}

// Add attachment functionality
const attachmentIcon = document.createElement('button');
attachmentIcon.innerHTML = '<i class="fas fa-paperclip"></i>';
attachmentIcon.classList.add('attachment-button');
attachmentIcon.style.marginRight = '10px'; // Align to the left of input

document.querySelector('.chat-input').insertBefore(attachmentIcon, messageInput);

// Update the attachment functionality
attachmentIcon.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx,.xlsx'; // Accept multiple formats
    fileInput.multiple = true;

    fileInput.addEventListener('change', (event) => {
        const files = Array.from(event.target.files);
        files.forEach((file) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const fileURL = fileReader.result;

                // Display different content based on file type
                let fileContent;
                if (file.type.startsWith('image/')) {
                    fileContent = document.createElement('img');
                    fileContent.src = fileURL;
                    fileContent.style.maxWidth = '150px';
                    fileContent.style.maxHeight = '150px';
                    fileContent.style.borderRadius = '10px';
                } else if (file.type.startsWith('video/')) {
                    fileContent = document.createElement('video');
                    fileContent.src = fileURL;
                    fileContent.controls = true;
                    fileContent.style.maxWidth = '200px';
                    fileContent.style.maxHeight = '150px';
                    fileContent.style.borderRadius = '10px';
                } else if (file.type.startsWith('audio/')) {
                    fileContent = document.createElement('audio');
                    fileContent.src = fileURL;
                    fileContent.controls = true;
                    fileContent.style.maxWidth = '200px';
                } else {
                    const fileWrapper = document.createElement('div');
                    fileWrapper.style.display = 'flex';
                    fileWrapper.style.alignItems = 'center';
                    fileWrapper.style.border = '1px solid #FE3C72';
                    fileWrapper.style.borderRadius = '5px';
                    fileWrapper.style.cursor = 'pointer';
                    fileWrapper.style.background = '#FE3C72'
                    fileWrapper.style.width = 'fit-content'

                    const fileIcon = document.createElement('span');
                    fileIcon.innerHTML = '<i class="fa fa-download"></i>';
                    fileIcon.classList.add('my-custom-class');
                    fileIcon.style.width = '50px';
                    fileIcon.style.height = '50px';
                    fileIcon.style.marginRight = '10px';
                    fileIcon.style.border = 'none';
                    fileIcon.style.background = 'FE3C72';
                    fileIcon.style.color = '#fff';

                    const fileContent = document.createElement('a');
                    fileContent.href = fileURL;
                    fileContent.textContent = file.name;
                    fileContent.style.textDecoration = 'none';
                    fileContent.style.color = '#fff';
                    fileContent.style.overflowWrap = 'break-word';

                    fileWrapper.appendChild(fileIcon);
                    fileWrapper.appendChild(fileContent);

// Append the fileWrapper to the parent element (e.g., the chat box or message container)
                    chatBox.appendChild(fileWrapper);  // Assuming chatBox is the parent container

                }

                const messageDiv = document.createElement('div');
                messageDiv.classList.add('chat-message', 'outgoing');
                messageDiv.style.display = 'block'; // Ensure each message appears on a new line
                messageDiv.style.maxWidth = 'fit-content';
                messageDiv.style.wordWrap = 'break-word';
                messageDiv.style.marginBottom = '10px'; // Add spacing between messages
                messageDiv.style.padding = '10px'; // Add padding for better appearance
                messageDiv.style.borderRadius = '10px';
                messageDiv.style.backgroundColor = '#fe3c72'; // Optional background color
                messageDiv.appendChild(fileContent);

                // Add right-click delete functionality
                messageDiv.addEventListener('contextmenu', (event) => {
                    event.preventDefault();
                    showCustomMenu(event, messageDiv);
                });

                chatBox.appendChild(messageDiv);
                chatBox.scrollTop = chatBox.scrollHeight;
            };

            fileReader.onerror = () => {
                alert(`Failed to load file: ${file.name}`);
            };

            fileReader.readAsDataURL(file);
        });
    });

    fileInput.click();
});

// Add voice recording functionality
const voiceRecordIcon = document.createElement('button');
voiceRecordIcon.innerHTML = '<i class="fas fa-microphone"></i>';
voiceRecordIcon.classList.add('voice-record-button');
voiceRecordIcon.style.marginLeft = '10px'; // Align to the right of input

document.querySelector('.chat-input').appendChild(voiceRecordIcon);

let mediaRecorder;
let audioChunks = [];
let isRecording = false;

voiceRecordIcon.addEventListener('click', async () => {
    if (!isRecording) {
        // Start recording
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            audioChunks = [];
            mediaRecorder.start();
            isRecording = true;

            voiceRecordIcon.innerHTML = '<i class="fas fa-stop"></i>'; // Change icon to "stop"

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                const audioURL = URL.createObjectURL(audioBlob);

                // Create a wrapper for the audio message and delete button
                const audioMessageWrapper = document.createElement('div');
                audioMessageWrapper.classList.add('chat-message', 'outgoing');
                audioMessageWrapper.style.display = 'flex';
                audioMessageWrapper.style.alignItems = 'center';
                audioMessageWrapper.style.marginBottom = '10px';
                audioMessageWrapper.style.maxWidth = 'fit-content';
                audioMessageWrapper.style.borderRadius = '10px';
                audioMessageWrapper.style.backgroundColor = '#fe3c72';
                audioMessageWrapper.style.padding = '10px';

                // Audio element
                const audioElement = document.createElement('audio');
                audioElement.src = audioURL;
                audioElement.controls = true;
                audioElement.style.flex = '1';
                audioElement.style.marginRight = '10px';

                // Prevent audio element clicks from triggering parent events
                audioElement.addEventListener('click', (event) => {
                    event.stopPropagation();
                });

                // Delete button
                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
                deleteButton.style.border = 'none';
                deleteButton.style.background = 'transparent';
                deleteButton.style.color = '#fff';
                deleteButton.style.cursor = 'pointer';

                deleteButton.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent bubbling
                    chatBox.removeChild(audioMessageWrapper);
                });

                audioMessageWrapper.appendChild(audioElement);
                audioMessageWrapper.appendChild(deleteButton);

                chatBox.appendChild(audioMessageWrapper);
                chatBox.scrollTop = chatBox.scrollHeight;
            };

        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Microphone access is required to record audio.');
        }
    } else {
        // Stop recording
        mediaRecorder.stop();
        isRecording = false;
        voiceRecordIcon.innerHTML = '<i class="fas fa-microphone"></i>'; // Reset icon
    }
});


// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Hide custom context menu on click anywhere else
document.addEventListener('click', (event) => {
    if (customMenu.style.display === 'block' && !customMenu.contains(event.target)) {
        hideCustomMenu();
    }
});

function sendMessage() {
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    const outgoingMessage = createMessageElement(messageText, true);
    chatBox.appendChild(outgoingMessage);

    const userMessage = document.querySelector('.side .messages .text');
    if (userMessage) {
        userMessage.textContent = messageText;
    }

    messageInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}
