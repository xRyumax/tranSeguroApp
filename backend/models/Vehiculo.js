const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
  placa: { type: String, required: true, unique: true },
  tipo: { type: String, enum: ['BUS', 'MINIBUS', 'TAXI'], required: true },
  ultimaPosicion: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  }
});

vehiculoSchema.index({ ultimaPosicion: '2dsphere' });

module.exports = mongoose.model('Vehiculo', vehiculoSchema);