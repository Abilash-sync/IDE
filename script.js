document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Password validation
    function validatePassword(password) {
        return password.length >= 6;
    }

    // Clear error on input
    emailInput.addEventListener('input', function() {
        emailInput.classList.remove('error');
        emailError.textContent = '';
    });

    passwordInput.addEventListener('input', function() {
        passwordInput.classList.remove('error');
        passwordError.textContent = '';
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate email
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('error');
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email';
            emailInput.classList.add('error');
            isValid = false;
        }
        
        // Validate password
        if (!passwordInput.value) {
            passwordError.textContent = 'Password is required';
            passwordInput.classList.add('error');
            isValid = false;
        } else if (!validatePassword(passwordInput.value)) {
            passwordError.textContent = 'Password must be at least 6 characters';
            passwordInput.classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            // Get form data
            const formData = {
                email: emailInput.value.trim(),
                password: passwordInput.value,
                rememberMe: document.getElementById('rememberMe').checked
            };
            
            console.log('Login data:', formData);
            alert('Login successful! Check console for form data.');
            
            // Here you would typically send the data to your backend
            // Example:
            // fetch('/api/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     // Handle successful login
            // })
            // .catch(error => {
            //     // Handle error
            // });
        }
    });

    // Social login buttons
    const googleBtn = document.querySelector('.google-btn');
    const githubBtn = document.querySelector('.github-btn');

    googleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Google login clicked');
        alert('Google login would be implemented here');
    });

    githubBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('GitHub login clicked');
        alert('GitHub login would be implemented here');
    });
});
