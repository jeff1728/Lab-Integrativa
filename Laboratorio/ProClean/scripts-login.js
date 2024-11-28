class LoginModal extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
              <!-- Bootstrap Icons -->
              <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
              <style>
                  .btn-close-custom {
                      background-color: #dc3545;
                      color: red;
                      font-size: 1.2rem;
                      width: 2rem;
                      height: 2rem;
                      border: none;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      cursor: pointer;
                      position: absolute;
                      top: 0.5rem;
                      right: 0.5rem;
                      transition: background-color 0.2s ease, transform 0.2s ease;
                  }
                  .btn-close-custom:hover {
                      background-color: #c82333;
                      transform: scale(1.1);
                  }
              </style>
              <div class="modal fade" tabindex="-1" id="loginModal" aria-labelledby="loginModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                      <div class="modal-content">
                          <div class="modal-header position-relative">
                              <h5 class="modal-title" id="loginModalLabel">Iniciar Sesión</h5>
                              <button type="button" class="btn-close-custom" data-bs-dismiss="modal" aria-label="Close">×</button>
                          </div>
                          <div class="modal-body">
                              <form id="loginForm">
                                  <div class="mb-3">
                                      <label for="loginUsername" class="form-label">Usuario</label>
                                      <input type="text" id="loginUsername" class="form-control" placeholder="Ingresa tu usuario" required>
                                  </div>
                                  <div class="mb-3">
                                      <label for="loginPassword" class="form-label">Contraseña</label>
                                      <input type="password" id="loginPassword" class="form-control" placeholder="Ingresa tu contraseña" required>
                                  </div>
                                  <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
                              </form>
                              <hr>
                              <h6 class="text-center">¿No tienes cuenta?</h6>
                              <a href="#" id="registerLink" class="btn btn-link text-center w-100">Regístrate aquí</a>
                          </div>
                      </div>
                  </div>
              </div>
          `;

    this.modalElement = shadow.querySelector(".modal");
  }

  connectedCallback() {
    this.initializeHandlers();
  }

  initializeHandlers() {
    const shadow = this.shadowRoot;

    // Abrir el modal de registro al hacer clic en "Regístrate"
    shadow.querySelector("#registerLink").addEventListener("click", () => {
      // Cerrar el modal de inicio de sesión
      const loginModalInstance = bootstrap.Modal.getInstance(this.modalElement);
      if (loginModalInstance) {
        loginModalInstance.hide();
      }

      // Abrir el modal de registro
      const registerModal = document.querySelector("register-modal");
      if (registerModal) {
        document.querySelector("#loginModal").setAttribute("inert", ""); // Inhabilita el modal de login
        registerModal.show();
        registerModal.shadowRoot.querySelector("input").focus(); // Foco en el primer input
        registerModal.shadowRoot
          .querySelector(".modal")
          .addEventListener("hidden.bs.modal", () => {
            document.querySelector("#loginModal").removeAttribute("inert"); // Reactiva el modal de login
          });
      }
    });

    // Manejo del formulario de inicio de sesión
    shadow.querySelector("#loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const username = shadow.querySelector("#loginUsername").value;
      const password = shadow.querySelector("#loginPassword").value;

      const storedUsername = localStorage.getItem("username");
      const storedPassword = localStorage.getItem("password");

      if (username === storedUsername && password === storedPassword) {
        alert("Inicio de sesión exitoso.");
        const modal = bootstrap.Modal.getInstance(this.modalElement);
        modal.hide(); // Cerrar el modal de login
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    });
  }

  show() {
    const modal = new bootstrap.Modal(this.modalElement);
    modal.show();
  }
}

class RegisterModal extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
              <!-- Bootstrap Icons -->
              <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
              <div class="modal fade" tabindex="-1" id="registerModal" aria-labelledby="registerModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                      <div class="modal-content">
                          <div class="modal-header position-relative">
                              <h5 class="modal-title" id="registerModalLabel">Registrar Usuario</h5>
                              <button type="button" class="btn-close-custom" data-bs-dismiss="modal" aria-label="Close">×</button>
                          </div>
                          <div class="modal-body">
                              <form id="registerForm">
                                  <div class="mb-3">
                                      <label for="registerUsername" class="form-label">Usuario</label>
                                      <input type="text" id="registerUsername" class="form-control" placeholder="Crea tu usuario" required>
                                  </div>
                                  <div class="mb-3">
                                      <label for="registerPassword" class="form-label">Contraseña</label>
                                      <input type="password" id="registerPassword" class="form-control" placeholder="Crea tu contraseña" required>
                                  </div>
                                  <button type="submit" class="btn btn-success w-100">Registrar</button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          `;

    this.modalElement = shadow.querySelector(".modal");
  }

  connectedCallback() {
    this.initializeHandlers();
  }

  initializeHandlers() {
    const shadow = this.shadowRoot;

    shadow.querySelector("#registerForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const username = shadow.querySelector("#registerUsername").value;
      const password = shadow.querySelector("#registerPassword").value;

      if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("¡Registro exitoso!");
        const modal = bootstrap.Modal.getInstance(this.modalElement);
        modal.hide(); // Cerrar el modal de registro
      } else {
        alert("Por favor completa todos los campos.");
      }
    });
  }

  show() {
    const modal = new bootstrap.Modal(this.modalElement);
    modal.show();
  }
}

customElements.define("login-modal", LoginModal);
customElements.define("register-modal", RegisterModal);

document.getElementById("openLoginModal").addEventListener("click", () => {
  const loginModal = document.querySelector("login-modal");
  loginModal.show();
});
