require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ip = require('ip');

const app = express();

// 1. Variables de estado mejoradas
let dbReady = false;
const startTime = new Date();

// 2. Configuración avanzada de conexión
const mongoOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000,
  maxPoolSize: 10
};

mongoose.connection.on('connected', () => {
  dbReady = true;
  console.log('✅ Conexión a MongoDB completamente establecida');
  printServerStatus(); // Mostrar estado actualizado
});

mongoose.connection.on('disconnected', () => {
  dbReady = false;
  console.log('⚠️  Desconectado de MongoDB');
});

// 3. Función para mostrar estado consistente
function printServerStatus() {
  console.log('\n🟢 Estado actual del servidor:');
  console.log(`➡ Tiempo activo: ${Math.floor((new Date() - startTime) / 1000)} segundos`);
  console.log(`➡ Endpoints disponibles:`);
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/api/vehiculos`);
  console.log(`   - http://localhost:${PORT}/api/alertas`);
  console.log(`➡ Estado DB: ${dbReady ? '🟢 Conectado' : '🔴 Desconectado'}\n`);
}

// 4. Conexión a MongoDB (con reconexión automática)
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TransSeguro', mongoOptions);
  } catch (err) {
    console.error('❌ Error inicial de conexión a MongoDB:', err.message);
    setTimeout(connectDB, 5000); // Reintentar después de 5 segundos
  }
}

// 5. Middlewares
app.use(cors());
app.use(express.json());

// 6. Ruta de estado mejorada
app.get('/', (req, res) => {
  res.json({
    status: 'API TransSeguro',
    uptime: Math.floor((new Date() - startTime) / 1000 + ' segundos'),
    database: dbReady ? 'connected' : 'disconnected',
    endpoints: {
      root: '/',
      vehiculos: '/api/vehiculos',
      alertas: '/api/alertas'
    },
    serverTime: new Date().toISOString()
  });
});

// ... (tus otras rutas)

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`\nServidor Express iniciado en puerto ${PORT}`);
  console.log(`Conectando a MongoDB...`);
  connectDB(); // Iniciar conexión a DB después del servidor
});

// Manejo de cierre elegante
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('\n🔴 Servidor cerrado correctamente');
  process.exit(0);
});