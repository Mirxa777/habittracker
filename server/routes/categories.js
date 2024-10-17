import express from 'express';
import { sql } from '../config/db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Obtener todas las categorías
router.get('/', auth, async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Categorias`;
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Crear una nueva categoría
router.post('/', auth, async (req, res) => {
  try {
    const { nombre } = req.body;
    const result = await sql.query`
      INSERT INTO Categorias (nombre)
      OUTPUT INSERTED.*
      VALUES (${nombre})
    `;
    res.status(201).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

export default router;