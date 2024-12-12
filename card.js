// card.js

export function createProductCard(product, onView, onAddToCart) {
  const card = document.createElement("div");
  card.className = "col-md-4 mb-4"; // Bootstrap grid

  card.innerHTML = `
    <div class="card h-100 text-center">
      <div class="card-image position-relative">
        <img src="${product.image}" class="card-img-top img-fluid" alt="${
    product.name
  }">
        <div class="card-overlay d-flex justify-content-center align-items-center">
          <i class="fas fa-eye text-white mx-2 icon-view" style="font-size: 1.5rem; cursor: pointer;"></i>
          <i class="fas fa-cart-plus text-white mx-2 icon-add" style="font-size: 1.5rem; cursor: pointer;"></i>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text text-primary font-weight-bold">$${product.price.toFixed(
          2
        )}</p>
      </div>
    </div>
  `;

  // Manejar clic en "Ver Producto"
  card
    .querySelector(".icon-view")
    .addEventListener("click", () => onView(product));

  // Manejar clic en "Agregar al Carrito"
  card
    .querySelector(".icon-add")
    .addEventListener("click", () => onAddToCart(product));

  return card;
}
