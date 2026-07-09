document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    
    // Load saved email if "Remember me" was checked previously
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
    
    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;
        
        // Save or remove email based on "Remember me" checkbox
        if (remember) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Simulate login (replace with actual authentication logic)
        console.log('Login attempt:', {
            email: email,
            password: password.replace(/./g, '*'), // Masked password for logging
            remember: remember
        });
        
        // Show success message (in production, handle actual authentication)
        alert('Login successful! (This is a demo)');
        
        // In production, you would send credentials to your backend:
        // fetch('/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         window.location.href = '/dashboard';
        //     } else {
        //         alert('Invalid credentials');
        //     }
        // });
    });
    
    // Handle Google login button
    const googleBtn = document.querySelector('.google-btn');
    googleBtn.addEventListener('click', function() {
        console.log('Google login clicked');
        alert('Google OAuth integration would go here');
        
        // In production, implement OAuth flow:
        // window.location.href = '/auth/google';
    });
    
    // Handle forgot password link
    const forgotPassword = document.querySelector('.forgot-password');
    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Forgot password clicked');
        alert('Password reset functionality would go here');
        
        // In production, redirect to password reset page:
        // window.location.href = '/forgot-password';
    });
    
    // Handle sign up link
    const signupLink = document.querySelector('.signup-link a');
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Sign up clicked');
        alert('Sign up page would go here');
        
        // In production, redirect to sign up page:
        // window.location.href = '/signup';
    });
});
