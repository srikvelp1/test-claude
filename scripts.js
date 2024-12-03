// Shopping Cart State
let cart = [];
let cartTotal = 0;

// Cart Operations
function addToCart(product) {
    cart.push(product);
    cartTotal += parseFloat(product.price.replace('$', ''));
    updateCartUI();
    showNotification('Product added to cart!');
}

function removeFromCart(index) {
    cartTotal -= parseFloat(cart[index].price.replace('$', ''));
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    // Update cart page if we're on it
    const cartItems = document.querySelector('.cart-items');
    if (cartItems) {
        renderCartItems();
        updateCartSummary();
    }
}

function renderCartItems() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <h3>${item.name}</h3>
            <p>${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join('');
}

function updateCartSummary() {
    const subtotal = document.querySelector('.subtotal');
    const shipping = document.querySelector('.shipping');
    const total = document.querySelector('.total-amount');

    if (subtotal && shipping && total) {
        const shippingCost = cart.length > 0 ? 10 : 0;
        subtotal.textContent = `$${cartTotal.toFixed(2)}`;
        shipping.textContent = `$${shippingCost.toFixed(2)}`;
        total.textContent = `$${(cartTotal + shippingCost).toFixed(2)}`;
    }
}

// Search Functionality
function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        const category = product.dataset.category.toLowerCase();
        
        if (title.includes(searchTerm) || 
            description.includes(searchTerm) || 
            category.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Filter Functionality
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-button');

    // Update active button state
    buttons.forEach(button => {
        if (button.dataset.category === category) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Filter products
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Profile Form Handling
function handleProfileUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // In a real app, this would be sent to a server
    console.log('Profile update:', data);
    showNotification('Profile updated successfully!');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Search
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }

    // Filters
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterProducts(category);
        });
    });

    // Add to Cart buttons
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const product = {
                name: productCard.querySelector('.product-title').textContent,
                price: productCard.querySelector('.product-price').textContent
            };
            addToCart(product);
        });
    });

    // Profile Form
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }

    // Initialize cart UI
    updateCartUI();
});
