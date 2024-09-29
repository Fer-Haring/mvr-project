import { Product } from '@webapp/sdk/types/products-types';
import { User } from '@webapp/sdk/types/user-types';

const URL =
  window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

export async function addFavorite(userId: string, product: Product): Promise<User> {
  const accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(product),
  };

  const response = await fetch(`${URL}/identity/add-favorite/${userId}`, options);

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || 'Failed to add favorite');
  }

  const updatedUser = await response.json();
  return updatedUser;
}
