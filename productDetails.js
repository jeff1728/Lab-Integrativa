// productDetails.js

export function showProductDetails(product, onAddToCart) {
  const detailsContent = document.getElementById("details-content");

  // Agregar estilos dinámicos
  const style = document.createElement("style");
  style.textContent = `
      .product-details-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        padding: 20px;
        border-radius: 8px;
        background-color: #ffffff; /* Fondo blanco */
        justify-content: center; /* Centra horizontalmente */
        align-items: center;    /* Centra verticalmente */
        max-width: 800px;
        margin: 0 auto; /* Centra todo el contenedor */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Agrega sombra suave */
      }
      .product-image {
        flex: 1 1 40%; /* Ajusta el tamaño relativo de la imagen */
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .product-image img {
        max-height: 250px;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .product-info {
        flex: 1 1 50%; /* Ajusta el tamaño relativo de la sección de texto */
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Alinea el contenido en la parte superior */
        text-align: left;
        padding-left: 20px; /* Reduce el espacio entre imagen y texto */
      }
      .product-info h2 {
        font-size: 1.8rem;
        font-weight: bold;
        color: #007bff;
        margin-bottom: 10px;
      }
      .product-info p {
        font-size: 1rem;
        color: #6c757d;
        margin-bottom: 10px;
      }
      .details-price {
        font-size: 1.2rem;
        font-weight: bold;
        color: #28a745;
        margin: 15px 0;
      }
      .quantity-selector {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 15px 0;
      }
      .quantity-selector button {
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 5px 15px;
        font-size: 1rem;
        cursor: pointer;
      }
      .quantity-selector button:hover {
        background-color: #0056b3;
      }
      .quantity-selector input {
        width: 60px;
        text-align: center;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 5px;
      }
      .quantity-selector input::-webkit-outer-spin-button,
      .quantity-selector input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .quantity-selector input {
        -moz-appearance: textfield;
      }
      #add-to-cart {
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px 15px;
        font-size: 1rem;
        cursor: pointer;
        width: fit-content;
        align-self: flex-start; /* Alinea el botón al inicio del texto */
      }
      #add-to-cart:hover {
        background-color: #218838;
      }
      .product-details-title {
        font-size: 2rem;
        font-weight: bold;
        color: #343a40;
        text-align: center;
        margin-bottom: 20px;
      }
    `;
  document.head.appendChild(style);

  // Crear contenido dinámico con diseño ajustado
  detailsContent.innerHTML = `
        <div>
          <!-- Título -->
          <h1 class="product-details-title">Detalles del producto</h1>
          <div class="product-details-container">
            <!-- Imagen -->
            <div class="product-image">
              <img src="${product.image}" alt="${
    product.name
  }" class="img-fluid rounded">
            </div>
            <!-- Detalles -->
            <div class="product-info">
              <h2 class="text-primary">${product.name}</h2>
              <p>${product.description || "Descripción no disponible"}</p>
              <p class="details-price">Precio: $${product.price.toFixed(2)}</p>
              <div class="quantity-selector">
                <button id="decrease" class="btn btn-outline-primary btn-sm">-</button>
                <input
                  type="number"
                  id="quantity"
                  value="1"
                  min="1"
                  class="form-control text-center"
                >
                <button id="increase" class="btn btn-outline-primary btn-sm">+</button>
              </div>
              <button id="add-to-cart" class="btn btn-primary mt-3">Agregar al carrito</button>
            </div>
          </div>
        </div>
      `;

  // Manejar cantidad
  const quantityInput = document.getElementById("quantity");
  document.getElementById("decrease").addEventListener("click", () => {
    const current = parseInt(quantityInput.value, 10);
    if (current > 1) quantityInput.value = current - 1;
  });
  document.getElementById("increase").addEventListener("click", () => {
    quantityInput.value = parseInt(quantityInput.value, 10) + 1;
  });

  // Manejar clic en "Agregar al carrito"
  document.getElementById("add-to-cart").addEventListener("click", () => {
    const quantity = parseInt(quantityInput.value, 10);
    onAddToCart({ ...product, quantity });
    // Barra lateral no se abre aquí
  });

  // Mostrar la sección de detalles
  document.getElementById("product-details").style.display = "block";

  document.getElementById("product-container").style.display = "none";
}
