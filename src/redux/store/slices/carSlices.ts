import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartResponse } from '@webapp/services/types/cart-types';

import { getUserCartThunk } from '../thunks/cartThunks';

// Estado inicial para el carrito
export interface CartState {
  cartItems: CartResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCartThunk.fulfilled, (state, action: PayloadAction<CartResponse[]>) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getUserCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cart';
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
