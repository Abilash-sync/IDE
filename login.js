document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        console.log('Login attempt:', {
            email: email,
            remember: remember
        });

        alert(`Login successful!\nEmail: ${email}\nRemember me: ${remember ? 'Yes' : 'No'}`);
        
        loginForm.reset();
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    emailInput.addEventListener('input', function() {
        if (this.value && !isValidEmail(this.value)) {
            this.style.borderColor = '#ff6b6b';
        } else {
            this.style.borderColor = '#e1e4e8';
        }
    });

    emailInput.addEventListener('focus', function() {
        if (!isValidEmail(this.value) && this.value) {
            this.style.borderColor = '#ff6b6b';
        }
    });
});
