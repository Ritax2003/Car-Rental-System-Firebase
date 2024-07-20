import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyClgM3EtwTafPWCgYyTqZ6cvP0Zky8IeEE",
    authDomain: "car-rental-system-1223a.firebaseapp.com",
    projectId: "car-rental-system-1223a",
    storageBucket: "car-rental-system-1223a.appspot.com",
    messagingSenderId: "1093861234143",
    appId: "1:1093861234143:web:13588376ee6d8ca1f9606a",
    measurementId: "G-XDQ5QF3WBX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const userId = localStorage.getItem('loggedInMNGRId');
const userName = localStorage.getItem('loggedInMNGRName');

if (userId && userName) {
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${userName}`;
    }
}

/*async function fetchRides() {
    const ridesTableBody = document.querySelector('#ridesTable tbody');
    try {
        const ridesSnapshot = await getDocs(collection(firestore, 'rides'));
        ridesTableBody.innerHTML = '';
        ridesSnapshot.forEach((rideDoc) => {
            const ride = rideDoc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ride.userId}<br>${rideDoc.id}</td>
                <td>${ride.pickupLocation}</td>
                <td>${ride.dropLocation}</td>
                <td>${ride.journeyDate}</td>
                <td>${ride.journeyTime}</td>
                <td>${ride.status}</td>
                <td><button onclick="confirmRide('${rideDoc.id}')">Confirm Ride</button></td>
            `;
            ridesTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching ride details:', error);
        alert('Failed to load ride details.');
    }
}*/

const ridesTable = document.getElementById('ridesTable').getElementsByTagName('tbody')[0];
function createTableRow(rideDoc) {
    const ride = rideDoc.data();
    const row = document.createElement('tr');
    
    row.innerHTML = `
                <td>${ride.userId}<br>${rideDoc.id}</td>
                <td>${ride.pickupLocation}</td>
                <td>${ride.dropLocation}</td>
                <td>${ride.journeyDate}</td>
                <td>${ride.journeyTime}</td>
                <td>${ride.status}</td>
                <td><button onclick="confirmRide('${rideDoc.id}')">Confirm Ride</button></td>
            `;
    return row;
}
function updateTable() {
    onSnapshot(collection(firestore, 'rides'), (snapshot) => {
        // Clear existing table rows
        ridesTable.innerHTML = '';
        
        snapshot.forEach((rideDoc) => {
            const row = createTableRow(rideDoc);
            ridesTable.appendChild(row);
        });
    });
}
async function confirmRide(rideId) {
    try {
        const rideRef = doc(firestore, 'rides', rideId);
        await updateDoc(rideRef, {
            status: 'confirmed'
        });
        alert('Ride confirmed!');
    } catch (error) {
        console.error('Error confirming ride:', error);
        alert('Failed to confirm ride.');
    }
}
window.confirmRide = confirmRide; //to make the confirmride global

updateTable();

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.clear(); // Clear all stored data
        showMessage('Logout successful !!', 'message');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);

        // Clear browser history to prevent back navigation
        setTimeout(() => {
            history.pushState(null, null, 'index.html');
            window.addEventListener('popstate', function (event) {
                history.pushState(null, null, 'index.html');
            });
        }, 3500);
    });
}

const dateTimeElement = document.getElementById('dateTime');
if (dateTimeElement) {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
    setInterval(() => {
        const now = new Date();
        dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
    }, 1000);
}
/*
auth.onAuthStateChanged((user) => {
    if (user) {
        fetchRides();
    } else {
        window.location.href = 'index.html';
    }
}); */
