import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, CheckCircle } from 'lucide-react';

interface Habit {
  id: number;
  nombre: string;
  descripcion: string;
  categoria_nombre: string;
}

interface Category {
  id: number;
  nombre: string;
}

const Dashboard: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newHabit, setNewHabit] = useState({ nombre: '', descripcion: '', categoria_id: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchHabits();
    fetchCategories();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/habits', {
        headers: {
          'x-auth-token': localStorage.getItem('token') || '',
        },
      });
      if (!response.ok) throw new Error('Error al obtener hábitos');
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories', {
        headers: {
          'x-auth-token': localStorage.getItem('token') || '',
        },
      });
      if (!response.ok) throw new Error('Error al obtener categorías');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify(newHabit),
      });
      if (!response.ok) throw new Error('Error al añadir hábito');
      const data = await response.json();
      setHabits([...habits, data]);
      setNewHabit({ nombre: '', descripcion: '', categoria_id: '' });
      setIsAdding(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteHabit = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/habits/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': localStorage.getItem('token') || '',
        },
      });
      if (!response.ok) throw new Error('Error al eliminar hábito');
      setHabits(habits.filter(habit => habit.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tu Panel de Hábitos</h1>
      <div className="mb-8">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
          >
            <PlusCircle className="mr-2" size={20} />
            Añadir nuevo hábito
          </button>
        ) : (
          <form onSubmit={handleAddHabit} className="bg-white p-6 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Nombre del hábito"
              value={newHabit.nombre}
              onChange={(e) => setNewHabit({ ...newHabit, nombre: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Descripción"
              value={newHabit.descripcion}
              onChange={(e) => setNewHabit({ ...newHabit, descripcion: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <select
              value={newHabit.categoria_id}
              onChange={(e) => setNewHabit({ ...newHabit, categoria_id: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.nombre}</option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <div key={habit.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{habit.nombre}</h3>
            <p className="text-gray-600 mb-4">{habit.descripcion}</p>
            <p className="text-blue-600 font-bold mb-4">Categoría: {habit.categoria_nombre}</p>
            <div className="flex justify-between">
              <button className="text-yellow-600 hover:text-yellow-800">
                <Edit size={20} />
              </button>
              <button className="text-green-600 hover:text-green-800">
                <CheckCircle size={20} />
              </button>
              <button
                onClick={() => handleDeleteHabit(habit.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;