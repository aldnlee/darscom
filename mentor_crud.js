// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

// Check if user is authenticated
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // User is not authenticated, redirect to login page
    window.location.href = "login.html";
  } else {
    // User is authenticated, proceed with CRUD operations
    const availabilityForm = document.getElementById('availability-form');
    const meetingsList = document.getElementById('meetings-list');

    // Submit availability
    availabilityForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;

      try {
        await addDoc(collection(db, 'meetings'), {
          mentorId: user.uid,
          date: date,
          time: time
        });
        alert('Availability submitted successfully!');
        loadMeetings();
      } catch (error) {
        console.error('Error submitting availability: ', error);
      }
    });

    // Load meetings
    const loadMeetings = async () => {
      meetingsList.innerHTML = '';
      const querySnapshot = await getDocs(collection(db, 'meetings'));
      querySnapshot.forEach((doc) => {
        const meeting = doc.data();
        if (meeting.mentorId === user.uid) {
          const meetingItem = document.createElement('div');
          meetingItem.innerHTML = `
            <p>${meeting.date} at ${meeting.time}</p>
            <button onclick="deleteMeeting('${doc.id}')">Delete</button>
          `;
          meetingsList.appendChild(meetingItem);
        }
      });
    };

    // Delete meeting
    window.deleteMeeting = async (id) => {
      try {
        await deleteDoc(doc(db, 'meetings', id));
        alert('Meeting deleted successfully!');
        loadMeetings();
      } catch (error) {
        console.error('Error deleting meeting: ', error);
      }
    };

    // Load meetings on page load
    loadMeetings();
  }
});
