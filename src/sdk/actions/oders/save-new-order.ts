import { OrderRequest } from '@webapp/sdk/types/orders-types';

export async function createOrder(order: OrderRequest) {
  const token = localStorage.getItem('access_token');
  const URL =
    window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  const response = await fetch(`${URL}/orders/create_order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error('Failed to create order');
  }

  return response.json();
}
