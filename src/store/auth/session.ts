// user-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define el tipo de la información del usuario y el estado de autenticación
interface UserState {
  isLoggedIn: boolean;
  userInfo: { userId: string; name: string } | null;
  token: string | null;
  logIn: (userId: string, name: string, token: string) => void;
  logOut: () => void;
}

// Crea el store con Zustand
export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      // Estado inicial
      isLoggedIn: false,
      userInfo: null,
      token: null,

      // Acción para iniciar sesión
      logIn: (userId, name, token) =>
        set(() => ({
          isLoggedIn: true,
          userInfo: { userId, name },
          token: token,
        })),

      // Acción para cerrar sesión
      logOut: () =>
        set(() => ({
          isLoggedIn: false,
          userInfo: null,
          token: null,
        })),
    }),
    {
      // Configuración de persistencia
      name: 'userLoggedIn',
      getStorage: () => localStorage,
    }
  )
);
