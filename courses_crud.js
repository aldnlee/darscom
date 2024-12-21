// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

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

// Handle form submission
const courseForm = document.getElementById('course-form');
courseForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const youtubeLink = document.getElementById('youtube-link').value;

  try {
    await addDoc(collection(db, 'courses'), {
      title: title,
      description: description,
      youtubeLink: youtubeLink,
      timestamp: new Date()
    });
    alert('Course information submitted successfully!');
    loadCourses();
  } catch (error) {
    console.error('Error submitting course information: ', error);
  }
});

// Load courses
const coursesList = document.getElementById('courses-list');

const loadCourses = async () => {
  coursesList.innerHTML = '';
  const querySnapshot = await getDocs(collection(db, 'courses'));
  querySnapshot.forEach((doc) => {
    const course = doc.data();
    const courseItem = document.createElement('div');
    courseItem.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <a href="${course.youtubeLink}" target="_blank">Watch on YouTube</a>
      <button onclick="editCourse('${doc.id}')">Edit</button>
      <button onclick="deleteCourse('${doc.id}')">Delete</button>
    `;
    coursesList.appendChild(courseItem);
  });
};

// Edit course
window.editCourse = async (courseId) => {
  const title = prompt('Enter new title:');
  const description = prompt('Enter new description:');
  const youtubeLink = prompt('Enter new YouTube link:');
  if (title && description && youtubeLink) {
    try {
      await updateDoc(doc(db, 'courses', courseId), {
        title: title,
        description: description,
        youtubeLink: youtubeLink
      });
      alert('Course information updated successfully!');
      loadCourses();
    } catch (error) {
      console.error('Error updating course information: ', error);
    }
  }
};

// Delete course
window.deleteCourse = async (courseId) => {
  try {
    await deleteDoc(doc(db, 'courses', courseId));
    alert('Course information deleted successfully!');
    loadCourses();
  } catch (error) {
    console.error('Error deleting course information: ', error);
  }
};

// Load courses on page load
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadCourses();
  } else {
    window.location.href = "login.html";
  }
});
