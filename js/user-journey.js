import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClgM3EtwTafPWCgYyTqZ6cvP0Zky8IeEE",
    authDomain: "car-rental-system-1223a.firebaseapp.com",
    projectId: "car-rental-system-1223a",
    storageBucket: "car-rental-system-1223a.appspot.com",
    messagingSenderId: "1093861234143",
    appId: "1:1093861234143:web:13588376ee6d8ca1f9606a",
    measurementId: "G-XDQ5QF3WBX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

document.getElementById('journeyForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const pickupLocation = document.getElementById('pickupLocation').value;
    const dropLocation = document.getElementById('dropLocation').value;
    const journeyDate = document.getElementById('journeyDate').value;
    const journeyTime = document.getElementById('journeyTime').value;

    const rideDetails = {
        pickupLocation,
        dropLocation,
        journeyDate,
        journeyTime,
        status: 'pending',
        userName: localStorage.getItem('loggedInUserId'), // Retrieve user name
        userId: localStorage.getItem('loggedInUserName') // Retrieve user ID
    };

    try {
        // Directly add ride details to the rides collection
        const ridesRef = collection(firestore, 'rides');
        await addDoc(ridesRef, rideDetails);
        alert('Journey details saved!');
        window.location.href = 'user-dashboard.html';
    } catch (error) {
        console.error('Error saving ride details:', error);
        alert('Failed to save ride details.');
    }
});
