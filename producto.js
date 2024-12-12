import { createProductCard } from "./card.js";
import { showProductDetails } from "./productDetails.js";
import { toggleCartSidebar, addToCart, initializeCart } from "./cart.js";

document.getElementById("cart-icon").addEventListener("click", (event) => {
  if (window.location.pathname.includes("cart.html")) {
    event.preventDefault();
    return;
  }
  toggleCartSidebar();
});

document
  .getElementById("close-cart-sidebar")
  .addEventListener("click", toggleCartSidebar);

const products = [
  {
    id: "1",
    name: "Desinfectante",
    price: 29.99,
    image: "img/Desinfectante.jpg",
    description: "Desinfectante para múltiples superficies.",
  },
  {
    id: "2",
    name: "Jabón líquido ",
    price: 49.99,
    image: "img/Jabon-liquido.jpg",
    description: "Jabón líquido suave para manos.",
  },
  {
    id: "3",
    name: "Limpiador",
    price: 19.99,
    image: "img/Limpiador.jpg",
    description: "Limpiador de pisos con aroma fresco.",
  },
  {
    id: "4",
    name: "Toallas de Papel",
    price: 3.0,
    image: "img/toallas-papel.jpg",
    description: "Toallas de papel.",
  },
];

export function initializeProductPage() {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const card = createProductCard(product, handleView, handleAddToCart);

    // Añadimos clases a los elementos relevantes
    const priceElement = card.querySelector(".price");
    if (priceElement) {
      priceElement.classList.add("price");
    }

    const textPrimaryElement = card.querySelector(
      ".card-text.text-primary.font-weight-bold"
    );
    if (textPrimaryElement) {
      textPrimaryElement.classList.add("primary-text");
    }

    card.classList.add("card", "h-100", "text-center");
    productContainer.appendChild(card);
  });
}

function handleView(product) {
  const productContainer = document.getElementById("product-container");
  showProductDetails(product, handleAddToCart);
}

function handleAddToCart(product) {
  addToCart({ ...product, quantity: 1 });
}

// Escuchar el cambio de tema y actualizar las tarjetas, precios y texto principal
document.addEventListener("theme-change", (event) => {
  const theme = event.detail;
  const cards = document.querySelectorAll(".card.h-100.text-center");
  const prices = document.querySelectorAll(".price");
  const primaryTexts = document.querySelectorAll(".primary-text");

  cards.forEach((card) => {
    if (theme === "dark") {
      card.style.backgroundColor = "#444"; // Fondo gris oscuro
      card.style.color = "white"; // Texto blanco
    } else {
      card.style.backgroundColor = "white"; // Fondo blanco
      card.style.color = "black"; // Texto negro
    }
  });

  prices.forEach((price) => {
    if (theme === "dark") {
      price.style.color = "white"; // Precio en blanco en modo oscuro
    } else {
      price.style.color = "black"; // Precio en negro en modo claro
    }
  });

  primaryTexts.forEach((text) => {
    text.style.color = theme === "dark" ? "white" : "#007bff"; // Cambiar color de texto principal
  });
});

document.addEventListener("DOMContentLoaded", () => {
  initializeProductPage();
  initializeCart();
});
