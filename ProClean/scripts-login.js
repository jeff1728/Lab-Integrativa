class LoginComponent extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.users = [];
  }

  connectedCallback() {
      this.render();
      this.loadUsers();
  }

  render() {
      this.shadowRoot.innerHTML = `
          <style>
              :host {
                position: fixed;
                top: 75%;
                left: 85%;
                transform: translate(-50%, -50%); 
                width: 100%;
                height: 100%;
                display: flex; 
                justify-content: center;
                align-items: center;
                z-index: 1000; 
              }
              .container {
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                padding: 50px;
                width: 400px;
                max-width: 90%;
              }
              .form-group {
                  margin-bottom: 15px;
              }
              input {
                  width: 100%;
                  padding: 10px;
                  margin-top: 5px;
                  border: 1px solid #ddd;
                  border-radius: 4px;
              }
              button {
                  width: 100%;
                  padding: 10px;
                  background-color: #4CAF50;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
              }
              .toggle-form {
                  text-align: center;
                  margin-top: 15px;
              }
              .alert {
                  padding: 10px;
                  margin-bottom: 15px;
                  border-radius: 4px;
              }
              .alert-success {
                  background-color: #dff0d8;
                  color: #3c763d;
                  border: 1px solid #d6e9c6;
              }
              .alert-error {
                  background-color: #f2dede;
                  color: #a94442;
                  border: 1px solid #ebccd1;
              }
          </style>
          <div class="container">
              <div id="formContainer"></div>
              <div class="toggle-form">
                  <p id="toggleLink">¿No tienes cuenta? Regístrate</p>
              </div>
          </div>
      `;

      this.formContainer = this.shadowRoot.getElementById('formContainer');
      this.toggleLink = this.shadowRoot.getElementById('toggleLink');
      this.toggleLink.addEventListener('click', () => this.toggleForm());

      this.showLoginForm();
  }

  showLoginForm() {
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

      const loginForm = this.shadowRoot.getElementById('loginForm');
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
  }

  showRegistrationForm() {
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

      const registrationForm = this.shadowRoot.getElementById('registrationForm');
      registrationForm.addEventListener('submit', (e) => this.handleRegistration(e));
  }

  toggleForm() {
      if (this.shadowRoot.querySelector('h2').textContent === 'Iniciar Sesión') {
          this.showRegistrationForm();
          this.toggleLink.textContent = '¿Ya tienes cuenta? Inicia sesión';
      } else {
          this.showLoginForm();
          this.toggleLink.textContent = '¿No tienes cuenta? Regístrate';
      }
  }

  handleLogin(e) {
      e.preventDefault();
      const username = this.shadowRoot.getElementById('loginUsername').value;
      const password = this.shadowRoot.getElementById('loginPassword').value;
      const loginAlert = this.shadowRoot.getElementById('loginAlert');

      const user = this.users.find(u => u.username === username && u.password === password);

      if (user) {
          loginAlert.innerHTML = `<div class="alert alert-success">Inicio de sesión exitoso para ${username}</div>`;
          this.clearAlert(loginAlert);
      } else {
          loginAlert.innerHTML = `<div class="alert alert-error">Credenciales incorrectas</div>`;
          this.clearAlert(loginAlert);
      }
  }

  handleRegistration(e) {
      e.preventDefault();
      const username = this.shadowRoot.getElementById('regUsername').value;
      const password = this.shadowRoot.getElementById('regPassword').value;
      const confirmPassword = this.shadowRoot.getElementById('regConfirmPassword').value;
      const registerAlert = this.shadowRoot.getElementById('registerAlert');

      if (password !== confirmPassword) {
          registerAlert.innerHTML = `<div class="alert alert-error">Las contraseñas no coinciden</div>`;
          this.clearAlert(registerAlert);
          return;
      }

      if (this.users.some(u => u.username === username)) {
          registerAlert.innerHTML = `<div class="alert alert-error">El usuario ya existe</div>`;
          this.clearAlert(registerAlert);
          return;
      }

      this.users.push({ username, password });
      this.saveUsers();
      registerAlert.innerHTML = `<div class="alert alert-success">Registro exitoso para ${username}</div>`;
      this.clearAlert(registerAlert);
      
      // Cambiar a formulario de inicio de sesión
      this.showLoginForm();
      this.toggleLink.textContent = '¿No tienes cuenta? Regístrate';
  }

  clearAlert(alertElement) {
      setTimeout(() => {
          alertElement.innerHTML = '';
      }, 3000);
  }

  saveUsers() {
      localStorage.setItem('registeredUsers', JSON.stringify(this.users));
  }

  loadUsers() {
      const savedUsers = localStorage.getItem('registeredUsers');
      if (savedUsers) {
          this.users = JSON.parse(savedUsers);
      }
  }
}

customElements.define('login-component', LoginComponent);
