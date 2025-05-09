import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


interface AgGridFilterState {
  filters: Record<string, any>;
  setFilter: (columnId: string, filterValue: any) => void;
  clearFilters: () => void;
}

export const useAgGridFilterStore = create(
  persist<AgGridFilterState>(
    (set) => ({
      filters: {},
      setFilter: (columnId, filterValue) =>
        set((state) => ({
          filters: { ...state.filters, [columnId]: filterValue },
        })),
      clearFilters: () => set({ filters: {} }),
    }),
    {
      name: 'ag-grid-filters',
      storage: createJSONStorage(() => localStorage),
    }
  )
);