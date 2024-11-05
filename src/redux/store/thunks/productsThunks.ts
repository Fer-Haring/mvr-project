/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsList } from '@webapp/services/actions/products/get-products-list';
import { ProductsListResponse } from '@webapp/services/types/products-types';

// Thunk para obtener la lista de productos
export const getProductsListThunk = createAsyncThunk<
  ProductsListResponse,
  { page: number; limit: number },
  { rejectValue: string }
>('products/getProductsList', async ({ page, limit }, { rejectWithValue }) => {
  try {
    const response = await getProductsList(page, limit);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
