import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SelectedProductFilterState = {
  selectedProductFilter: string;
  setSelectedProductFilter: (category: string) => void;
};

export const useSelectedProductFilterStore = create(
  persist<SelectedProductFilterState>(
    (set) => ({
      selectedProductFilter: '',
      setSelectedProductFilter: (category) => set({ selectedProductFilter: category }),
    }),
    {
      name: 'SelectedProductFilter',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
