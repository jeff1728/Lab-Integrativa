class CardComponent extends HTMLElement {
  constructor() {
    super();
    // Shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Estructura del componente
    shadow.innerHTML = `
      <style>
        @import url("card.css");
      </style>
      <div class="card">
        <img src="${this.getAttribute("img-src")}" alt="${this.getAttribute(
      "img-alt"
    )}" class="card-img">
        <div class="card-body">
          <h3>${this.getAttribute("title")}</h3>
          <p>${this.getAttribute("text")}</p>
          <a href="${this.getAttribute(
            "link"
          )}" class="btn-cc">${this.getAttribute("button-text")}</a>
        </div>
      </div>
    `;

    // Escuchar cambios de tema
    document.addEventListener("theme-change", (event) => {
      const theme = event.detail;
      const card = shadow.querySelector(".card");
      const cardBody = shadow.querySelector(".card-body");
      const button = shadow.querySelector(".btn-cc");
      const paragraph = shadow.querySelector("p");

      if (theme === "dark") {
        card.style.backgroundColor = "#333";
        card.style.color = "white";
        button.style.backgroundColor = "#444";
        button.style.color = "#fff";
        paragraph.style.color = "#ccc"; // Párrafo en color claro
      } else {
        card.style.backgroundColor = "#f9f9f9";
        card.style.color = "#000";
        button.style.backgroundColor = "#007bff";
        button.style.color = "#fff";
        paragraph.style.color = "#555"; // Párrafo en color oscuro
      }
    });
  }
}

// Registrar el componente
customElements.define("card-component", CardComponent);
