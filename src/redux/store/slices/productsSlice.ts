// src/redux/slices/productsSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product, ProductsListResponse } from '@webapp/services/types/products-types';

import {
  addNewProductThunk,
  deleteProductThunk,
  getProductByIdThunk,
  getProductsListThunk,
  updateProductThunk,
  uploadImagesArrayThunk,
} from '../thunks/productsThunks';

export interface ProductsState {
  productsList: ProductsListResponse | null;
  products: Product[] | null;
  product: Product | null;
  selectedMainCategory: string | null;
  selectedProductFilter: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  productsList: null,
  products: null,
  product: null,
  selectedMainCategory: null,
  selectedProductFilter: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductsState: (state) => {
      state.products = null;
      state.product = null;
      state.loading = false;
      state.error = null;
      state.selectedMainCategory = null;
      state.selectedProductFilter = null;
    },
    clearProductState: (state) => {
      state.product = null;
      state.loading = false;
      state.error = null;
    },
    setSelectedMainCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedMainCategory = action.payload;
    },
    setSelectedProductFilter: (state, action: PayloadAction<string | null>) => {
      state.selectedProductFilter = action.payload;
    },
    setProductsList: (state, action: PayloadAction<ProductsListResponse>) => {
      state.productsList = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[] | null>) => {
      state.products = action.payload;
    },
    setProduct: (state, action: PayloadAction<Product | null>) => {
      state.product = action.payload;
    },
    resetProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    // Get products list
    builder
      .addCase(getProductsListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsListThunk.fulfilled, (state, action: PayloadAction<ProductsListResponse>) => {
        state.loading = false;
        state.productsList  = action.payload;
      })
      .addCase(getProductsListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get product by ID
    builder
      .addCase(getProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update product
    builder
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete product
    builder
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state) => {
        state.loading = false;
        state.product = null;
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Upload images array
    builder
      .addCase(uploadImagesArrayThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImagesArrayThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(uploadImagesArrayThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add new product
    builder
      .addCase(addNewProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewProductThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(addNewProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearProductsState,
  clearProductState,
  setSelectedMainCategory,
  setSelectedProductFilter,
  setProductsList,
  setProducts,
  setProduct,
  resetProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
