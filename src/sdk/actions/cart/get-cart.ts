// Ajusta esto según tus tipos reales
import { refreshToken } from '@webapp/sdk/actions/auth/user-refresh-token';
import { CartResponse } from '@webapp/sdk/types/cart-types';

export async function getUserCart(): Promise<CartResponse[]> {
  const URL = 'https://mvr-prod.onrender.com/cart';
  const accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  let response = await fetch(`${URL}/get_cart`, options);

  // Si la respuesta es 401 (no autorizado), intenta refrescar el token y vuelve a hacer la solicitud
  if (response.status === 401) {
    const newAccessToken = await refreshToken();
    localStorage.setItem('access_token', newAccessToken); // Guarda el nuevo token en localStorage
    options.headers['Authorization'] = `Bearer ${newAccessToken}`;
    response = await fetch(`${URL}/get_cart`, options);
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || 'Failed to get cart');
  }

  const cart = await response.json();
  return cart;
}
