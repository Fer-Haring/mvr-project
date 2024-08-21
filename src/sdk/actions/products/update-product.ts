import { Product } from '@webapp/sdk/types/products-types';

import { refreshToken } from '../auth/user-refresh-token';

export async function updateProduct(productId: string, productData: Product, file?: File | null) {
  const URL =
    window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  let accessToken = localStorage.getItem('access_token');

  const formData = new FormData();
  formData.append('product', JSON.stringify(productData)); // Añade el producto como JSON string
  if (file) {
    formData.append('file', file); // Añade el archivo si existe
  }

  // Log the FormData content
  formData.forEach((value, key) => {
    if (value instanceof File) {
      console.log(`FormData: ${key} = File(${value.name}, ${value.size} bytes)`);
    } else {
      console.log(`FormData: ${key} = ${value}`);
    }
  });

  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  };

  let response;
  try {
    console.log('Sending request to update product...');
    response = await fetch(`${URL}/products/${productId}`, options);
    console.log('Response received:', response);
  } catch (networkError) {
    if (networkError instanceof Error) {
      console.error('Network error:', networkError.message);
      throw new Error('Network error: ' + networkError.message);
    } else {
      console.error('Unknown network error:', networkError);
      throw new Error('An unknown network error occurred');
    }
  }

  if (response.status === 401) {
    // Si el token ha expirado, intenta refrescarlo
    try {
      console.log('Token expired, refreshing token...');
      accessToken = await refreshToken();
      localStorage.setItem('access_token', accessToken);
      options.headers['Authorization'] = `Bearer ${accessToken}`;
      response = await fetch(`${URL}/products/${productId}`, options);
      console.log('Response after refreshing token:', response);
    } catch (refreshError) {
      if (refreshError instanceof Error) {
        console.error('Failed to refresh token:', refreshError.message);
        throw new Error('Failed to refresh token: ' + refreshError.message);
      } else {
        console.error('Unknown error refreshing token:', refreshError);
        throw new Error('Unknown error refreshing token');
      }
    }
  }

  if (!response.ok) {
    let errDetail;
    try {
      errDetail = await response.json();
    } catch (jsonError) {
      if (jsonError instanceof Error) {
        console.error('Failed to parse error response:', jsonError.message);
        throw new Error('Failed to parse error response: ' + jsonError.message);
      } else {
        console.error('Unknown error parsing error response:', jsonError);
        throw new Error('Failed to parse error response');
      }
    }
    console.error('Error response from server:', errDetail);
    throw new Error(errDetail.detail || 'Unknown error occurred');
  }

  const product = await response.json();
  console.log('Product updated successfully:', product);
  return product;
}
