const mongoose = require('mongoose');

const alertaSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['RETRASO', 'ACCIDENTE', 'AVERIA', 'DESVIO'], required: true },
  descripcion: { type: String, required: true },
  ubicacion: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number] }
  },
  timestamp: { type: Date, default: Date.now }
});

alertaSchema.index({ ubicacion: '2dsphere' });

module.exports = mongoose.model('Alerta', alertaSchema)