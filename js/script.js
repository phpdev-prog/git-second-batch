const API_URL = "https://fakestoreapi.com/products";
const productList = document.getElementById("product-list");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
let products = [];

// Fetch products
async function fetchProducts() {
    const res = await fetch(API_URL);
    products = await res.json();
    displayProducts(products);
}

// Display products
function displayProducts(productArray) {
    productList.innerHTML = "";
    productArray.forEach(product => {
        productList.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">$${product.price}</p>
                        <a href="product.html?id=${product.id}" class="btn btn-primary">View</a>
                        <button class="btn btn-warning" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Fetch categories
async function fetchCategories() {
    const res = await fetch(`${API_URL}/categories`);
    const categories = await res.json();
    categories.forEach(category => {
        categoryFilter.innerHTML += `<option value="${category}">${category}</option>`;
    });
}

// Search & Filter
searchBox.addEventListener("input", () => {
    let query = searchBox.value.toLowerCase();
    let filteredProducts = products.filter(p => p.title.toLowerCase().includes(query));
    displayProducts(filteredProducts);
});

categoryFilter.addEventListener("change", () => {
    let category = categoryFilter.value;
    if (category === "all") {
        displayProducts(products);
    } else {
        fetch(`${API_URL}/category/${category}`)
            .then(res => res.json())
            .then(filteredProducts => displayProducts(filteredProducts));
    }
});

// Add to Cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}

// Initialize
fetchProducts();
fetchCategories();
updateCartCount();
