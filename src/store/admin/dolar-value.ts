import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


export interface DollarValueData {
  value: string;
}


type DollarValue = {
  dollarValue: DollarValueData;
  setDollarValue: (dollarValue: string) => void;
};

export const useDollarValue = create(
  persist<DollarValue>(
    (set) => ({
      dollarValue: { value: '' },
      setDollarValue: (dollarValue) => set({ dollarValue: { value: dollarValue } }),
    }),
    {
      name: 'dollarValue',
      storage: createJSONStorage(() => localStorage)
    }
  )
);