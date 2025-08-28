import React from 'react';
import { useUserAuthStore } from '../../Infrastructure/Store/userAuthStore';


interface DashboardProps {
  onLogout?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {

  const { user } = useUserAuthStore();
  console.log(user);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white font-black rounded-md px-2 py-1 text-sm leading-none shadow">
                OL
              </div>
              <span className="text-gray-700 text-xs">Open&nbsp;Life</span>
            </div>

            {/* Información del Usuario */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.rol}</p>
              </div>
              
              {/* Avatar del usuario */}
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.username.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </span>
              </div>

              {/* Botón de logout */}
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="ml-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Contenido del dashboard aquí */}
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Bienvenido al Dashboard</h2>
              <p className="text-gray-600">
                Hola {user?.username}, tu rol es: <span className="font-medium">{user?.rol}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
