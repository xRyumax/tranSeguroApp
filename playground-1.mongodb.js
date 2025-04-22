// Vehículos tipo BUS con coordenadas cercanas
db.vehiculos.find({
  tipo: "BUS",
  ultimaPosicion: {
    $near: {
      $geometry: { type: "Point", coordinates: [-58.38, -34.60] },
      $maxDistance: 1000
    }
  }
});