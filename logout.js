import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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
const db = getFirestore(app);

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async () => {
  const user = auth.currentUser;
  
  if (user) {
    // Get user role from Firestore or Custom Claims
    const userRef = doc(db, "users", user.uid);  // Assuming 'users' collection
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      const userRole = docSnap.data().role; // Assuming role is stored in the user document
      // Sign out the user
      signOut(auth).then(() => {
        alert("Logged out successfully!");
        window.location.href = userRole === 'mentor' ? 'login2.html' : 'login2.html'; // Redirect to the appropriate login page
      }).catch((error) => {
        console.error("Error logging out: ", error);
      });
    } else {
      console.log("No such user in Firestore!");
    }
  }
});
