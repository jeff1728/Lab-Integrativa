class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    // Crear el shadow DOM
    const shadow = this.attachShadow({ mode: "open" }); //El modo "open" permite que el código externo acceda al shadow DOM usando element.shadowRoot.

    // Define la estructura :v
    shadow.innerHTML = `
      <style>
        .toggle-container {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 25px;
        }

        .toggle-checkbox {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 25px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "\\2600"; /* Ícono de sol por defecto */
          font-size: 16px;
          left: 4px;
          bottom: 4px;
          color: #f39c12;
          transition: 0.4s;
        }

        .toggle-checkbox:checked + .toggle-slider {
          background-color: #4caf50;
        }

        .toggle-checkbox:checked + .toggle-slider:before {
          content: "\\1F319"; /* Ícono de luna */
          transform: translateX(25px);
          color: #f1c40f;
        }
      </style>

      <label class="toggle-container">
        <input type="checkbox" class="toggle-checkbox" /> 
        <span class="toggle-slider"></span> 
      </label>
    `;

    // Obtener el checkbox
    const checkbox = shadow.querySelector(".toggle-checkbox");

    // Cambiar tema al hacer clic
    checkbox.addEventListener("change", () => {
      const body = document.getElementById("page-body"); // se modifica el fondo y el texto del elemento con Id
      const theme = checkbox.checked ? "dark" : "light";

      if (body) {
        // Cambiar el estilo del body
        body.style.backgroundColor = theme === "dark" ? "#222" : "white";
        body.style.color = theme === "dark" ? "white" : "black";
      } else {
        console.error("El elemento con ID 'page-body' no existe.");
      }

      // Emitir evento personalizado para informar a otros componentes
      const themeChangeEvent = new CustomEvent("theme-change", {
        detail: theme,
      });
      document.dispatchEvent(themeChangeEvent); //Se envia al documento para otros componentes
    });
  }
}

// Registrar el componente
customElements.define("theme-toggle", ThemeToggle);
