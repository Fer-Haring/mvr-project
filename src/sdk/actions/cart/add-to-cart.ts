import { CartItem } from '@webapp/sdk/types/cart-types';


export async function addToCart(cartItem: CartItem) {
  const token = localStorage.getItem('access_token');
    const URL =
      window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  const response = await fetch(`${URL}/cart/add_item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cartItem),
  });

  if (!response.ok) {
    throw new Error('Failed to add item to cart');
  }

  return response.json();
}