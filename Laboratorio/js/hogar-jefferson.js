
class ProductoCard extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const title = this.getAttribute("title");
        const image = this.getAttribute("image");
        const features = this.getAttribute("features").split(",");

        const container = document.createElement("div");
        container.setAttribute("class", "card-container");

        container.innerHTML = `
                    <div class="circle">
                        <img src="${image}" alt="${title}" class="image">
                        <h3 class="title">${title}</h3>
                    </div>
                    <ul class="features">
                        ${features.map(feature => `<li>${feature.trim()}</li>`).join("")}
                    </ul>
                    <button class="btn">Comprar ${title}</button>
                `;


        const style = document.createElement("style");
        style.textContent = `
    .card-container {
        background: #f8f9fa;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 20px;
        text-align: center;
        transition: transform 0.3s;
    }

    .card-container:hover {
        transform: translateY(-10px);
    }

    .circle {
        width: 200px;
        height: 200px;
        margin: 0 auto 20px;
        background: #fff;
        border-radius: 50%;
        border: 10px solid #ffffff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden; /* Asegura que la imagen no se salga del círculo */
    }

    .image {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        border: 5px solid #ccc;
        position: absolute;
        top: 35px;
        left: 50%;
        transform: translateX(-50%);
        transition: transform 0.6s ease-in-out; /* Para animaciones suaves */
    }

    /* Animación de giro */
    @keyframes spin {
        0% {
            transform: translateX(-50%) rotateY(0deg);
        }
        100% {
            transform: translateX(-50%) rotateY(360deg);
        }
    }

    .circle:hover .image {
        animation: spin 1s infinite; /* Activa la animación de giro */
    }

    .title {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 18px;
        color: #333;
    }

    .features {
        list-style: none;
        padding: 0;
        margin: 20px 0;
    }

    .features li {
        font-size: 14px;
        color: #555;
    }

    .btn {
        background: #194376;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }

    .btn:hover {
        background: #46c6ce;
    }
`;

        shadow.appendChild(style);
        shadow.appendChild(container);
    }
}

customElements.define("producto-card", ProductoCard);

class RatingStars extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        // Estructura HTML
        const container = document.createElement("div");
        container.setAttribute("class", "rating-container");
        container.innerHTML = `
                    <h2 class="rating-title">¿Te gustan nuestros productos? Califícanos!</h2>
                    <div class="stars"> 
                        <span data-value="1" class="star">&#9734;</span>
                        <span data-value="2" class="star">&#9734;</span>
                        <span data-value="3" class="star">&#9734;</span>
                        <span data-value="4" class="star">&#9734;</span>
                        <span data-value="5" class="star">&#9734;</span>
                    </div>
                `;

        const style = document.createElement("style");
        style.textContent = `
                    .rating-container {
                        text-align: center;
                        padding: 20px;
                        background: #f8f9fa;
                        border-radius: 10px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
        
                    .rating-title {
                        font-size: 24px;
                        margin-bottom: 15px;
                        color: #333;
                    }
        
                    .stars {
                        display: flex;
                        justify-content: center;
                        gap: 10px;
                        font-size: 32px;
                        color: #ccc;
                        cursor: pointer;
                    }
        
                    .star {
                        transition: color 0.3s ease;
                    }
        
                    .star:hover,
                    .star.selected {
                        color: #ffc107;
                    }
        
                    .star:hover ~ .star {
                        color: #ccc;
                    }
        
                    .rating-feedback {
                        margin-top: 15px;
                        font-size: 18px;
                        color: #555;
                    }
                `;

        container.querySelectorAll(".star").forEach(star => {  //selecciona todas las estrellas y las recorre
            star.addEventListener("click", (e) => {
                const value = e.target.getAttribute("data-value"); //obtiene el valor de data-value (numero de la estrella)
                container.querySelectorAll(".star").forEach(star => {
                    star.classList.remove("selected");
                });
                for (let i = 0; i < value; i++) {
                    container.querySelectorAll(".star")[i].classList.add("selected"); //aplica la clase desde la primera hasta la seleccionada
                }
            });
        });

        shadow.appendChild(style);
        shadow.appendChild(container);
    }
}

customElements.define("rating-stars", RatingStars);

