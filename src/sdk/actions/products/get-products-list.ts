import { ProductsListResponse } from "@webapp/sdk/types/products-types";
import { refreshToken } from "@webapp/sdk/actions/auth/user-refresh-token";

export async function getProductsList(page: number, limit: number): Promise<ProductsListResponse> {
  const URL = "https://mvr-prod.onrender.com";
  const accessToken = localStorage.getItem('access_token');
  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  };

  const queryParams = new URLSearchParams({ page: String(page), limit: String(limit) });

  let response = await fetch(`${URL}/products?${queryParams.toString()}`, options);
  
  if (response.status === 401) {
    const newAccessToken = await refreshToken();
    options.headers['Authorization'] = `Bearer ${newAccessToken}`;
    response = await fetch(`${URL}/products?${queryParams.toString()}`, options);
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail);
  }

  const products = await response.json();
  return products;
}