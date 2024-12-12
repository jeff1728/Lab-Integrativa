class ContactoForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Select the template from the document
        const templateContent = document.getElementById('formulario').content;
        this.shadowRoot.appendChild(templateContent.cloneNode(true));

        this.shadowRoot.querySelector('form').addEventListener('submit', (event) => {
            if (!event.target.checkValidity()) {
                event.preventDefault(); // Evitar el envío
                event.stopPropagation(); // Detener la propagación del evento
                event.target.classList.add('was-validated'); // Aplicar estilos de Bootstrap para campos inválidos
            }
        });
    }
}

customElements.define('contacto-form', ContactoForm);