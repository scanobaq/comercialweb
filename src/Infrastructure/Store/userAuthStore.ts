import { create } from "zustand";

// Define la interfaz ILoginResponse
export interface User {
    token: string;
    username: string;
    rol: string;
}

// Estado global de autenticación de usuario con Zustand
interface UserAuthState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    isAuthenticated: boolean;
    initializeFromStorage: () => void;
}

export const useUserAuthStore = create<UserAuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: true }),
    clearUser: () => set({ user: null, isAuthenticated: false }),
    initializeFromStorage: () => {
        try {
            const savedUser = localStorage.getItem('userProfile');
            if (savedUser) {
                const userData = JSON.parse(savedUser);
                set({ 
                    user: {
                        token: userData.token,
                        username: userData.username,
                        rol: userData.rol
                    }, 
                    isAuthenticated: true 
                });
            }
        } catch (error) {
            console.error('Error loading user from localStorage:', error);
            localStorage.removeItem('userProfile');
        }
    }
}));
