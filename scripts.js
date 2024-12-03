// Cart functionality
let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Search functionality
function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Filter functionality
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const productCategory = product.dataset.category;
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// User profile dropdown
function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown-content');
    dropdown.classList.toggle('show');
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.search-bar');
    const filterButtons = document.querySelectorAll('.filter-button');
    const buyButtons = document.querySelectorAll('.buy-button');

    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterProducts(category);
        });
    });

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                name: button.closest('.product-card').querySelector('.product-title').textContent,
                price: button.closest('.product-card').querySelector('.product-price').textContent
            };
            addToCart(product);
        });
    });
});
