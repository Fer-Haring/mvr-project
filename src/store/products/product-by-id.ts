import { Products } from '@webapp/sdk/users-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ProductData = {
  product: Products;
  setProduct: (product: Products) => void;
  resetProduct: () => void;
};

const initialState: ProductData = {
  product: {
    actualStock: '',
    costPrice: 0,
    description: '',
    destacated: '',
    fraction: 0,
    minimumStock: 0,
    priceCurrency: '',
    productCategory: '',
    mainProductCategory: '',
    productCode: '',
    productId: '',
    productImage: '',
    productName: '',
    promoPrice: 0,
    salePrice: '',
    showInCatalog: '',
    stockControl: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  setProduct: () => {},
  resetProduct: () => {},
};


export const useSingleProduct = create(
  persist<ProductData>(
    (set) => ({
      ...initialState,
      setProduct: (product) => set({ product }),
      resetProduct: () => set({ ...initialState }),
    }),
    {
      name: 'productData',
      getStorage: () => localStorage,
    }
  )
);
