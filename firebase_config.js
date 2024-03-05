// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnIVhnifVFh4V7xFvyCiZ3qxCIhGMUOIs",
  authDomain: "pagepal-reading-assistant.firebaseapp.com",
  databaseURL: "https://pagepal-reading-assistant-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pagepal-reading-assistant",
  storageBucket: "pagepal-reading-assistant.appspot.com",
  messagingSenderId: "2452802588",
  appId: "1:2452802588:web:4361645dfdfa86183523d9",
  measurementId: "G-QS14BKR2JZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

// Function to handle form submission
document.getElementById("bookForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const bookTitle = document.getElementById("book_title").value;
    const bookAuthor = document.getElementById("book_author").value;
    const message = document.getElementById("message").value;

    // Check if all fields are filled
    if (bookTitle.trim() === '' || bookAuthor.trim() === '' || message.trim() === '') {
        alert("Please fill in all fields.");
        return;
    }

    // Push data to Firebase Realtime Database
    const newBookRef = push(ref(database, 'books')); // 'books' is the reference to your database node
    set(newBookRef, {
        Book_Title: bookTitle,
        Book_Author: bookAuthor,
        Message: message
    })
    .then(() => {
        alert("Data submitted successfully!");
        // Optionally, you can clear the form fields after submission
        document.getElementById("book_title").value = '';
        document.getElementById("book_author").value = '';
        document.getElementById("message").value = '';
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert("An error occurred while submitting the data. Please try again later.");
    });
});


