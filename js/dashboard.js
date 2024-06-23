document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('loggedInUserId');
    const userName = localStorage.getItem('loggedInUserName');

    if (userId && userName) {
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome, ${userName}`;
        }
    } else {
        // If no user is logged in, redirect to login page
        window.location.href = 'index.html';
    }
});
