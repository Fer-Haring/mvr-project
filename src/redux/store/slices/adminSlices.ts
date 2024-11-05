// src/redux/slices/productsSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ValorDollarAPI } from '@webapp/services/types/dollar-value-types';

import { getDollarValueThunk } from '../thunks/adminThunks';

export interface AdminState {
  dollarValue: ValorDollarAPI | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  dollarValue: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminState: (state) => {
      state.dollarValue = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDollarValueThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDollarValueThunk.fulfilled, (state, action: PayloadAction<ValorDollarAPI>) => {
        state.loading = false;
        state.dollarValue = action.payload;
        state.error = null;
      })
      .addCase(getDollarValueThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

export const { clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;
