import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Products } from '@webapp/sdk/users-types';

type ProductListData = {
  productList: Products[]; 
  setProductList: (productList: Products[]) => void;
};

export const useProductsListData = create(
  persist<ProductListData>(
    (set) => ({
      productList: [], 
      setProductList: (productList) => set({ productList }),
    }),
    {
      name: 'productListData',
      getStorage: () => localStorage,
    }
  )
);