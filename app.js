let allProducts = [];
let filteredProducts = [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    setupNavigation();
});

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            searchProducts(query);
        });
    }

    // Close modal on background click
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                closeModal();
            }
        });
    }

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

async function loadProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Error loading products.json');
        allProducts = await response.json();
        filteredProducts = [...allProducts];
        renderProducts();
    } catch (error) {
        console.error('Error:', error);
        showEmptyState();
    }
}

function filterByCategory(category) {
    currentFilter = category;
    
    const filters = document.querySelectorAll('.tag-filter');
    filters.forEach(f => f.classList.remove('active'));
    event.target.classList.add('active');
    
    if (category === 'all') {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(p => p.category === category);
    }
    
    renderProducts();
}

function searchProducts(query) {
    if (query === '') {
        if (currentFilter === 'all') {
            filteredProducts = [...allProducts];
        } else {
            filteredProducts = allProducts.filter(p => p.category === currentFilter);
        }
    } else {
        filteredProducts = allProducts.filter(product => {
            return (
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
            );
        });
    }
    renderProducts();
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0;">
                <p style="color: var(--text-tertiary); font-size: 1rem;">No products found. Please try another search.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-header">
                <div>
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                        <div class="product-icon">${product.icon}</div>
                        <div class="product-header-text">
                            <h3>${escapeHtml(product.name)}</h3>
                            <div class="version">v${product.version}</div>
                        </div>
                    </div>
                </div>
                <div class="product-badge">${product.category}</div>
            </div>
            <div class="product-body">
                <p class="product-description">${escapeHtml(product.description)}</p>
                <div class="product-specs">
                    <div class="spec">
                        <div class="spec-label">Size</div>
                        <div class="spec-value">${product.size}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-label">Downloads</div>
                        <div class="spec-value">${product.downloads}</div>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn-download" onclick="openModal('${escapeHtml(product.name)}', '${escapeHtml(product.description)}', '${product.url}', '${product.version}', '${product.size}', '${product.icon}', '${product.category}')">Download</button>
                    <button class="btn-info" onclick="openModal('${escapeHtml(product.name)}', '${escapeHtml(product.description)}', '${product.url}', '${product.version}', '${product.size}', '${product.icon}', '${product.category}')">Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

function openModal(name, description, url, version, size, icon, category) {
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
        <div class="modal-header">
            <div class="modal-icon">${icon}</div>
            <div>
                <div class="modal-category">${category}</div>
                <div class="modal-title">${name}</div>
            </div>
        </div>
        <p class="modal-description">${description}</p>
        <div class="modal-specs">
            <div class="modal-spec">
                <div class="modal-spec-label">Version</div>
                <div class="modal-spec-value">${version}</div>
            </div>
            <div class="modal-spec">
                <div class="modal-spec-label">File Size</div>
                <div class="modal-spec-value">${size}</div>
            </div>
        </div>
        <div class="modal-footer">
            <a href="${url}" download class="btn btn-primary" style="flex: 1;">
                Download Now
            </a>
            <button onclick="closeModal()" class="btn btn-secondary" style="flex: 1;">
                Close
            </button>
        </div>
    `;

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

function showEmptyState() {
    const grid = document.getElementById('productsGrid');
    if (grid) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0;">
                <p style="color: var(--text-tertiary); font-size: 1rem;">Error loading products. Please try again later.</p>
            </div>
        `;
    }
}