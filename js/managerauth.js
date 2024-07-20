import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
const db = getFirestore(app);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

const signIn = document.getElementById('submitMNGRSignIn');
signIn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            showMessage('Logged in successfully', 'signInMessage');
            const user = userCredential.user;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                localStorage.setItem('loggedInMNGRId', user.uid);
                localStorage.setItem('loggedInMNGRName', userData.DisplayName);
                localStorage.setItem('MNGRBalance',userData.balance);
                window.location.href = 'manager-dashboard.html';
            } else {
                showMessage('No such document!', 'signInMessage');
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else {
                showMessage('Account does not Exist', 'signInMessage');
            }
        });
});

