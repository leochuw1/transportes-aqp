// Datos de ejemplo para las rutas
const rutasPopulares = [
    {
        id: 1,
        numero: "A-1",
        tipo: "Bus",
        origen: "Plaza de Armas",
        destino: "Yanahuara",
        tiempo: "25 min",
        distancia: "5.2 km",
        frecuencia: "Cada 15 min"
    },
    {
        id: 2,
        numero: "C-5",
        tipo: "Combi",
        origen: "Sachaca",
        destino: "Cerro Colorado",
        tiempo: "40 min",
        distancia: "8.7 km",
        frecuencia: "Cada 10 min"
    },
    {
        id: 3,
        numero: "T-12",
        tipo: "Colectivo",
        origen: "Alto Selva Alegre",
        destino: "Hunter",
        tiempo: "35 min",
        distancia: "7.1 km",
        frecuencia: "Cada 8 min"
    },
    {
        id: 4,
        numero: "B-7",
        tipo: "Bus",
        origen: "Cercado",
        destino: "Paucarpata",
        tiempo: "30 min",
        distancia: "6.5 km",
        frecuencia: "Cada 12 min"
    },
    {
        id: 5,
        numero: "M-3",
        tipo: "Combi",
        origen: "Tingo",
        destino: "Miraflores",
        tiempo: "20 min",
        distancia: "4.3 km",
        frecuencia: "Cada 7 min"
    },
    {
        id: 6,
        numero: "R-9",
        tipo: "Colectivo",
        origen: "José Luis Bustamante",
        destino: "Mariano Melgar",
        tiempo: "28 min",
        distancia: "5.8 km",
        frecuencia: "Cada 10 min"
    }
];

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar rutas populares
    cargarRutasPopulares();
    
    // Configurar eventos
    configurarEventos();
});

// Función para cargar las rutas populares en el grid
function cargarRutasPopulares() {
    const routesGrid = document.getElementById('routesGrid');
    
    if (!routesGrid) return;
    
    routesGrid.innerHTML = '';
    
    rutasPopulares.forEach(ruta => {
        const routeCard = document.createElement('div');
        routeCard.className = 'route-card';
        routeCard.innerHTML = `
            <div class="route-header">
                <div class="route-number">Ruta ${ruta.numero}</div>
                <div class="route-type">${ruta.tipo}</div>
            </div>
            <div class="route-body">
                <div class="route-stops">
                    <div class="route-stop">
                        <i class="fas fa-map-marker-alt"></i>
                        <p>${ruta.origen}</p>
                    </div>
                    <div class="route-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                    <div class="route-stop">
                        <i class="fas fa-flag"></i>
                        <p>${ruta.destino}</p>
                    </div>
                </div>
                <div class="route-info">
                    <span><i class="far fa-clock"></i> ${ruta.tiempo}</span>
                    <span><i class="fas fa-road"></i> ${ruta.distancia}</span>
                    <span><i class="fas fa-bus"></i> ${ruta.frecuencia}</span>
                </div>
            </div>
        `;
        
        routesGrid.appendChild(routeCard);
    });
}

// Función para configurar todos los eventos
function configurarEventos() {
    // Menú móvil
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Formulario de búsqueda
    const searchForm = document.getElementById('searchForm');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const origen = document.getElementById('origen').value;
            const destino = document.getElementById('destino').value;
            const tipoTransporte = document.getElementById('tipo-transporte').value;
            
            if (origen && destino) {
                buscarRutas(origen, destino, tipoTransporte);
            } else {
                mostrarAlerta('Por favor, completa los campos de origen y destino', 'warning');
            }
        });
    }
    
    // Botón del mapa
    const showMapBtn = document.getElementById('showMapBtn');
    const map = document.getElementById('map');
    const mapPlaceholder = document.querySelector('.map-placeholder');
    
    if (showMapBtn && map && mapPlaceholder) {
        showMapBtn.addEventListener('click', function() {
            mapPlaceholder.style.display = 'none';
            map.style.display = 'block';
            inicializarMapa();
        });
    }
    
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función para buscar rutas
function buscarRutas(origen, destino, tipoTransporte) {
    // Simulación de búsqueda
    mostrarAlerta(`Buscando rutas de ${origen} a ${destino} (${tipoTransporte})`, 'info');
    
    // En una aplicación real, aquí harías una petición a una API
    setTimeout(() => {
        const rutasFiltradas = rutasPopulares.filter(ruta => {
            // Simulación de filtrado
            return (tipoTransporte === 'todos' || ruta.tipo.toLowerCase() === tipoTransporte.toLowerCase());
        });
        
        if (rutasFiltradas.length > 0) {
            mostrarResultadosBusqueda(rutasFiltradas);
        } else {
            mostrarAlerta('No se encontraron rutas para tu búsqueda', 'warning');
        }
    }, 1000);
}

