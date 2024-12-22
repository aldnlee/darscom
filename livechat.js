// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmbOCo5LDKy_1HTzeclI5uIMU74vlJoGw",
  authDomain: "login-c4f6d.firebaseapp.com",
  databaseURL: "https://login-c4f6d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "login-c4f6d",
  storageBucket: "login-c4f6d.appspot.com",
  messagingSenderId: "530197085730",
  appId: "1:530197085730:web:e6c06bfe5d764af5c7d47b"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Reference to the database service
const sendButton = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');
const deleteButton = document.getElementById('delete-button');

sendButton.addEventListener('click', () => {
  const user = auth.currentUser;
  const message = messageInput.value;
  if (user && message) {
      database.ref('messages').push({
          email: user.email,
          text: message,
          timestamp: Date.now()
      });
      messageInput.value = '';
  }
});

deleteButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete the chat history?')) {
      database.ref('messages').remove();
      document.getElementById('messages').innerHTML = '';
  }
});

const messagesContainer = document.getElementById('messages');

database.ref('messages').on('child_added', (snapshot) => {
  const message = snapshot.val();
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${message.email}:</strong> ${message.text}`;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Authenticate user
auth.onAuthStateChanged((user) => {
  if (!user) {
      // Redirect to login page if not authenticated
      window.location.href = "login.html";
  }
});
