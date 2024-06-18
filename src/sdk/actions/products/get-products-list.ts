import { ProductsListResponse } from "@webapp/sdk/mutations/products/types";


export async function getProductsList(page: number, limit: number): Promise<ProductsListResponse> {
  const URL = "https://mvr-backend.onrender.com";  // Change to http

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,  // Include the authorization header if needed
    },
  };

  const queryParams = new URLSearchParams({ page: String(page), limit: String(limit) });
  console.log(queryParams.toString())
  return fetch(`${URL}/products?${queryParams.toString()}`, options)
    .then(async (response) => {
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail);
      }
      const products = await response.json();
      return products;
    })
    .catch((error) => {
      console.log('error', error);
      throw error;
    });
}