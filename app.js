// Global state
let allSoftware = [];
let filteredSoftware = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSoftware();
    setupEventListeners();
    setupNavigation();
});

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filterSoftware(query);
        });
    }

    // Close modal on background click
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
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

// Setup navigation
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

// Load software from JSON
async function loadSoftware() {
    try {
        const response = await fetch('software.json');
        if (!response.ok) throw new Error('Error loading software.json');
        allSoftware = await response.json();
        filteredSoftware = [...allSoftware];
        renderSoftware();
    } catch (error) {
        console.error('Error:', error);
        showEmptyState();
    }
}

// Filter software
function filterSoftware(query) {
    filteredSoftware = allSoftware.filter(software => {
        return (
            software.name.toLowerCase().includes(query) ||
            software.description.toLowerCase().includes(query) ||
            software.category?.toLowerCase().includes(query)
        );
    });
    renderSoftware();
}

// Render software grid
function renderSoftware() {
    const grid = document.getElementById('softwareGrid');
    if (!grid) return;

    if (filteredSoftware.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0;">
                <p style="color: var(--gray-500); font-size: 1.1rem;">No se encontraron resultados</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredSoftware.map(software => `
        <div class="software-card">
            <div class="software-header">
                <div class="software-icon">${software.icon || '💻'}</div>
                <div class="software-header-text">
                    <h3>${escapeHtml(software.name)}</h3>
                    <span class="version">v${software.version}</span>
                </div>
            </div>
            <div class="software-body">
                <p class="software-description">${escapeHtml(software.description)}</p>
                <div class="software-meta">
                    <span>${software.category || 'General'}</span>
                    <span>${software.size || 'N/A'}</span>
                </div>
                <button class="download-btn" onclick="openModal('${escapeHtml(software.name)}', '${escapeHtml(software.description)}', '${software.downloadUrl}', '${software.version}', '${software.size || 'N/A'}', '${software.icon || '💻'}', '${software.category || 'General'}')">
                    Descargar Ahora
                </button>
            </div>
        </div>
    `).join('');
}

// Open modal
function openModal(name, description, url, version, size, icon, category) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-icon">${icon}</div>
            <div class="modal-header-text">
                <h2>${name}</h2>
                <p>${category}</p>
            </div>
        </div>
        <p class="modal-description">${description}</p>
        <div class="modal-info">
            <div class="info-item">
                <label>Versión</label>
                <span>${version}</span>
            </div>
            <div class="info-item">
                <label>Tamaño</label>
                <span>${size}</span>
            </div>
        </div>
        <div class="modal-footer">
            <a href="${url}" download class="btn btn-primary" style="flex: 1;">
                Descargar
            </a>
            <button onclick="closeModal()" class="btn btn-secondary" style="flex: 1;">
                Cancelar
            </button>
        </div>
    `;

    modal.classList.add('active');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Escape HTML
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

// Show empty state
function showEmptyState() {
    const grid = document.getElementById('softwareGrid');
    if (grid) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0;">
                <p style="color: var(--gray-500); font-size: 1.1rem;">Error al cargar el software. Por favor, intenta más tarde.</p>
            </div>
        `;
    }
}