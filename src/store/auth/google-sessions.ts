import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserGoogleState {
  isLoggedIn: boolean;
  userInfo: { userId: string; name: string } | null;
  token: string | null;
  logIn: (userId: string, name: string, token: string) => void;
  logOut: () => void;
}

export const useUserGoogleStore = create(
  persist<UserGoogleState>(
    (set) => ({
      isLoggedIn: false,
      userInfo: null,
      token: null,

      logIn: (userId, name, token) =>
        set(() => ({
          isLoggedIn: true,
          userInfo: { userId, name },
          token: token,
        })),

      logOut: () =>
        set(() => ({
          isLoggedIn: false,
          userInfo: null,
          token: null,
        })),
    }),
    {
      name: 'userGoogleLoggedIn',
      storage: createJSONStorage(() => localStorage)
    }
  )
);