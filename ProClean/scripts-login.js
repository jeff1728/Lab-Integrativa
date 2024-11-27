// Función para registrar un nuevo usuario
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Guardar credenciales en localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = 'Login-Usuario-MelanyMoreira.html'; 
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Función para iniciar sesión
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validar credenciales
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        alert('Inicio de sesión exitoso. ¡Bienvenido!');
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});
