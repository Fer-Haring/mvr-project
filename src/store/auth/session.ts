import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define el tipo de la información del usuario y el estado de autenticación
interface UserState {
  isLoggedIn: boolean;
  userInfo: { userId: string; name: string } | null;
  logIn: (userId: string, name: string) => void;
  logOut: () => void;
}

// Crea el store con Zustand
export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      // Estado inicial
      isLoggedIn: false,
      userInfo: null,

      // Acción para iniciar sesión
      logIn: (userId, name) =>
        set(() => ({
          isLoggedIn: true,
          userInfo: { userId, name },
        })),

      // Acción para cerrar sesión
      logOut: () =>
        set(() => ({
          isLoggedIn: false,
          userInfo: null,
        })),
    }),
    {
      // Configuración de persistencia
      name: 'userLoggedIn',
      getStorage: () => localStorage,
    }
  )
);
