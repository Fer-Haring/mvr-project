import { CompletedOrder } from '@webapp/sdk/types/user-types';


export async function createOrder(order: CompletedOrder) {
  const token = localStorage.getItem('access_token');
  const URL = 'https://mvr-prod.onrender.com/orders';
  // const URL = 'http://127.0.0.1:8000/cart';

  const response = await fetch(`${URL}/create_order`, {
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