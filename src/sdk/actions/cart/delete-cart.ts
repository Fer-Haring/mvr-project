export async function clearCart() {
  const token = localStorage.getItem('access_token');
  const URL = 'https://mvr-prod.onrender.com/cart';

  const response = await fetch(`${URL}/clear_cart`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to clear the cart');
  }

  return response.json();
}
