import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyClgM3EtwTafPWCgYyTqZ6cvP0Zky8IeEE",
    authDomain: "car-rental-system-1223a.firebaseapp.com",
    projectId: "car-rental-system-1223a",
    storageBucket: "car-rental-system-1223a.appspot.com",
    messagingSenderId: "1093861234143",
    appId: "1:1093861234143:web:13588376ee6d8ca1f9606a",
    measurementId: "G-XDQ5QF3WBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('recover-password-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var messageDiv = document.getElementById('message');

    sendPasswordResetEmail(auth, email).then(function () {
        messageDiv.textContent = 'Password reset email sent!';
        messageDiv.style.opacity = 1;
    }).catch(function (error) {
        messageDiv.textContent = 'Error: ' + error.message;
        messageDiv.style.opacity = 1;
    });
});
