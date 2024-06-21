import { Product } from '@webapp/sdk/mutations/products/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { Products } from '@webapp/sdk/actions/auth/types';

type ProductListData = {
  productList: Product[]; 
  setProductList: (productList: Product[]) => void;
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