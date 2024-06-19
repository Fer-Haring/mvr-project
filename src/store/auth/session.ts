import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  isLoggedIn: boolean;
  userInfo: { userId: string; name: string } | null;
  token: string | null;
  logIn: (userId: string, name: string, token: string) => void;
  logOut: () => void;
}

export const useUserStore = create(
  persist<UserState>(
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
      name: 'userLoggedIn',
      getStorage: () => localStorage,
    }
  )
);
