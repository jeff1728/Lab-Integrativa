let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function renderCheckoutPage() {
  const cartSummary = document.getElementById("cart-summary");
  const checkoutTotal = document.getElementById("checkout-total");

  if (cartItems.length === 0) {
    cartSummary.innerHTML = `<p>Tu carrito está vacío.</p>`;
    checkoutTotal.textContent = "0.00";
    return;
  }

  // Agregar encabezados de columnas
  cartSummary.innerHTML = `
    <div class="row font-weight-bold mb-2">
      <div class="col-2">Producto</div>
      <div class="col-3">Nombre</div>
      <div class="col-3">Descripción</div>
      <div class="col-2">Cantidad</div>
      <div class="col-2">Subtotal</div>
    </div>
  `;

  // Mostrar productos en el resumen
  cartSummary.innerHTML += cartItems
    .map(
      (item) => `
        <div class="row align-items-center mb-3">
          <div class="col-2">
            <img src="${item.image}" alt="${
        item.name
      }" class="img-fluid" style="max-width: 100%; max-height: 50px;">
          </div>
          <div class="col-3">${item.name}</div>
          <div class="col-3">${item.description || "Sin descripción"}</div>
          <div class="col-2">
            <div class="d-flex align-items-center">
              <button class="btn btn-sm btn-outline-secondary decrease" data-id="${
                item.id
              }">-</button>
              <span class="mx-2">${item.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary increase" data-id="${
                item.id
              }">+</button>
            </div>
          </div>
          <div class="col-2">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      `
    )
    .join("");

  // Calcular y mostrar el total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  checkoutTotal.textContent = total.toFixed(2);

  setupQuantityControls();
}

function setupQuantityControls() {
  document.querySelectorAll(".decrease").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      updateQuantity(productId, -1);
      renderCheckoutPage();
    });
  });

  document.querySelectorAll(".increase").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      updateQuantity(productId, 1);
      renderCheckoutPage();
    });
  });
}

function updateQuantity(productId, delta) {
  const product = cartItems.find((item) => item.id === productId);
  if (product) {
    product.quantity = Math.max(1, product.quantity + delta);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
}

document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  Swal.fire({
    icon: "success",
    title: "¡Pedido confirmado!",
    text: "Gracias por tu compra.",
  });
  localStorage.removeItem("cartItems");
  window.location.href = "carlosc.html"; // Redirigir a la página principal
});

renderCheckoutPage();
