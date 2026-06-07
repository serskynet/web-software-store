// Cargar datos de software desde software.json
async function loadSoftware() {
    try {
        const response = await fetch('software.json');
        if (!response.ok) throw new Error('No se encontró software.json');
        const software = await response.json();
        renderSoftware(software);
    } catch (error) {
        console.error('Error cargando software:', error);
        document.getElementById('softwareGrid').innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <h2>📦 Sin software disponible</h2>
                <p>Edita software.json para agregar tus aplicaciones</p>
            </div>
        `;
    }
}

// Renderizar tarjetas de software
function renderSoftware(softwareList) {
    const grid = document.getElementById('softwareGrid');
    grid.innerHTML = '';

    if (softwareList.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <h2>📦 Sin software disponible</h2>
                <p>Agrega software en el archivo software.json</p>
            </div>
        `;
        return;
    }

    softwareList.forEach(software => {
        const card = document.createElement('div');
        card.className = 'software-card';
        card.innerHTML = `
            <div class="software-icon">${software.icon || '💻'}</div>
            <div class="software-info">
                <h3>${software.name}</h3>
                <p>${software.description}</p>
                <div class="software-meta">
                    <span class="version">v${software.version}</span>
                    <span>${software.size || 'N/A'}</span>
                </div>
                <button class="download-btn" onclick="openModal('${escapeHtml(software.name)}', '${escapeHtml(software.description)}', '${software.downloadUrl}', '${software.version}', '${software.size || 'N/A'}')">
                    ⬇️ Descargar
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Abrir modal con detalles
function openModal(name, description, url, version, size) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Descripción:</strong> ${description}</p>
        <p><strong>Versión:</strong> ${version}</p>
        <p><strong>Tamaño:</strong> ${size}</p>
        <p style="margin-top: 20px; font-size: 0.9rem; color: #666;">
            💡 El archivo se descargará directamente a tu carpeta de descargas
        </p>
        <a href="${url}" download class="download-btn" style="display: inline-block; text-align: center; text-decoration: none; color: white;">
            ✅ Confirmar Descarga
        </a>
    `;
    
    modal.style.display = 'block';
}

// Cerrar modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Escapar HTML para seguridad
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Event listeners
document.querySelector('.close').addEventListener('click', closeModal);

window.addEventListener('click', event => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Cargar software al iniciar
loadSoftware();