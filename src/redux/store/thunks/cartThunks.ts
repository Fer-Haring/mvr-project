/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart } from '@webapp/services/actions/cart/add-to-cart';
import { clearCartApi } from '@webapp/services/actions/cart/delete-cart';
import { getUserCart } from '@webapp/services/actions/cart/get-cart';
import { CartItem, CartResponse } from '@webapp/services/types/cart-types';


export const getUserCartThunk = createAsyncThunk<CartResponse[]>('cart/getUserCart', async (_, { rejectWithValue }) => {
  try {
    const cart = await getUserCart();
    return cart;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addToCartThunk = createAsyncThunk<CartResponse, CartItem>(
  'cart/addToCart',
  async (cartItem, { rejectWithValue }) => {
    try {
      return await addToCart(cartItem);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add item to cart');
    }
  }
);

export const clearCartThunk = createAsyncThunk<void>('cart/clearCart', async (_, { rejectWithValue }) => {
  try {
    await clearCartApi();
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to clear the cart');
  }
});