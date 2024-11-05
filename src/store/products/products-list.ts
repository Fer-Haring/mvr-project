import { Product } from '@webapp/services/types/products-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// import { Products } from '@webapp/services/types/user-types';

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
      storage: createJSONStorage(() => localStorage),
    }
  )
);
