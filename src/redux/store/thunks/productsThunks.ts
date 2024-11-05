/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNewProduct } from '@webapp/services/actions/products/add-new-product';
import { deleteProduct } from '@webapp/services/actions/products/delete-product';
import { getProductById } from '@webapp/services/actions/products/get-product-by-id';
import { getProductsList } from '@webapp/services/actions/products/get-products-list';
import { updateProduct } from '@webapp/services/actions/products/update-product';
import { uploadImagesArray } from '@webapp/services/actions/products/upload-images-array';
import { Product, ProductsListResponse } from '@webapp/services/types/products-types';


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

// Get product by ID thunk
export const getProductByIdThunk = createAsyncThunk<Product, string>(
  'products/getProductById',
  async (productId, { rejectWithValue }) => {
    try {
      return await getProductById(productId);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch product');
    }
  }
);

// Update product thunk
export const updateProductThunk = createAsyncThunk<
  Product,
  { productId: string; productData: Product; file?: File | null }
>('products/updateProduct', async ({ productId, productData, file }, { rejectWithValue }) => {
  try {
    return await updateProduct(productId, productData, file);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to update product');
  }
});

// Delete product thunk
export const deleteProductThunk = createAsyncThunk<boolean, string>(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      return await deleteProduct(productId);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete product');
    }
  }
);

export const uploadImagesArrayThunk = createAsyncThunk(
  'products/uploadImagesArray',
  async ({ productId, files }: { productId: string; files: File[] }, { rejectWithValue }) => {
    try {
      return await uploadImagesArray(productId, files);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addNewProductThunk = createAsyncThunk(
  'products/addNewProduct',
  async ({ product, file }: { product: Product; file?: File }, { rejectWithValue }) => {
    try {
      return await addNewProduct(product, file);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);