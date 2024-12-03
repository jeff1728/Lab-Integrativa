
class PricingCard extends HTMLElement {
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
    
        customElements.define("pricing-card", PricingCard);
