import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserCart } from '@webapp/services/actions/cart/get-cart';
import { CartResponse } from '@webapp/services/types/cart-types';

export const getUserCartThunk = createAsyncThunk<CartResponse[]>('cart/getUserCart', async (_, { rejectWithValue }) => {
  try {
    const cart = await getUserCart();
    return cart;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
