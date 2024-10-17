import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Bienvenido a HabitTrack</h1>
      <p className="text-xl mb-8">Desarrolla hábitos positivos y alcanza tus metas</p>
      <div className="flex justify-center space-x-4 mb-12">
        <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Comenzar
        </Link>
        <Link to="/login" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition duration-300">
          Iniciar sesión
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <FeatureCard
          icon={<CheckCircle className="w-12 h-12 text-blue-600" />}
          title="Seguimiento de hábitos"
          description="Registra y monitorea tus hábitos diarios con facilidad"
        />
        <FeatureCard
          icon={<CheckCircle className="w-12 h-12 text-blue-600" />}
          title="Recordatorios personalizados"
          description="Recibe notificaciones para mantener la constancia"
        />
        <FeatureCard
          icon={<CheckCircle className="w-12 h-12 text-blue-600" />}
          title="Análisis de progreso"
          description="Visualiza tu progreso y mejora continuamente"
        />
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;