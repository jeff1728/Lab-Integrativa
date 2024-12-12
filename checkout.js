let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];//este arreglo almacena los datos de cartitems 
//en caso de no existir productos se inicializa como un arreglo  vacio

function renderCheckoutPage() {//Esta funcion renderiza la pagina de checkout
  const cartSummary = document.getElementById("cart-summary");
  const checkoutTotal = document.getElementById("checkout-total");

  if (cartItems.length === 0) {// si el carrito se encuentra vacio muestra un mensaje y se establece el total como 0
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
  cartSummary.innerHTML += cartItems// se mapea sobre cartitems para que se muestre cada producto en una fila
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
//busca el producto por su id en Cartitems
function updateQuantity(productId, delta) {
  const product = cartItems.find((item) => item.id === productId);
  if (product) {
    product.quantity = Math.max(1, product.quantity + delta); //Garantiza que la cantidad minima sea 1
    localStorage.setItem("cartItems", JSON.stringify(cartItems));//se guardan los camnbios en el localstorage
  }
}

document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  Swal.fire({
    icon: "success",
    title: "¡Pedido confirmado!",
    text: "Gracias por tu compra.",
    timer: 1000, // Mostrar durante 2segundos
    timerProgressBar: true, // Barra de progreso del temporizador
    showConfirmButton: false, // Evitar el botón de confirmación
  }).then(() => {
    localStorage.removeItem("cartItems"); //se limpia el carrito de compras jeje
    window.location.href = "carlosc.html"; // Redirigir a la página principal
  });
});

renderCheckoutPage();

renderCheckoutPage();
