import { Product } from "@webapp/sdk/types/products-types";
import { refreshToken } from "../auth/user-refresh-token";

export async function addNewProduct(product: Product, file?: File): Promise<Product> {
  const URL = "https://mvr-prod.onrender.com/products";
  // const URL = "http://127.0.0.1:8000/products";
  const accessToken = localStorage.getItem('access_token');

  const formData = new FormData();
  Object.keys(product).forEach(key => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData.append(key, (product as any)[key]);
  });
  if (file) {
    formData.append('file', file);
  }

  const headers: HeadersInit = {
    'Authorization': `Bearer ${accessToken}`,
  };

  const options: RequestInit = {
    method: 'POST',
    headers: headers,
    body: formData,
  };

  let response = await fetch(URL, options);
  
  if (response.status === 401) {
    const newAccessToken = await refreshToken();
    localStorage.setItem('access_token', newAccessToken);
    headers['Authorization'] = `Bearer ${newAccessToken}`;
    options.headers = headers;
    response = await fetch(URL, options);
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail);
  }

  const newProduct: Product = await response.json();
  return newProduct;
}