let products = [
    {id: 1, name: "Men's T-Shirt", price: 499, category: "fashion", rating: 4.5, image: "https://via.placeholder.com/200"},
    {id: 2, name: "Running Shoes", price: 1999, category: "fashion", rating: 4.2, image: "https://via.placeholder.com/200"},
    {id: 3, name: "Smart Watch", price: 2999, category: "electronics", rating: 4.7, image: "https://via.placeholder.com/200"},
    {id: 4, name: "Headphones", price: 1499, category: "electronics", rating: 4.3, image: "https://via.placeholder.com/200"}
];

function displayProducts(list) {
    const container = document.getElementById("products");
    if (!container) return;

    container.innerHTML = "";

    list.forEach(p => {
        container.innerHTML += `
        <div class="card">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>⭐ ${p.rating}</p>
            <p><b>₹${p.price}</b></p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
}

if (document.getElementById("products")) {
    displayProducts(products);
}

function searchProduct() {
    let value = document.getElementById("search").value.toLowerCase();
    let filtered = products.filter(p => p.name.toLowerCase().includes(value));
    displayProducts(filtered);
}

function filterCategory(cat) {
    if (cat === "all") {
        displayProducts(products);
    } else {
        let filtered = products.filter(p => p.category === cat);
        displayProducts(filtered);
    }
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p => p.id === id);

    if (item) item.qty++;
    else cart.push({id: id, qty: 1});

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

if (document.getElementById("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartDiv = document.getElementById("cart");
    let total = 0;

    cart.forEach((item, index) => {
        let product = products.find(p => p.id === item.id);
        let itemTotal = product.price * item.qty;
        total += itemTotal;

        cartDiv.innerHTML += `
        <div class="card">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <p>Qty: ${item.qty}</p>
            <button onclick="removeItem(${index})">Remove</button>
        </div>`;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function checkout() {
    localStorage.removeItem("cart");
    alert("Order placed!");
    window.location.href = "index.html";
}
