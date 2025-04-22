const express = require('express');
const router = express.Router();
const Alerta = require('../models/Alerta');

// Obtener todas las alertas
router.get('/', async (req, res) => {
  try {
    const alertas = await Alerta.find();
    res.json(alertas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;