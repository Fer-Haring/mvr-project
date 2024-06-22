import { refreshToken } from "../auth/user-refresh-token";

export async function getProductById(productId: string) {
  const URL = "https://mvr-prod.onrender.com";
  const accessToken = localStorage.getItem('access_token');
  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
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