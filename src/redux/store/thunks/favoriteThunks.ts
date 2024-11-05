/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addFavorite } from '@webapp/services/actions/auth/add-to-favorites';
import { removeFavorite } from '@webapp/services/actions/auth/remove-from-favorites';
import { Product } from '@webapp/services/types/products-types';
import { User } from '@webapp/services/types/user-types';

// Thunk for adding a favorite
export const addFavoriteThunk = createAsyncThunk<User, { userId: string; product: Product }>(
  'favorites/addFavorite',
  async ({ userId, product }, { rejectWithValue }) => {
    try {
      return await addFavorite(userId, product);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for removing a favorite
export const removeFavoriteThunk = createAsyncThunk<User, { userId: string; productId: string }>(
  'favorites/removeFavorite',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      return await removeFavorite(userId, productId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
