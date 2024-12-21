// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

// Submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault();
  // Inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.querySelector('input[name="role"]:checked').value; // Get selected role

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert("Creating Account...");

      // Store user role in Firestore
      await setDoc(doc(db, "users", user.uid), {
        role: role
      });

      // Redirect based on role
      if (role === 'mentor') {
        window.location.href = "mentor_dashboard.html";
      } else {
        window.location.href = "user_dashboard.html";
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
