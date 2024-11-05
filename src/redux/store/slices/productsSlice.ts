// src/redux/slices/productsSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductsListResponse } from '@webapp/services/types/products-types';

import { getProductsListThunk } from '../thunks/productsThunks';

export interface ProductsState {
  products: ProductsListResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductsState: (state) => {
      state.products = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsListThunk.fulfilled, (state, action: PayloadAction<ProductsListResponse>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProductsListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

export const { clearProductsState } = productsSlice.actions;
export default productsSlice.reducer;
