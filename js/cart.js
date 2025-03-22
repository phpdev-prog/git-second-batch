function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";
    cart.forEach(async id => {
        let res = await fetch(`https://fakestoreapi.com/products/${id}`);
        let product = await res.json();
        cartItems.innerHTML += `<p>${product.title} - $${product.price}</p>`;
    });
}

function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}

displayCart();
