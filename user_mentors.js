// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmbOCo5LDKy_1HTzeclI5uIMU74vlJoGw",
  authDomain: "login-c4f6d.firebaseapp.com",
  projectId: "login-c4f6d",
  storageBucket: "login-c4f6d.firebasestorage.app",
  messagingSenderId: "530197085730",
  appId: "1:530197085730:web:e6c06bfe5d764af5c7d47b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Load meetings for users
const userMeetingsList = document.getElementById('user-meetings-list');

const loadUserMeetings = async () => {
  userMeetingsList.innerHTML = '';
  const querySnapshot = await getDocs(collection(db, 'meetings'));
  querySnapshot.forEach((doc) => {
    const meeting = doc.data();
    const meetingItem = document.createElement('div');
    meetingItem.innerHTML = `
      <p>${meeting.date} at ${meeting.time}</p>
      <button onclick="joinMeeting('${doc.id}')">Join</button>
    `;
    userMeetingsList.appendChild(meetingItem);
  });
};

// Join meeting
window.joinMeeting = async (meetingId) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        meetingId: meetingId,
        timestamp: new Date()
      });
      alert('You have successfully joined the meeting!');
      // Redirect to Agora stream page
      window.location.href = "agora_stream.html"; // Replace with your actual Agora stream page URL
    } catch (error) {
      console.error('Error joining meeting: ', error);
    }
  } else {
    alert('You need to be logged in to join a meeting.');
  }
};

// Check if user is authenticated
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is authenticated, load meetings
    loadUserMeetings();
  } else {
    // User is not authenticated, redirect to login page
    window.location.href = "login2.html";
  }
});
