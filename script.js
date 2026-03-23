let products = [
    {
        id: 1,
        name: "Men T-Shirt",
        price: 499,
        category: "fashion",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },
    {
        id: 2,
        name: "Running Shoes",
        price: 1999,
        category: "fashion",
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 2999,
        category: "electronics",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1518441902110-3d5d3b5d7a2d"
    },
    {
        id: 4,
        name: "Headphones",
        price: 1499,
        category: "electronics",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167"
    },
    {
      id: 5,
      name: "Laptop",
      price: 50000,
      category: "electronics",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    }
];

// DISPLAY
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

// ADD TO CART
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(p => p.id === id);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({ id: id, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

// DISPLAY CART
if (document.getElementById("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartDiv = document.getElementById("cart");
    let total = 0;

    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = "<h3>Your cart is empty 😢</h3>";
    }

    cart.forEach((item, index) => {
        let p = products.find(x => x.id === item.id);
        let itemTotal = p.price * item.qty;
        total += itemTotal;

        cartDiv.innerHTML += `
        <div class="card">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <p>Quantity: ${item.qty}</p>

            <button onclick="increaseQty(${index})">➕</button>
            <button onclick="decreaseQty(${index})">➖</button>
            <button onclick="removeItem(${index})">Remove</button>

            <p><b>Total: ₹${itemTotal}</b></p>
        </div>`;
    });

    document.getElementById("total").innerText = "Grand Total: ₹" + total;
}

// INCREASE
function increaseQty(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].qty++;
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// DECREASE
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

// REMOVE
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// CHECKOUT
function checkout() {
    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    window.location.href = "index.html";
}
