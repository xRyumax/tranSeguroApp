// Importación de módulos necesarios
const express = require('express');         // Framework para crear servidor y manejar rutas
const mongoose = require('mongoose');       // ORM para conectarse y trabajar con MongoDB
const bodyParser = require('body-parser');  // Middleware para leer JSON en las peticiones
const authRoutes = require('./routes/auth'); // Rutas de autenticación (login, registro, etc.)
const path = require('path');               // Módulo para manejar rutas de archivos
const cors = require('cors');               // Middleware para permitir peticiones desde otros dominios

const app = express();

// Middlewares
// Permite recibir y procesar JSON en las peticiones HTTP
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/inmobiliaria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error en MongoDB:', err));

// Rutas API
app.use('/api', authRoutes);

// Rutas estáticas (HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`esta okey en http://localhost:${PORT} o http://<tu-ip-local>:${PORT}`);
});

