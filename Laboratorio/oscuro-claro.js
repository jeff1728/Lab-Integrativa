class DarkModeToggle extends HTMLElement {
  constructor() {
    super();

    // Crear el Shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // HTML del componente
    shadow.innerHTML = `
            <style>
              @import url('boton.css');
                .switch {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    padding: 5px 10px;
                    background: var(--bg-color, #fff);
                    border: 1px solid #ddd;
                    border-radius: 20px;
                    font-size: 14px;
                    color: var(--text-color, #000);
                }
                .switch input {
                    display: none;
                }
                .switch span {
                    margin-left: 8px;
                }
                .dark {
                    --bg-color: #222;
                    --text-color: #fff;
                }
            </style>
            <label class="switch">
                <input type="checkbox" id="toggle-checkbox" />
                <span>🌙 / ☀️</span>
            </label>
        `;

    this.checkbox = shadow.querySelector("#toggle-checkbox");
    this.checkbox.addEventListener("change", this.toggleTheme.bind(this));

    // Sincronizar con el estado inicial
    this.initTheme();
  }

  toggleTheme() {
    if (this.checkbox.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }

  initTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      this.checkbox.checked = true;
    }
  }
}

// Registrar el componente
customElements.define("dark-mode-toggle", DarkModeToggle);
