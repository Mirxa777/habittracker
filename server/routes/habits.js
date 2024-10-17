import express from 'express';
import { sql } from '../config/db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Obtener todos los hábitos del usuario
router.get('/', auth, async (req, res) => {
  try {
    const result = await sql.query`
      SELECT h.*, c.nombre as categoria_nombre
      FROM Habitos h
      LEFT JOIN Categorias c ON h.categoria_id = c.id
      WHERE h.usuario_id = ${req.user.userId}
    `;
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Crear un nuevo hábito
router.post('/', auth, async (req, res) => {
  try {
    const { nombre, descripcion, categoria_id } = req.body;
    const result = await sql.query`
      INSERT INTO Habitos (usuario_id, categoria_id, nombre, descripcion)
      OUTPUT INSERTED.*
      VALUES (${req.user.userId}, ${categoria_id}, ${nombre}, ${descripcion})
    `;
    res.status(201).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Actualizar un hábito
router.put('/:id', auth, async (req, res) => {
  try {
    const { nombre, descripcion, categoria_id } = req.body;
    const result = await sql.query`
      UPDATE Habitos
      SET nombre = ${nombre}, descripcion = ${descripcion}, categoria_id = ${categoria_id}
      OUTPUT INSERTED.*
      WHERE id = ${req.params.id} AND usuario_id = ${req.user.userId}
    `;
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Hábito no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// Eliminar un hábito
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await sql.query`
      DELETE FROM Habitos
      WHERE id = ${req.params.id} AND usuario_id = ${req.user.userId}
    `;
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Hábito no encontrado' });
    }
    res.json({ message: 'Hábito eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

export default router;