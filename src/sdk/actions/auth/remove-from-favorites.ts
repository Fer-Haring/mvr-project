import { User } from '@webapp/sdk/types/user-types';


const URL =
  window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

export async function removeFavorite(userId: string, productId: string): Promise<User> {
  const accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch(`${URL}/identity/remove-favorite/${userId}?product_id=${productId}`, options);

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || 'Failed to remove favorite');
  }

  const updatedUser = await response.json();
  return updatedUser;
}