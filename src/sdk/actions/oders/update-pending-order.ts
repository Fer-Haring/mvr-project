import { refreshToken } from '@webapp/sdk/actions/auth/user-refresh-token';
import { OrderRequest, OrderResponse } from '@webapp/sdk/types/orders-types';


export async function updatePendingOrder(id: number | string, order: OrderRequest): Promise<OrderResponse> {
    const URL =
      window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  const accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(order),
  };

  let response = await fetch(`${URL}/orders/update_order/${id}`, options);

  if (response.status === 401) {
    const newAccessToken = await refreshToken();
    options.headers['Authorization'] = `Bearer ${newAccessToken}`;
    response = await fetch(`${URL}/orders/update_order/${id}`, options);
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail);
  }

  const OrderUpdated = await response.json();
  return OrderUpdated;
}