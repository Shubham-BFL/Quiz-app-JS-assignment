document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    function getFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        let users = getFromLocalStorage('users') || [];
        if (users.find(u => u.email === email)) {
            alert('Email already registered!');
            return;
        }

        const newUser = { username, email, password };
        users.push(newUser);
        saveToLocalStorage('users', users);
        alert('Registration successful! Please log in.');
        document.getElementById('pills-login-tab').click(); // Switch to login tab
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const users = getFromLocalStorage('users') || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            saveToLocalStorage('currentUser', user);
            alert('Login successful!');
            window.location.href = 'create-quiz.html'; // Redirect to quiz creation page
        } else {
            alert('Invalid email or password.');
        }
    });
});