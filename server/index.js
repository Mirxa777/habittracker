import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import habitRoutes from './routes/habits.js';
import categoryRoutes from './routes/categories.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});