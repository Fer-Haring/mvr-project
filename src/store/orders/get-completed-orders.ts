import { OrderResponse } from '@webapp/sdk/types/orders-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


interface CompletedOrdersData {
  orders: OrderResponse[];
  setOrders: (orders: OrderResponse[]) => void;
  resetStore: () => void;
}

export const useCompletedOrdersStore = create(
  persist<CompletedOrdersData>(
    (set) => ({
      orders: [],
      setOrders: (orders: OrderResponse[]) => set({ orders }),
      resetStore: () => set({ orders: [] }),
    }),
    {
      name: 'completedOrdersData',
      storage: createJSONStorage(() => localStorage),
    }
  )
);