import { useEffect } from 'react';
import { useUserAuthStore } from '../../Infrastructure/Store/userAuthStore';

export const useAuthInitializer = () => {
  const { initializeFromStorage } = useUserAuthStore();

  useEffect(() => {
    // Inicializar el estado desde localStorage cuando la app carga
    initializeFromStorage();
  }, [initializeFromStorage]);
};
