const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
};

const createProduct = async (name, price, image) => {
    const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, image }),
    });
    if (!response.ok) {
        throw new Error("Failed to create product");
    }
    return response.json();
};

const deleteProduct = async (id) => {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete product");
    }
    return response.json();
};

export const servicesProducts = {
    getProducts: fetchProducts,
    createProduct,
    deleteProduct,
};
