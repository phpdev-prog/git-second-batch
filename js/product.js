const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function fetchProductDetails() {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await res.json();

    document.getElementById("product-details").innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" width="200">
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button class="btn btn-warning" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
}

fetchProductDetails();
