import { Product } from '@webapp/sdk/types/products-types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ProductData = {
  product: Product;
  setProduct: (product: Product) => void;
  resetProduct: () => void;
};

const initialState: ProductData = {
  product: {
    actual_stock: 0,
    cost_price: 0,
    description: '',
    featured: '',
    fraction: '',
    minimum_stock: 0,
    price_currency: '',
    product_category: '',
    main_product_category: '',
    product_code: '',
    id: '',
    product_image: '',
    product_name: '',
    promo_price: '',
    sale_price: '',
    show_in_catalog: '',
    stock_control: '',
    currency_type: '',
    product_id: '',
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
