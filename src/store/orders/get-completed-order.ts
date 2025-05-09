import { OrderResponse } from '@webapp/service/types/orders-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CompletedOrdersData {
  order: OrderResponse;
  setOrder: (order: OrderResponse) => void;
  resetStore: () => void;
}

export const useCompletedOrderStore = create(
  persist<CompletedOrdersData>(
    (set) => ({
      order: {},
      setOrder: (order: OrderResponse) => set({ order }),
      resetStore: () => set({ order: {} }),
    }),
    {
      name: 'completedOrderData',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
