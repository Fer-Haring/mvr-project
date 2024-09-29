import { OrderResponse } from '@webapp/sdk/types/orders-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


interface EditingOrderStore {
  orders: OrderResponse[];
  setOrders: (orders: OrderResponse[]) => void;
  resetStore: () => void;
}

export const useEditingOrderStore = create(
  persist<EditingOrderStore>(
    (set) => ({
      orders: [],
      setOrders: (orders: OrderResponse[]) => set({ orders }),
      resetStore: () => set({ orders: [] }),
    }),
    {
      name: 'Editing-Order-Store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);