import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartResponse } from '@webapp/services/types/cart-types';

import { addToCartThunk, clearCartThunk, getUserCartThunk } from '../thunks/cartThunks';

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
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.product_id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Get User Cart
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

    // Add to Cart
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartThunk.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.loading = false;
        state.cartItems.push(action.payload); // Agregar el nuevo item al array
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add item to cart';
      });

    // Clear Cart
    builder
      .addCase(clearCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = []; // Limpiar el carrito
      })
      .addCase(clearCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to clear the cart';
      });
  },
});

export const { clearCart, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
