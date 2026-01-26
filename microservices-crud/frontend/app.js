const apiBase = '/api/v1';

// Users
async function getUsers() {
  const usersDiv = document.getElementById('users');
  const errorDiv = document.getElementById('users-error');
  usersDiv.innerHTML = '<div class="spinner"></div>';
  errorDiv.textContent = '';
  try {
    const res = await fetch(`${apiBase}/users`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    usersDiv.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    usersDiv.innerHTML = '';
    errorDiv.textContent = 'Failed to load users: ' + err.message;
  }
}

// Products
async function getProducts() {
  const productsDiv = document.getElementById('products');
  const errorDiv = document.getElementById('products-error');
  productsDiv.innerHTML = '<div class="spinner"></div>';
  errorDiv.textContent = '';
  try {
    const res = await fetch(`${apiBase}/products`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    productsDiv.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    productsDiv.innerHTML = '';
    errorDiv.textContent = 'Failed to load products: ' + err.message;
  }
}

// Orders
async function getOrders() {
  const ordersDiv = document.getElementById('orders');
  const errorDiv = document.getElementById('orders-error');
  ordersDiv.innerHTML = '<div class="spinner"></div>';
  errorDiv.textContent = '';
  try {
    const res = await fetch(`${apiBase}/orders`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    ordersDiv.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    ordersDiv.innerHTML = '';
    errorDiv.textContent = 'Failed to load orders: ' + err.message;
  }
}
