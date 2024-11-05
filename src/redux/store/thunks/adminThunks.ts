/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDollarValue } from "@webapp/services/actions/admin/get-dollar-value";
import { ValorDollarAPI } from "@webapp/services/types/dollar-value-types";


export const getDollarValueThunk = createAsyncThunk<ValorDollarAPI, void, { rejectValue: string }>(
  'admin/getDollarValue',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDollarValue();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);