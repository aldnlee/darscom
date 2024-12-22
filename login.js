// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("Logging in...");

      // Retrieve user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userRole = userDoc.data().role;

        // Store user role in local storage
        localStorage.setItem('userRole', userRole);

        // Redirect based on role
        if (userRole === 'mentor') {
          window.location.href = "mentor_dashboard.html";
        } else {
          window.location.href = "user_dashboard.html";
        }
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
// Store user data on successful login in localStorage

