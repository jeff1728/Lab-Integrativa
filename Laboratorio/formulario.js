class FormularioComentarios extends HTMLElement {
  constructor() {
    super();

    // Crea el Shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Contenido del formulario
    const template = document.createElement("template");
    template.innerHTML = `
        <style>
          @import url('css/style.css');
        </style>
        <div class="bg-light p-5">
          <h3 class="font-weight-bold mb-4">Deja un comentario</h3>
          <form>
            <div class="form-group">
              <label for="name">Nombre *</label>
              <input type="text" class="form-control" id="name" required />
            </div>
            <div class="form-group">
              <label for="email">Correo Electrónico *</label>
              <input type="email" class="form-control" id="email" required />
            </div>
            <div class="form-group">
              <label for="website">Sitio Web</label>
              <input type="url" class="form-control" id="website" />
            </div>
            <div class="form-group">
              <label for="message">Mensaje *</label>
              <textarea
                id="message"
                cols="30"
                rows="5"
                class="form-control"
                required
              ></textarea>
            </div>
            <div class="form-group mb-0">
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
}

// Define el nuevo elemento personalizado
customElements.define("formulario-comentarios", FormularioComentarios);
