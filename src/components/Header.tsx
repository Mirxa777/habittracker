import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <Activity size={24} />
          <span>HabitTrack</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <li><Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link></li>
                <li>
                  <button onClick={handleLogout} className="flex items-center hover:text-blue-200">
                    <LogOut size={20} className="mr-1" />
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-blue-200">Iniciar sesión</Link></li>
                <li><Link to="/register" className="hover:text-blue-200">Registrarse</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;