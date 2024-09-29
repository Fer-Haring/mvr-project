// Ajusta esto según tus tipos reales
import { refreshToken } from '@webapp/sdk/actions/auth/user-refresh-token';
import { OrderResponse } from '@webapp/sdk/types/orders-types';

export async function getAllOrders(): Promise<OrderResponse[]> {
  const URL =
    window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;
  const accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  let response = await fetch(`${URL}/orders/get_all_orders`, options);

  // Si la respuesta es 401 (no autorizado), intenta refrescar el token y vuelve a hacer la solicitud
  if (response.status === 401) {
    const newAccessToken = await refreshToken();
    localStorage.setItem('access_token', newAccessToken); // Guarda el nuevo token en localStorage
    options.headers['Authorization'] = `Bearer ${newAccessToken}`;
    response = await fetch(`${URL}/get_all_orders`, options);
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || 'Failed to obtain Orders.');
  }

  const orders = await response.json();
  return orders;
}
