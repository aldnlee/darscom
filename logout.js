// logout.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmbOCo5LDKy_1HTzeclI5uIMU74vlJoGw",
  authDomain: "login-c4f6d.firebaseapp.com",
  projectId: "login-c4f6d",
  storageBucket: "login-c4f6d.firebasestorage.app",
  messagingSenderId: "530197085730",
  appId: "1:530197085730:web:e6c06bfe5d764af5c7d47b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    alert("Logged out successfully!");
    window.location.href = "login2.html";
  }).catch((error) => {
    console.error("Error logging out: ", error);
  });
});
