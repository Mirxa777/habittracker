import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sql } from '../config/db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql.query`
      INSERT INTO Usuarios (nombre, email, password)
      OUTPUT INSERTED.id, INSERTED.nombre, INSERTED.email
      VALUES (${nombre}, ${email}, ${hashedPassword})
    `;
    
    const user = result.recordset[0];
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await sql.query`SELECT * FROM Usuarios WHERE email = ${email}`;
    const user = result.recordset[0];

    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ user: { id: user.id, nombre: user.nombre, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

export default router;