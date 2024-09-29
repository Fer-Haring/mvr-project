import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


interface AgGridColumnSortingState {
  columnOrder: string[] | undefined;
  setColumnOrder: (order: string[]) => void;
}

export const useAgGridColumnSortingStore = create(
  persist<AgGridColumnSortingState>(
    (set) => ({
      columnOrder: [],
      setColumnOrder: (order) => set({ columnOrder: order }),
    }),
    {
      name: 'ag-grid-column-sorting',
      storage: createJSONStorage(() => localStorage),
    }
  )
);