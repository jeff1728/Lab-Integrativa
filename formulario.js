class Formulario extends HTMLElement {
  constructor() {
    super();

    // Crea el Shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Define la estructura y estilos del formulario
    shadow.innerHTML = `
      <style>
        @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
        
        /* Estilos generales */
        :host {
          display: block;
          font-family: Arial, sans-serif;
        }

        /* Estilo por defecto (tema claro) */
        :host {
          background-color: #ffffff;
          color: #000000;
        }

        .bg-light {
          background-color: #F3F6FF !important;
          margin-top: 40px;
          padding: 20px;
        }

        .form-control {
          display: block;
          width: 100%;
          height: calc(1.5em + 0.75rem + 2px);
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          color: #495057;
          background-color: #fff;
          border: 1px solid #ced4da;
          border-radius: 0;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        /* Tema oscuro */
        :host(.dark) {
          background-color: #222222;
          color: white;
        }

        :host(.dark) .bg-light {
          background-color: #333333 !important; /* Fondo oscuro para el contenedor */
        }

        :host(.dark) .form-control {
          background-color: #444444;
          color: white;
          border-color: #555555;
        }

        :host(.dark) .form-control:focus {
          border-color: #4caf50;
        }

        :host(.dark) label {
          color: #cccccc;
        }
      </style>
      <div class="bg-light p-5">
        <h3 class="font-weight-bold mb-4">Deja un comentario</h3>
        <form>
          <div class="form-group">
            <label for="name">Nombre</label>
            <input type="text" class="form-control" id="name" required />
          </div>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" class="form-control" id="email" required />
          </div>
          <div class="form-group">
            <label for="website">Sitio Web</label>
            <input type="url" class="form-control" id="website" />
          </div>
          <div class="form-group">
            <label for="message">Mensaje</label>
            <textarea
              id="message"
              cols="30"
              rows="5"
              class="form-control"
              required
            ></textarea>
          </div>
          <div class="form-group mt-3 mb-0">
            <input
              type="submit"
              value="Enviar Comentario"
              class="btn btn-primary px-3"
            />
          </div>
        </form>
      </div>
    `;
  }

  connectedCallback() {
    // Escucha el evento de cambio de tema
    document.addEventListener(
      "theme-change",
      this.handleThemeChange.bind(this)
    );
  }

  disconnectedCallback() {
    // Elimina el listener al desconectar
    document.removeEventListener(
      "theme-change",
      this.handleThemeChange.bind(this)
    );
  }

  handleThemeChange(event) {
    const theme = event.detail; // 'dark' o 'light'
    if (theme === "dark") {
      this.classList.add("dark");
    } else {
      this.classList.remove("dark");
    }
  }
}

// Define el nuevo elemento personalizado
customElements.define("formulario-comentarios", Formulario);
