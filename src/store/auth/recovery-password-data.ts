import { create } from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';


interface UserPasswordDataRecovery {
  email: string;
  setEmail: (email: string) => void;
  code: string;
  setCode: (code: string) => void;
}

export const useRecoveryPasswordData = create(
  persist<UserPasswordDataRecovery>(
    (set) => ({
      email: '',
      setEmail: (email) => set({ email }),
      code: '',
      setCode: (code) => set({ code }),
    }),
    {
      name: 'recovery-password-data',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
