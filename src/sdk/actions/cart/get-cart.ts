

export async function getUserCart (token: string) {
  const URL = "http://127.0.0.1:8000/cart";

  const response = await fetch(`${URL}/get_cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get cart');
  }

  return response.json();
}