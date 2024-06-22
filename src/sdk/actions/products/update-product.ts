import { Product } from "@webapp/sdk/types/products-types";
import { refreshToken } from "../auth/user-refresh-token";

export async function updateProduct(productId: string, productData: Product, file?: File | null) {
  const URL = "https://mvr-prod.onrender.com";
  const accessToken = localStorage.getItem('access_token');

  const formData = new FormData();
  formData.append('product', JSON.stringify(productData)); // Añade el producto como JSON string
  if (file) {
    formData.append('file', file); // Añade el archivo si existe
  }

  const options = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    body: formData,
  };

  let response = await fetch(`${URL}/products/${productId}`, options);

  if (response.status === 401) {
    const newAccessToken = await refreshToken();
    options.headers['Authorization'] = `Bearer ${newAccessToken}`;
    response = await fetch(`${URL}/products/${productId}`, options);
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail);
  }

  const product = await response.json();
  return product;
}
