// Get form and input elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const rememberMe = document.getElementById('rememberMe');

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password validation function
function validatePassword(password) {
    return password.length >= 6;
}

// Clear error messages
function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
}

// Show error messages
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
}

// Real-time validation for email
emailInput.addEventListener('input', function() {
    clearError(emailInput, emailError);
});

emailInput.addEventListener('blur', function() {
    if (emailInput.value && !validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
    }
});

// Real-time validation for password
passwordInput.addEventListener('input', function() {
    clearError(passwordInput, passwordError);
});

passwordInput.addEventListener('blur', function() {
    if (passwordInput.value && !validatePassword(passwordInput.value)) {
        showError(passwordInput, passwordError, 'Password must be at least 6 characters');
    }
});

// Form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Clear previous errors
    clearError(emailInput, emailError);
    clearError(passwordInput, passwordError);
    
    // Validate email
    if (!emailInput.value) {
        showError(emailInput, emailError, 'Email is required');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!passwordInput.value) {
        showError(passwordInput, passwordError, 'Password is required');
        isValid = false;
    } else if (!validatePassword(passwordInput.value)) {
        showError(passwordInput, passwordError, 'Password must be at least 6 characters');
        isValid = false;
    }
    
    // If form is valid, proceed with login
    if (isValid) {
        const formData = {
            email: emailInput.value,
            password: passwordInput.value,
            rememberMe: rememberMe.checked
        };
        
        console.log('Login Data:', formData);
        
        // Show success message
        alert(`Login successful!\n\nEmail: ${formData.email}\nRemember Me: ${formData.rememberMe ? 'Yes' : 'No'}`);
        
        // Here you would typically send the data to your backend
        // Example: fetch('/api/login', { method: 'POST', body: JSON.stringify(formData) })
        
        // Reset form
        loginForm.reset();
    }
});

// Social login buttons
const googleBtn = document.querySelector('.google-btn');
const githubBtn = document.querySelector('.github-btn');

googleBtn.addEventListener('click', function() {
    alert('Google login clicked! This would redirect to Google OAuth.');
    // Implement Google OAuth here
});

githubBtn.addEventListener('click', function() {
    alert('GitHub login clicked! This would redirect to GitHub OAuth.');
    // Implement GitHub OAuth here
});

// Forgot password link
const forgotPasswordLink = document.querySelector('.forgot-password');
forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Forgot password clicked! This would open a password reset form.');
    // Implement password reset logic here
});

// Sign up link
const signupLink = document.querySelector('.signup-link');
signupLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Sign up clicked! This would redirect to registration page.');
    // Implement redirect to signup page here
});

// Load saved email if "Remember Me" was checked
window.addEventListener('load', function() {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMe.checked = true;
    }
});

// Save email to localStorage if "Remember Me" is checked
rememberMe.addEventListener('change', function() {
    if (rememberMe.checked && emailInput.value) {
        localStorage.setItem('rememberedEmail', emailInput.value);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
});
