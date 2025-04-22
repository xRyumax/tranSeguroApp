const API_URL = 'http://localhost:6000/api';

// Mapa Leaflet
const mapa = L.map('mapa').setView([-34.6037, -58.3816], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa);

// Iconos personalizados
const iconos = {
  BUS: L.icon({ iconUrl: 'bus-icon.png', iconSize: [30, 30] }),
  TAXI: L.icon({ iconUrl: 'taxi-icon.png', iconSize: [25, 25] })
};

// Cargar vehículos
async function cargarVehiculos() {
  try {
    const response = await fetch(`${API_URL}/vehiculos`);
    const vehiculos = await response.json();
    
    // Mostrar en mapa
    vehiculos.forEach(v => {
      if (v.ultimaPosicion) {
        L.marker(
          [v.ultimaPosicion.coordinates[1], v.ultimaPosicion.coordinates[0]], 
          { icon: iconos[v.tipo] || L.Icon.Default }
        )
        .bindPopup(`<b>${v.placa}</b><br>Tipo: ${v.tipo}`)
        .addTo(mapa);
      }
    });
    
    // Mostrar lista
    document.getElementById('vehiculos').innerHTML = vehiculos
      .map(v => `
        <div class="col-md-4 vehiculo-info">
          <h3>${v.placa}</h3>
          <p>Tipo: ${v.tipo}</p>
          <p>Última posición: ${v.ultimaPosicion?.coordinates.join(', ') || 'N/A'}</p>
        </div>
      `)
      .join('');
      
  } catch (error) {
    console.error('Error:', error);
  }
}

// Actualizar cada 10 segundos
setInterval(cargarVehiculos, 10000);
cargarVehiculos();