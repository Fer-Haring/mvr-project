export async function removeItemFromCart(productId: string) {
  const token = localStorage.getItem('access_token');
  const URL =
    window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  const response = await fetch(`${URL}/cart/remove_item/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to remove item from cart');
  }

  return response.json();
}