// Función para mostrar resultados de búsqueda
function mostrarResultadosBusqueda(rutas) {
    const routesGrid = document.getElementById('routesGrid');
    
    if (!routesGrid) return;
    
    routesGrid.innerHTML = '';
    
    if (rutas.length === 0) {
        routesGrid.innerHTML = '<p class="no-results">No se encontraron rutas que coincidan con tu búsqueda</p>';
        return;
    }
    
    rutas.forEach(ruta => {
        const routeCard = document.createElement('div');
        routeCard.className = 'route-card';
        routeCard.innerHTML = `
            <div class="route-header">
                <div class="route-number">Ruta ${ruta.numero}</div>
                <div class="route-type">${ruta.tipo}</div>
            </div>
            <div class="route-body">
                <div class="route-stops">
                    <div class="route-stop">
                        <i class="fas fa-map-marker-alt"></i>
                        <p>${ruta.origen}</p>
                    </div>
                    <div class="route-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                    <div class="route-stop">
                        <i class="fas fa-flag"></i>
                        <p>${ruta.destino}</p>
                    </div>
                </div>
                <div class="route-info">
                    <span><i class="far fa-clock"></i> ${ruta.tiempo}</span>
                    <span><i class="fas fa-road"></i> ${ruta.distancia}</span>
                    <span><i class="fas fa-bus"></i> ${ruta.frecuencia}</span>
                </div>
            </div>
        `;
        
        routesGrid.appendChild(routeCard);
    });
    
    // Scroll a la sección de rutas
    const rutasSection = document.getElementById('rutas');
    if (rutasSection) {
        window.scrollTo({
            top: rutasSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Función para inicializar el mapa
function inicializarMapa() {
    const map = document.getElementById('map');
    
    if (!map) return;
    
    // En una aplicación real, aquí inicializarías un mapa con Leaflet o Google Maps
    map.innerHTML = `
        <div style="width:100%; height:100%; background:linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); display:flex; align-items:center; justify-content:center; color:white; flex-direction:column;">
            <i class="fas fa-map-marked-alt" style="font-size:4rem; margin-bottom:1rem;"></i>
            <h3>Mapa de Rutas de Arequipa</h3>
            <p style="margin-top:1rem; text-align:center; max-width:80%;">Aquí se mostraría un mapa interactivo con todas las rutas de transporte</p>
            <p style="margin-top:0.5rem; font-size:0.9rem;">(En una implementación real se usaría Leaflet, Google Maps, etc.)</p>
        </div>
    `;
}

// Función para mostrar alertas
function mostrarAlerta(mensaje, tipo = 'info') {
    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = `alerta alerta-${tipo}`;
    alerta.innerHTML = `
        <span>${mensaje}</span>
        <button class="alerta-cerrar">&times;</button>
    `;
    
    // Estilos para la alerta
    alerta.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: ${getComputedStyle(document.documentElement).getPropertyValue('--border-radius')};
        box-shadow: ${getComputedStyle(document.documentElement).getPropertyValue('--shadow')};
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        animation: slideIn 0.3s ease-out;
        color: white;
        font-weight: 500;
    `;
    
    // Colores según el tipo
    if (tipo === 'warning') {
        alerta.style.backgroundColor = '#ff9800';
    } else if (tipo === 'info') {
        alerta.style.backgroundColor = '#2196f3';
    } else {
        alerta.style.backgroundColor = '#4caf50';
    }
    
    // Botón para cerrar
    const cerrarBtn = alerta.querySelector('.alerta-cerrar');
    cerrarBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 15px;
    `;
    
    cerrarBtn.addEventListener('click', function() {
        alerta.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (alerta.parentNode) {
                alerta.parentNode.removeChild(alerta);
            }
        }, 300);
    });
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (alerta.parentNode) {
            alerta.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (alerta.parentNode) {
                    alerta.parentNode.removeChild(alerta);
                }
            }, 300);
        }
    }, 5000);
    
    // Agregar al DOM
    document.body.appendChild(alerta);
    
    // Agregar estilos de animación si no existen
    if (!document.querySelector('#estilos-alerta')) {
        const estilos = document.createElement('style');
        estilos.id = 'estilos-alerta';
        estilos.innerHTML = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(estilos);
    }
}

// En la función configurarEventos(), agregar:
configurarSesion();

// Nueva función para manejar la sesión
function configurarSesion() {
    const userMenu = document.getElementById('userMenu');
    const authButtons = document.getElementById('authButtons');
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    // Verificar sesión al cargar la página
    const sesion = obtenerSesionActiva();
    
    if (sesion) {
        // Usuario logueado
        if (userMenu) userMenu.style.display = 'block';
        if (authButtons) authButtons.style.display = 'none';
        
        const userName = document.getElementById('userName');
        if (userName) userName.textContent = sesion.nombre.split(' ')[0]; // Solo el primer nombre
    } else {
        // Usuario no logueado
        if (userMenu) userMenu.style.display = 'none';
        if (authButtons) authButtons.style.display = 'flex';
    }

    // Toggle dropdown del usuario
    if (userBtn && userDropdown) {
        userBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
    }

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', function() {
        if (userDropdown) {
            userDropdown.classList.remove('show');
        }
    });

    // Cerrar sesión
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cerrarSesion();
        });
    }
}

function obtenerSesionActiva() {
    const sesion = JSON.parse(localStorage.getItem('sesion') || sessionStorage.getItem('sesion') || 'null');
    
    if (sesion && (Date.now() - sesion.timestamp) < (24 * 60 * 60 * 1000)) {
        return sesion;
    } else {
        // Limpiar sesión expirada
        localStorage.removeItem('sesion');
        sessionStorage.removeItem('sesion');
        return null;
    }
}

function cerrarSesion() {
    localStorage.removeItem('sesion');
    sessionStorage.removeItem('sesion');
    window.location.reload();
}