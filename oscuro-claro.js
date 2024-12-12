class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    // Crear el shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Define la estructura :
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
      const body = document.getElementById("page-body"); // Fondo de la página
      const cartSidebar = document.getElementById("cart-sidebar"); // Barra lateral del carrito
      const theme = checkbox.checked ? "dark" : "light";

      // Cambiar el estilo del body
      if (body) {
        body.style.backgroundColor = theme === "dark" ? "#222" : "white";
        body.style.color = theme === "dark" ? "white" : "black";
      } else {
        console.error("El elemento con ID 'page-body' no existe.");
      }

      // Cambiar el estilo de la barra lateral del carrito
      if (cartSidebar) {
        cartSidebar.style.backgroundColor =
          theme === "dark" ? "#333" : "#f8f9fa";
        cartSidebar.style.color = theme === "dark" ? "white" : "black";
      } else {
        console.error("El elemento con ID 'cart-sidebar' no existe.");
      }

      // Emitir evento personalizado para informar a otros componentes
      const themeChangeEvent = new CustomEvent("theme-change", {
        detail: theme,
      });
      document.dispatchEvent(themeChangeEvent);
    });
  }
}

// Registrar el componente
customElements.define("theme-toggle", ThemeToggle);
