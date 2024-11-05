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
  products: ProductsListResponse | null;
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: null,
  product: null,
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
    },
    clearProductState: (state) => {
      state.product = null;
      state.loading = false;
      state.error = null;
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
        state.products = action.payload;
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

export const { clearProductsState, clearProductState } = productsSlice.actions;
export default productsSlice.reducer;
