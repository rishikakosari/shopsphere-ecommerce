let products = [
    {
        id: 1,
        name: "Men T-Shirt",
        price: 499,
        category: "fashion",
        rating: 4.5,
        image: "https://i.imgur.com/1X5QH6F.jpg"
    },
    {
        id: 2,
        name: "Running Shoes",
        price: 1999,
        category: "fashion",
        rating: 4.2,
        image: "https://i.imgur.com/0Z8FQ6T.jpg"
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 2999,
        category: "electronics",
        rating: 4.7,
        image: "https://i.imgur.com/7Qj6QkR.jpg"
    },
    {
        id: 4,
        name: "Headphones",
        price: 1499,
        category: "electronics",
        rating: 4.3,
        image: "https://i.imgur.com/5ZQZ1Zm.jpg"
    },
    {
        id: 5,
        name: "Saree",
        price: 1200,
        category: "fashion",
        rating: 4.6,
        image: "https://i.imgur.com/9pK8G1F.jpg"
    },
    {
        id: 6,
        name: "Kurti",
        price: 800,
        category: "fashion",
        rating: 4.4,
        image: "https://i.imgur.com/Y3ZQZkF.jpg"
    },
    {
        id: 7,
        name: "Mobile Phone",
        price: 15000,
        category: "electronics",
        rating: 4.5,
        image: "https://i.imgur.com/zY3ZQZk.jpg"
    },
    {
        id: 8,
        name: "Kids Clothing",
        price: 600,
        category: "fashion",
        rating: 4.3,
        image: "https://i.imgur.com/6ZQZ1Zm.jpg"
    },
    {
        id: 9,
        name: "Laptop",
        price: 55000,
        category: "electronics",
        rating: 4.8,
        image: "https://i.imgur.com/JQZQZkF.jpg"
    }
];

// DISPLAY PRODUCTS
function displayProducts(list) {
    let container = document.getElementById("products");
    if (!container) return;

    container.innerHTML = "";

    list.forEach(p => {
        container.innerHTML += `
        <div class="card">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>⭐ ${p.rating}</p>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
}

if (document.getElementById("products")) {
    displayProducts(products);
}

// SEARCH
function searchProduct() {
    let value = document.getElementById("search").value.toLowerCase();
    let filtered = products.filter(p => p.name.toLowerCase().includes(value));
    displayProducts(filtered);
}

// FILTER
function filterCategory(cat) {
    if (cat === "all") displayProducts(products);
    else displayProducts(products.filter(p => p.category === cat));
}

// CART
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p => p.id === id);

    if (item) item.qty++;
    else cart.push({id, qty: 1});

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added!");
}

// CART DISPLAY
if (document.getElementById("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    let cartDiv = document.getElementById("cart");

    cart.forEach((item, index) => {
        let p = products.find(x => x.id === item.id);
        let itemTotal = p.price * item.qty;
        total += itemTotal;

        cartDiv.innerHTML += `
        <div class="card">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <p>Qty: ${item.qty}</p>

            <button onclick="increaseQty(${index})">➕</button>
            <button onclick="decreaseQty(${index})">➖</button>
            <button onclick="removeItem(${index})">Remove</button>

            <p><b>Total: ₹${itemTotal}</b></p>
        </div>`;
    });

    document.getElementById("total").innerText = "Grand Total: ₹" + total;
}

// QUANTITY
function increaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].qty++;
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function decreaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].qty > 1) cart[index].qty--;
    else cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
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
