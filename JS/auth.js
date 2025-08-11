document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Create message container for auth messages
    const authContainer = document.querySelector('.card.p-4');
    if (authContainer) {
        const messageContainer = document.createElement('div');
        messageContainer.id = 'auth-message-container';
        messageContainer.className = 'mb-3';
        authContainer.insertBefore(messageContainer, authContainer.firstChild);
    }

    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    function getFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    function displayAuthMessage(message, type = 'info') {
        const container = document.getElementById('auth-message-container');
        if (container) {
            container.innerHTML = `
                <div class="alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        }
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        let users = getFromLocalStorage('users') || [];
        if (users.find(u => u.email === email)) {
            displayAuthMessage('Email already registered!', 'error');
            return;
        }

        const newUser = { username, email, password };
        users.push(newUser);
        saveToLocalStorage('users', users);
        displayAuthMessage('Registration successful! Please log in.', 'success');
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
            displayAuthMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'create-quiz.html'; // Redirect to quiz creation page
            }, 1500);
        } else {
            displayAuthMessage('Invalid email or password.', 'error');
        }
    });
});
