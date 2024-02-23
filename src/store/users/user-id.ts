import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserId = {
  userId: string;
  setUserId: (userId: string) => void;
};

export const useUserId = create(
  persist<UserId>(
    (set) => ({
      userId: '',
      setUserId: (userId) => set({ userId }),
    }),
    {
      name: 'userId',
      getStorage: () => localStorage,
    }
  )
);
