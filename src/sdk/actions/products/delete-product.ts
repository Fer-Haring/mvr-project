import { refreshToken } from '../auth/user-refresh-token';

export async function deleteProduct(productId: string) {
  const URL =
    window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;
  const accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
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
    throw new Error(err.detail || 'Failed to delete the product');
  }

  return true;
}
