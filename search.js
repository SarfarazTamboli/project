let cart = [];

function addToCart(id, name, image) {
  const product = cart.find(item => item.id === id);
  if (product) {
    product.quantity++;
  } else {
    cart.push({ id, name, image, quantity: 1 });
  }
  updateCartCount();
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
      <p>Quantity: <button onclick="decrementQuantity(${item.id})">-</button> ${item.quantity} <button onclick="incrementQuantity(${item.id})">+</button></p>
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
  }
}

function decrementQuantity(id) {
  const product = cart.find(item => item.id === id);
  if (product && product.quantity > 1) {
    product.quantity--;
    displayCartItems();
    updateCartCount();
  }
}



function toggleSidebar() {
  var sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
}
