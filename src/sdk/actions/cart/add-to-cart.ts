import { CartItem } from "@webapp/sdk/types/user-types";

export async function addToCart(cartItem: CartItem) {
  const token = localStorage.getItem('access_token');
  // const URL = "https://mvr-prod.onrender.com/cart";
  const URL = "http://127.0.0.1:8000/cart";


  const response = await fetch(`${URL}/add_item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(cartItem),
  });

  if (!response.ok) {
    throw new Error('Failed to add item to cart');
  }

  return response.json();
}