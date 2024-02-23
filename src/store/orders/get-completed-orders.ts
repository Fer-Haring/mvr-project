import { CompletedOrder } from '@webapp/sdk/users-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompletedOrdersData {
  orders: CompletedOrder[];
  setOrders: (orders: CompletedOrder[]) => void;
  resetStore: () => void;
}

export const useCompletedOrdersStore = create(
  persist<CompletedOrdersData>(
    (set) => ({
      orders: [],
      setOrders: (orders: CompletedOrder[]) => set({ orders }),
			resetStore: () => set({ orders: [] }),
    }),
    {
      name: 'completedOrdersData',
      getStorage: () => localStorage,
    }
  )
);
