const express = require('express');
const router = express.Router();
const Vehiculo = require('../models/Vehiculo');

// Obtener todos los vehículos
router.get('/', async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.json(vehiculos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;