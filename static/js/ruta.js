// Datos de ejemplo para las rutas
const rutasDetalle = {
    'A-1': {
        numero: 'A-1',
        titulo: 'Plaza de Armas - Yanahuara',
        tipo: 'Bus',
        tiempo: '25 min',
        distancia: '5.2 km',
        frecuencia: 'Cada 15 min',
        tarifa: 'S/ 1.50',
        horarios: {
            semana: '05:30 - 22:00',
            sabados: '06:00 - 21:30',
            domingos: '07:00 - 20:00'
        },
        paradas: [
            { nombre: 'Plaza de Armas', tipo: 'inicio', descripcion: 'Punto de inicio' },
            { nombre: 'Mercado San Camilo', tipo: 'intermedia', descripcion: 'Parada intermedia' },
            { nombre: 'Puente Grau', tipo: 'intermedia', descripcion: 'Parada intermedia' },
            { nombre: 'Mirador de Yanahuara', tipo: 'final', descripcion: 'Punto final' }
        ],
        servicios: [
            'Accesible para sillas de ruedas',
            'WiFi disponible',
            'Aire acondicionado',
            'Frecuencia en horas pico: 8 min'
        ]
    },
    'C-5': {
        numero: 'C-5',
        titulo: 'Sachaca - Cerro Colorado',
        tipo: 'Combi',
        tiempo: '40 min',
        distancia: '8.7 km',
        frecuencia: 'Cada 10 min',
        tarifa: 'S/ 1.20',
        horarios: {
            semana: '05:00 - 23:00',
            sabados: '05:30 - 22:30',
            domingos: '06:00 - 21:00'
        },
        paradas: [
            { nombre: 'Sachaca', tipo: 'inicio', descripcion: 'Punto de inicio' },
            { nombre: 'Tingo', tipo: 'intermedia', descripcion: 'Parada intermedia' },
            { nombre: 'Alto Selva Alegre', tipo: 'intermedia', descripcion: 'Parada intermedia' },
            { nombre: 'Cerro Colorado', tipo: 'final', descripcion: 'Punto final' }
        ],
        servicios: [
            'Servicio express',
            'Asientos cómodos',
            'Frecuencia en horas pico: 6 min'
        ]
    },
    'T-12': {
        numero: 'T-12',
        titulo: 'Alto Selva Alegre - Hunter',
        tipo: 'Colectivo',
        tiempo: '35 min',
        distancia: '7.1 km',
        frecuencia: 'Cada 8 min',
        tarifa: 'S/ 1.80',
        horarios: {
            semana: '04:30 - 23:30',
            sabados: '05:00 - 23:00',
            domingos: '05:30 - 22:00'
        },
        paradas: [
            { nombre: 'Alto Selva Alegre', tipo: 'inicio', descripcion: 'Punto de inicio' },
            { nombre: 'Mariano Melgar', tipo: 'intermedia', descripcion: 'Parada intermedia' },
            { nombre: 'Jacobo Hunter', tipo: 'final', descripcion: 'Punto final' }
        ],
        servicios: [
            'Ruta directa',
            'Servicio 24/7',
            'Atención personalizada'
        ]
    }
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    cargarDetalleRuta();
    configurarEventosRuta();
    configurarSesion();
});

// Función para cargar el detalle de la ruta
function cargarDetalleRuta() {
    const urlParams = new URLSearchParams(window.location.search);
    const rutaId = urlParams.get('ruta') || 'A-1';
    
    const ruta = rutasDetalle[rutaId];
    
    if (!ruta) {
        mostrarError('Ruta no encontrada');
        return;
    }
    
    // Actualizar información básica
    document.getElementById('routeNumber').textContent = ruta.numero;
    document.getElementById('routeTitle').textContent = ruta.titulo;
    document.getElementById('routeType').textContent = ruta.tipo;
    document.getElementById('routeTime').textContent = ruta.tiempo;
    document.getElementById('routeDistance').textContent = ruta.distancia;
    document.getElementById('routeFrequency').textContent = ruta.frecuencia;
    document.getElementById('routeFare').textContent = ruta.tarifa;
    document.getElementById('currentRoute').textContent = `Ruta ${ruta.numero}`;
    
    // Actualizar título de la página
    document.title = `Ruta ${ruta.numero} - ${ruta.titulo} | Transporte AQP`;
    
    // Cargar paradas
    cargarParadas(ruta.paradas);
    
    // Configurar botones de acción
    configurarBotonesRuta(ruta);
}

// Función para cargar las paradas en la línea de tiempo
function cargarParadas(paradas) {
    const stopsTimeline = document.querySelector('.stops-timeline');
    
    if (!stopsTimeline) return;
    
    stopsTimeline.innerHTML = '';
    
    paradas.forEach(parada => {
        const stopItem = document.createElement('div');
        stopItem.className = 'stop-item';
        
        let markerClass = 'stop-marker';
        if (parada.tipo === 'inicio') markerClass += ' start';
        if (parada.tipo === 'final') markerClass += ' end';
        
        stopItem.innerHTML = `
            <div class="${markerClass}"></div>
            <div class="stop-info">
                <h4>${parada.nombre}</h4>
                <p>${parada.descripcion}</p>
            </div>
        `;
        
        stopsTimeline.appendChild(stopItem);
    });
}

// Función para configurar los botones de la ruta
function configurarBotonesRuta(ruta) {
    const favoriteBtn = document.getElementById('favoriteBtn');
    const shareBtn = document.getElementById('shareBtn');
}