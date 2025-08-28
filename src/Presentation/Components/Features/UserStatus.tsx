import React from 'react';
import { useUserAuthStore } from '../../../Infrastructure/Store/userAuthStore';

export const UserStatus: React.FC = () => {
  const { user, isAuthenticated, clearUser } = useUserAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 m-4">
        <p className="text-gray-600">❌ Usuario no autenticado</p>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 m-4">
      <h3 className="text-green-800 font-semibold mb-2">✅ Usuario Autenticado</h3>
      <div className="text-sm text-green-700">
        <p><strong>Nombre:</strong> {user.username}</p>
        <p><strong>Rol:</strong> {user.rol}</p>
        <p><strong>Token:</strong> {user.token.substring(0, 20)}...</p>
      </div>
      <button
        onClick={clearUser}
        className="mt-3 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};
