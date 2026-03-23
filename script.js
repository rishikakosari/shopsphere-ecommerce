// ================= PRODUCTS =================
let products = [
    {
        id: 1,
        name: "T-Shirt",
        price: 499,
        category: "fashion",
        rating: 4.5,
        image: "https://via.placeholder.com/200"
    },
    {
        id: 2,
        name: "Running Shoes",
        price: 1999,
        category: "fashion",
        rating: 4.2,
        image: "https://via.placeholder.com/200"
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 2999,
        category: "electronics",
        rating: 4.7,
        image: "https://via.placeholder.com/200"
    },
    {
        id: 4,
        name: "Headphones",
        price: 1499,
        category: "electronics",
        rating: 4.3,
        image: "https://via.placeholder.com/200"
    }
];

// ================= DISPLAY PRODUCTS =================
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

// Load products on homepage
if (document.getElementById("products")) {
    displayProducts(products);
}

// ================= SEARCH =================
function searchProduct() {
    let value = document.getElementById("search").value.toLowerCase();
    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );
    displayProducts(filtered);
}

// ================= FILTER =================
function filterCategory(cat) {
    if (cat === "all") {
        displayProducts(products);
    } else {
        let filtered = products.filter(p => p.category === cat);
        displayProducts(filtered);
    }
}

// ================= CART =================
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(p => p.id === id);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({ id: id, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Added to cart!");
}

// ================= DISPLAY CART =================
if (document.getElementById("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartDiv = document.getElementById("cart");
    let total = 0;

    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = "<h3>Your cart is empty 😢</h3>";
    }

    cart.forEach((item, index) => {
        let product = products.find(p => p.id === item.id);

        let itemTotal = product.price * item.qty;
        total += itemTotal;

        cartDiv.innerHTML += `
        <div class="card">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <p>Quantity: ${item.qty}</p>
            <p><b>Total: ₹${itemTotal}</b></p>

            <button onclick="increaseQty(${index})">+</button>
            <button onclick="decreaseQty(${index})">-</button>
            <button onclick="removeItem(${index})">Remove</button>
        </div>`;
    });

    document.getElementById("total").innerText = "Grand Total: ₹" + total;
}

// ================= INCREASE QTY =================
function increaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].qty++;
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// ================= DECREASE QTY =================
function decreaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// ================= REMOVE ITEM =================
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// ================= CHECKOUT =================
function checkout() {
    localStorage.removeItem("cart");
    alert("🎉 Order placed successfully!");
    window.location.href = "index.html";
}