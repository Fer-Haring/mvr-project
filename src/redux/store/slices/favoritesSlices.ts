import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '@webapp/services/types/user-types';

import { addFavoriteThunk, removeFavoriteThunk } from '../thunks/favoriteThunks';

export interface FavoritesState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  user: null,
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavoritesState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducers for addFavorite
      .addCase(addFavoriteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavoriteThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addFavoriteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add favorite';
      })
      // Reducers for removeFavorite
      .addCase(removeFavoriteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavoriteThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(removeFavoriteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove favorite';
      });
  },
});

export const { clearFavoritesState } = favoritesSlice.actions;
export default favoritesSlice.reducer;
