class CardComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
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
  }
}

// Registrar el componente
customElements.define("card-component", CardComponent);
