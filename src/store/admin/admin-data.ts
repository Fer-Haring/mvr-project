import { CompletedOrder, Products, User } from '@webapp/sdk/users-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminData {
  users: User[];
  products: Products[];
  orders: CompletedOrder[];
  setUsers: (users: User[]) => void;
  setProducts: (products: Products[]) => void;
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
      setProducts: (products: Products[]) => set({ products }),
      setOrders: (orders: CompletedOrder[]) => set({ orders }),
      resetStore: () => set({ users: [], products: [], orders: [] }),
    }),
    {
      name: 'adminData',
      getStorage: () => localStorage,
    }
  )
);
