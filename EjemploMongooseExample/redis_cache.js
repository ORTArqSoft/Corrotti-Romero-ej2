const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
require('dotenv').config();
const Redis = require('redis');

// Configuración del puerto
const PORT = process.env.PORT_CACHE || 3000;

// Configuración de Redis
const redisClient = Redis.createClient({ url: process.env.REDIS_URL });
redisClient.on('connect', () => console.log('Redis client connected'));
redisClient.on('error', (err) => console.log('Redis client error:', err));

// Conexión a Redis
(async () => {
  await redisClient.connect();
})();

// Configuración de MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Endpoint para obtener un match
app.get('/api/matches/:codigoUnicoDeMatch', async (req, res) => {
  const { codigoUnicoDeMatch } = req.params;
  const cacheKey = `match:${codigoUnicoDeMatch}`;

  try {
    // Intentar obtener el dato del caché
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.json({ status: 'obtenido del caché', data: JSON.parse(cachedData) });
    }

    // Si no está en caché, buscar en MySQL
    const [rows] = await db.execute('SELECT * FROM matches WHERE codigo = ?', [codigoUnicoDeMatch]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'dato no encontrado' });
    }

    const match = rows[0];

    // Guardar en caché
    await redisClient.set(cacheKey, JSON.stringify(match));

    res.json({ status: 'obtenido de base de datos', data: match });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});