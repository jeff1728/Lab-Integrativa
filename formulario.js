class FormularioComentarios extends HTMLElement {
  constructor() {
    super();

    // Crea el Shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Contenido del formulario
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
      @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
      
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
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      }
      .bg-light {
        background-color: #F3F6FF !important;
      }
      :host(.dark) .bg-light {
        background-color: #194376 !important;
      }
      :host(.dark) {
        background-color: #222;
        color: white;
      }

      :host(.dark input, :host(.dark textarea) {
        background-color: #444;
        color: white;
        border-color: #555;
      }

      :host(.dark input:focus, :host(.dark textarea:focus) {
        border-color: #4caf50;
      }

      :host(.dark label) {
        color: #ccc;
      }
      </style>
      <div class="bg-light p-5">
        <h3 class="font-weight-bold mb-4">Deja un comentario</h3>
        <form>
          <div class="form-group">
            <label for="name">Nombre </label>
            <input type="text" class="form-control" id="name" required />
          </div>
          <div class="form-group">
            <label for="email">Correo Electrónico </label>
            <input type="email" class="form-control" id="email" required />
          </div>
          <div class="form-group">
            <label for="website">Sitio Web</label>
            <input type="url" class="form-control" id="website" />
          </div>
          <div class="form-group">
            <label for="message">Mensaje </label>
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

    // Adjunta contenido al Shadow DOM
    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // Observa cambios en el tema
    document.addEventListener("theme-change", this.updateTheme.bind(this));
  }

  disconnectedCallback() {
    document.removeEventListener("theme-change", this.updateTheme.bind(this));
  }

  updateTheme(event) {
    const theme = event.detail; // 'dark' o 'light'
    if (theme === "dark") {
      this.classList.add("dark");
    } else {
      this.classList.remove("dark");
    }
  }
}

// Define el nuevo elemento personalizado
customElements.define("formulario-comentarios", FormularioComentarios);
