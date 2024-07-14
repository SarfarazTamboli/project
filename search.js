let cart = [];

function addToCart(id, name, image, price) {
    const product = cart.find(item => item.id === id);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ id, name, image, price, quantity: 1 });
    }
    updateCartCount();
    updateTotalPrice();
}

function updateCartCount() {
    const cartButton = document.getElementById('cart-button');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartButton.innerHTML = `<span>&#128722;</span> Cart (${totalCount})`;
}

function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    if (modal.style.display === 'block') {
        displayCartItems();
        updateTotalPrice();
    }
}

function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;">
            <p>${item.name}</p>
            <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            <p>Quantity: <button onclick="decrementQuantity(${item.id})">-</button> ${item.quantity} <button onclick="incrementQuantity(${item.id})">+</button></p>
            <button onclick="checkout(${item.id})">Checkout</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

function incrementQuantity(id) {
    const product = cart.find(item => item.id === id);
    if (product) {
        product.quantity++;
        displayCartItems();
        updateCartCount();
        updateTotalPrice();
    }
}

function decrementQuantity(id) {
    const product = cart.find(item => item.id === id);
    if (product && product.quantity > 1) {
        product.quantity--;
        displayCartItems();
        updateCartCount();
        updateTotalPrice();
    }
}

function updateTotalPrice() {
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

function checkout(id) {
    const productIndex = cart.findIndex(item => item.id === id);
    if (productIndex > -1) {
        alert(`Thank you for purchasing ${cart[productIndex].name} for $${(cart[productIndex].price * cart[productIndex].quantity).toFixed(2)}!`);
        cart.splice(productIndex, 1);
        updateCartCount();
        displayCartItems();
        updateTotalPrice();
    }
}

function checkoutAll() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for your purchase!");
    cart = [];
    updateCartCount();
    toggleCartModal();
}


function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
  }
