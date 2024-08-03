import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SelectedMainCategoryState = {
  selectedMainCategory: string;
  setSelectedMainCategory: (category: string) => void;
};

export const useSelectedMainCategoryStore = create(
  persist<SelectedMainCategoryState>(
    (set) => ({
      selectedMainCategory: '',
      setSelectedMainCategory: (category) => set({ selectedMainCategory: category }),
    }),
    {
      name: 'SelectedMainCategory',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
