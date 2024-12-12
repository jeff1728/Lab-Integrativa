let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Cargar del localStorage o iniciar vacío

// Actualizar el contador del carrito
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Mostrar/ocultar barra lateral con restricción mejorada
export function toggleCartSidebar() {
  const cartSidebar = document.getElementById("cart-sidebar");

  // Verificar si la barra lateral ya está visible
  const isCartVisible = cartSidebar.classList.contains("visible");

  // Si el carrito está vacío y se intenta abrir
  if (!isCartVisible && cartItems.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Carrito vacío",
      text: "Debe agregar al menos un producto al carrito antes de abrirlo.",
    });
    return; // Bloquear apertura
  }

  // Mostrar o cerrar el carrito
  cartSidebar.classList.toggle("visible");
}

// Agregar un producto al carrito
export function addToCart(product) {
  const existingProduct = cartItems.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cartItems.push({ ...product });
  }

  // Guardar en localStorage
  saveCartToLocalStorage();

  // Actualizar el contador y la barra lateral
  updateCartCount();
  renderCartSidebar();
}

// Guardar carrito en localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Renderizar barra lateral y página del carrito
function renderCartSidebar() {
  const cartSidebarContent = document.getElementById("cart-sidebar-content");
  const cartTotals = document.getElementById("cart-totals");

  // Mostrar productos en la barra lateral
  if (cartItems.length === 0) {
    cartSidebarContent.innerHTML = `<p class="text-muted">Tu carrito está vacío.</p>`;
  } else {
    cartSidebarContent.innerHTML = cartItems
      .map(
        (item) => `
        <div class="cart-item d-flex align-items-center py-2 border-bottom">
          <img src="${item.image}" alt="${
          item.name
        }" class="cart-item-image img-fluid" style="max-width: 50px; margin-right: 10px;">
          <div class="cart-item-info flex-fill">
            <h5 class="text-truncate">${item.name}</h5>
            <p class="text-muted">Precio: $${item.price.toFixed(2)}</p>
            <div class="d-flex align-items-center justify-content-between">
              <div class="quantity-controls d-flex align-items-center">
                <button class="btn btn-outline-primary btn-sm decrease" data-id="${
                  item.id
                }">-</button>
                <input type="number" value="${
                  item.quantity
                }" min="1" class="form-control form-control-sm mx-2 quantity-input" data-id="${
          item.id
        }">
                <button class="btn btn-outline-primary btn-sm increase" data-id="${
                  item.id
                }">+</button>
              </div>
              <button class="btn btn-danger btn-sm remove-item ml-3" data-id="${
                item.id
              }" title="Eliminar">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  // Calcular y mostrar totales
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartTotals.innerHTML = `
    <h5 class="mt-4">Totales del carrito</h5>
    <p class="text-muted">Subtotal: $${subtotal.toFixed(2)}</p>
    <button class="btn btn-success btn-block mt-3" id="checkout-button">Finalizar compra</button>
  `;

  // Asignar eventos para controles dinámicos
  setupCartEventListeners();

  // Botón de finalizar compra
  document.getElementById("checkout-button").addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
}

// Renderizar página principal del carrito
export function renderCartPage() {
  const cartItemsTable = document.getElementById("cart-items");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsTable || !cartSubtotal || !cartTotal) return;

  if (cartItems.length === 0) {
    cartItemsTable.innerHTML = `<tr><td colspan="5" class="text-center">Tu carrito está vacío.</td></tr>`;
  } else {
    cartItemsTable.innerHTML = cartItems
      .map(
        (item) => `
        <tr>
          <td><img src="${item.image}" alt="${
          item.name
        }" style="max-width: 50px;"> ${item.name}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>
            <button class="btn btn-sm decrease" data-id="${item.id}">-</button>
            ${item.quantity}
            <button class="btn btn-sm increase" data-id="${item.id}">+</button>
          </td>
          <td>$${(item.price * item.quantity).toFixed(2)}</td>
          <td><button class="btn btn-danger btn-sm remove-item" data-id="${
            item.id
          }">Eliminar</button></td>
        </tr>
      `
      )
      .join("");
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  cartSubtotal.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  cartTotal.textContent = `Total: $${subtotal.toFixed(2)}`;

  setupCartEventListeners();
}

// Configurar eventos en la barra lateral y página principal
function setupCartEventListeners() {
  document.querySelectorAll(".decrease").forEach((btn) => {
    btn.addEventListener("click", (e) =>
      updateQuantity(e.target.dataset.id, -1)
    );
  });

  document.querySelectorAll(".increase").forEach((btn) => {
    btn.addEventListener("click", (e) =>
      updateQuantity(e.target.dataset.id, 1)
    );
  });

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.closest(".remove-item").dataset.id;
      removeFromCart(productId);
    });
  });

  // Botón "Seguir comprando"
  const continueShoppingButton = document.getElementById("continue-shopping");
  if (continueShoppingButton) {
    continueShoppingButton.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }
}

// Actualizar cantidad de producto
function updateQuantity(productId, delta) {
  const product = cartItems.find((item) => item.id === productId);
  if (product) {
    product.quantity = Math.max(1, product.quantity + delta);

    // Guardar cambios en localStorage
    saveCartToLocalStorage();

    renderCartSidebar();
    renderCartPage();
    updateCartCount();
  }
}

// Eliminar un producto del carrito
function removeFromCart(productId) {
  cartItems = cartItems.filter((item) => item.id !== productId);

  // Guardar cambios en localStorage
  saveCartToLocalStorage();

  renderCartSidebar();
  renderCartPage();
  updateCartCount();
}

// Inicializar el carrito al cargar la página
export function initializeCart() {
  updateCartCount();
  renderCartSidebar();
  renderCartPage();
}
