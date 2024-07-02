import { refreshToken } from '@webapp/sdk/actions/auth/user-refresh-token';
import { OrderResponse } from '@webapp/sdk/types/orders-types';


export async function updateOrderStatus(id: number | string, status: string): Promise<OrderResponse> {
  const URL = 'https://mvr-prod.onrender.com';
  const accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({status}),
  };

  let response = await fetch(`${URL}/orders/update_order_status/${id}`, options);

  if (response.status === 401) {
    const newAccessToken = await refreshToken();
    options.headers['Authorization'] = `Bearer ${newAccessToken}`;
    response = await fetch(`${URL}/orders/update_order_status/${id}`, options);
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail);
  }

  const OrderUpdated = await response.json();
  return OrderUpdated;
}