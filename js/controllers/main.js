
import { servicesProducts } from "../services/product-service.js";

const productsContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="img-container">
            <img src="${image}" alt="${name}">
        </div>
        <div class="card-container--info">
            <p>${name}</p>
            <div class="card-container--value">
                <p>${price}</p>
                <button class="delete-button" data-id="${id}">
                    <img src="assets/eliminar.png" alt="">
                </button>
            </div>
        </div>
    `;
    productsContainer.appendChild(card);
    console.log("Card created:", card);
    return card;
}

const render = async () => {
    try {
        productsContainer.innerHTML = '';
        const listProducts = await servicesProducts.getProducts();
        console.log("List of products:", listProducts);

        listProducts.forEach((product) => {
            createCard(
                product.name,
                product.price,
                product.image,
                product.id
            );
        });
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameInput = document.querySelector("[data-name]");
    const priceInput = document.querySelector("[data-price]");
    const imageInput = document.querySelector("[data-image]");

    // Verifica si los elementos existen
    if (!nameInput || !priceInput || !imageInput) {
        console.error("No se pudieron encontrar uno o más campos del formulario");
        return;
    }

    const name = nameInput.value;
    const price = priceInput.value;
    const imageUrl = imageInput.value;

    if (!name || !price || !imageUrl) {
        console.error("Por favor, completa todos los campos");
        return;
    }

    // Valida la URL de la imagen antes de crear la tarjeta de producto
    if (!isValidImageUrl(imageUrl)) {
        console.error("La URL de la imagen no es válida");
        return;
    }

    try {
        const newProduct = await servicesProducts.createProduct(name, price, imageUrl);
        console.log("Nuevo producto creado:", newProduct);
        await render();
    } catch (err) {
        console.error(err);
    }
});

productsContainer.addEventListener("click", async (event) => {
    const deleteButton = event.target.closest(".delete-button");
    if (deleteButton) {
        const id = deleteButton.dataset.id;
        const productToDelete = document.querySelector(`[data-id="${id}"]`);
        if (productToDelete) {
            productToDelete.remove();
            try {
                await servicesProducts.deleteProduct(id);
                console.log("Producto eliminado:", id);
            } catch (err) {
                console.error(err);
            }
        }
    }
});

render();

function isValidImageUrl(url) {
    // Expresión regular para validar URLs de imagen
    const regex = /\.(jpeg|jpg|gif|png)$/i;
    return regex.test(url);
}