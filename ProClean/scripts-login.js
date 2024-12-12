class LoginComponent extends HTMLElement {
    constructor() {
        super();
        // Crea un shadow DOM para encapsular el componente
        this.attachShadow({ mode: 'open' });
        // Inicializa una lista vacía de usuarios
        this.users = [];
    }

    connectedCallback() {
        // Método llamado cuando el componente es agregado al DOM
        this.render(); // Renderiza el contenido inicial del componente
        this.loadUsers(); // Carga usuarios previamente registrados desde localStorage
    }

    render() {
        // Define el HTML del componente dentro del shadow DOM
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="css/styleLogin.css">
            <div class="container">
                <div id="formContainer"></div>
                <div class="toggle-form">
                    <p id="toggleLink">¿No tienes cuenta? Regístrate</p>
                </div>
            </div>
        `;

        // Referencias a elementos dinámicos
        this.formContainer = this.shadowRoot.getElementById('formContainer');
        this.toggleLink = this.shadowRoot.getElementById('toggleLink');

        // Agrega un listener al enlace para alternar entre formularios
        this.toggleLink.addEventListener('click', () => this.toggleForm());

        // Muestra el formulario de inicio de sesión por defecto
        this.showLoginForm();
    }

    showLoginForm() {
        // Define el contenido del formulario de inicio de sesión
        this.formContainer.innerHTML = `
            <h2>Iniciar Sesión</h2>
            <div id="loginAlert"></div>
            <form id="loginForm">
                <div class="form-group">
                    <label>Usuario</label>
                    <input type="text" id="loginUsername" required>
                </div>
                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="password" id="loginPassword" required>
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        `;

        // Agrega un listener para manejar el envío del formulario
        const loginForm = this.shadowRoot.getElementById('loginForm');
        loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    showRegistrationForm() {
        // Define el contenido del formulario de registro
        this.formContainer.innerHTML = `
            <h2>Registrarse</h2>
            <div id="registerAlert"></div>
            <form id="registrationForm">
                <div class="form-group">
                    <label>Usuario</label>
                    <input type="text" id="regUsername" required>
                </div>
                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="password" id="regPassword" required>
                </div>
                <div class="form-group">
                    <label>Confirmar Contraseña</label>
                    <input type="password" id="regConfirmPassword" required>
                </div>
                <button type="submit">Registrarse</button>
            </form>
        `;

        // Agrega un listener para manejar el envío del formulario
        const registrationForm = this.shadowRoot.getElementById('registrationForm');
        registrationForm.addEventListener('submit', (e) => this.handleRegistration(e));
    }

    toggleForm() {
        // Alterna entre el formulario de inicio de sesión y el de registro
        if (this.shadowRoot.querySelector('h2').textContent === 'Iniciar Sesión') {
            this.showRegistrationForm();
            this.toggleLink.textContent = '¿Ya tienes cuenta? Inicia sesión';
        } else {
            this.showLoginForm();
            this.toggleLink.textContent = '¿No tienes cuenta? Regístrate';
        }
    }

    handleLogin(e) {
        e.preventDefault(); // Previene el envío predeterminado del formulario
        const username = this.shadowRoot.getElementById('loginUsername').value;
        const password = this.shadowRoot.getElementById('loginPassword').value;
        const loginAlert = this.shadowRoot.getElementById('loginAlert');

        // Busca un usuario con las credenciales proporcionadas
        const user = this.users.find(u => u.username === username && u.password === password);

        if (user) {
            // Muestra un mensaje de éxito si las credenciales son correctas
            loginAlert.innerHTML = `<div class="alert alert-success">Inicio de sesión exitoso para ${username}</div>`;
            this.clearAlert(loginAlert);
            this.closeModal(); // Cierra el modal tras iniciar sesión
        } else {
            // Muestra un mensaje de error si las credenciales son incorrectas
            loginAlert.innerHTML = `<div class="alert alert-error">Credenciales incorrectas</div>`;
            this.clearAlert(loginAlert);
        }
    }

    handleRegistration(e) {
        e.preventDefault(); // Previene el envío predeterminado del formulario
        const username = this.shadowRoot.getElementById('regUsername').value;
        const password = this.shadowRoot.getElementById('regPassword').value;
        const confirmPassword = this.shadowRoot.getElementById('regConfirmPassword').value;
        const registerAlert = this.shadowRoot.getElementById('registerAlert');

        // Valida que las contraseñas coincidan
        if (password !== confirmPassword) {
            registerAlert.innerHTML = `<div class="alert alert-error">Las contraseñas no coinciden</div>`;
            this.clearAlert(registerAlert);
            return;
        }

        // Verifica si el usuario ya existe
        if (this.users.some(u => u.username === username)) {
            registerAlert.innerHTML = `<div class="alert alert-error">El usuario ya existe</div>`;
            this.clearAlert(registerAlert);
            return;
        }

        // Agrega un nuevo usuario a la lista y lo guarda en localStorage
        this.users.push({ username, password });
        this.saveUsers();
        registerAlert.innerHTML = `<div class="alert alert-success">Registro exitoso para ${username}</div>`;
        this.clearAlert(registerAlert);

        // Cambia al formulario de inicio de sesión tras el registro
        this.showLoginForm();
        this.toggleLink.textContent = '¿No tienes cuenta? Regístrate';
    }

    clearAlert(alertElement) {
        // Limpia el contenido de un mensaje de alerta tras 3 segundos
        setTimeout(() => {
            alertElement.innerHTML = '';
        }, 3000);
    }

    closeModal() {
        // Oculta el componente tras 3 segundos
        setTimeout(() => {
            this.style.display = 'none';
        }, 3000);
    }

    saveUsers() {
        // Guarda los usuarios registrados en localStorage
        localStorage.setItem('registeredUsers', JSON.stringify(this.users));
    }

    loadUsers() {
        // Carga los usuarios registrados desde localStorage
        const savedUsers = localStorage.getItem('registeredUsers');
        if (savedUsers) {
            this.users = JSON.parse(savedUsers);
        }
    }
}

// Define el componente personalizado
customElements.define('login-component', LoginComponent);
