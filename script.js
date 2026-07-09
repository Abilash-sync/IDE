document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    console.log('Login attempt:', {
        email: email,
        password: '***',
        remember: remember
    });
    
    alert(`Login submitted!\nEmail: ${email}\nRemember me: ${remember}`);
});
