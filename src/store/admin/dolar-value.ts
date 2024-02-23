import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DollarValueData {
  value: number;
}


type DollarValue = {
  dollarValue: DollarValueData;
  setDollarValue: (dollarValue: number) => void;
};

export const useDollarValue = create(
  persist<DollarValue>(
    (set) => ({
      dollarValue: { value: 0 },
      setDollarValue: (dollarValue) => set({ dollarValue: { value: dollarValue } }),
    }),
    {
      name: 'dollarValue',
      getStorage: () => localStorage,
    }
  )
);


