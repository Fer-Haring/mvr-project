import { Product } from '@webapp/service/types/products-types';
import { create } from 'zustand';

// import { Products } from '@webapp/service/types/user-types';

type ProductListData = {
  productList: Product[];
  setProductList: (productList: Product[]) => void;
};

export const useProductsListData = create<ProductListData>((set) => ({
  productList: [],
  setProductList: (productList) => set({ productList }),
}));
