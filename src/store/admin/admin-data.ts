import { Product } from '@webapp/sdk/types/products-types';
import { CompletedOrder, User } from '@webapp/sdk/types/user-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminData {
  users: User[];
  products: Product[];
  orders: CompletedOrder[];
  setUsers: (users: User[]) => void;
  setProducts: (products: Product[]) => void;
  setOrders: (orders: CompletedOrder[]) => void;
  resetStore: () => void;
}


export const useAdminDataStore = create(
  persist<AdminData>(
    (set) => ({
      users: [],
      products: [],
      orders: [],
      setUsers: (users: User[]) => set({ users }),
      setProducts: (products: Product[]) => set({ products }),
      setOrders: (orders: CompletedOrder[]) => set({ orders }),
      resetStore: () => set({ users: [], products: [], orders: [] }),
    }),
    {
      name: 'adminData',
      getStorage: () => localStorage,
    }
  )
);
