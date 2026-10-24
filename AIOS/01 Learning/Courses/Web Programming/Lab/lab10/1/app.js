const API_BASE_URL = 'http://webdev.it.kmitl.ac.th:4000';

const listView = document.getElementById('list-view');
const detailView = document.getElementById('detail-view');
const productGrid = document.getElementById('product-grid');

// Fetch and display all products
async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/restaurant`);
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        productGrid.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
}

// Render the list of products
function renderProducts(products) {
    productGrid.innerHTML = '';
    
    // Attempt to handle if products is nested in an object, but usually it's an array directly
    const productArray = Array.isArray(products) ? products : products.data || [];

    productArray.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="card-img-top" onerror="this.src='https://via.placeholder.com/250x200?text=No+Image'">
            <div class="card-body">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-text">${product.description || ''}</p>
                <button class="btn" onclick="showDetail(${product.id})">Detail</button>
            </div>
        `;
        
        productGrid.appendChild(card);
    });
}

// Fetch and display product detail
async function showDetail(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/detail/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product details');
        
        const data = await response.json();
        // The API might return an array with one item or a single object
        const product = Array.isArray(data) ? data[0] : data;
        
        renderDetail(product);
        
        // Switch views
        listView.classList.add('hidden');
        detailView.classList.remove('hidden');
        
        // Scroll to top
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Error loading detail:', error);
        alert('Error loading product details. Please try again.');
    }
}

// Render the detail view
function renderDetail(product) {
    detailView.innerHTML = `
        <h2 class="detail-title">Product ${product.id} Detail</h2>
        <img src="${product.image}" alt="${product.name}" class="detail-img" onerror="this.src='https://via.placeholder.com/600x400?text=No+Image'">
        <h3 class="detail-name">${product.name}</h3>
        <p class="detail-desc">Description : ${product.description || ''}</p>
        <p class="detail-price">Price : ${product.price || 0}</p>
        <p class="detail-amount">Amount : ${product.amount || 0}</p>
        <div class="detail-actions">
            <button class="btn btn-back" onclick="goBack()">Go Back</button>
        </div>
    `;
}

// Go back to the list view
function goBack() {
    detailView.classList.add('hidden');
    listView.classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
