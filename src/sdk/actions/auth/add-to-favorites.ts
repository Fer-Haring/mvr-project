import { Product } from '@webapp/sdk/types/products-types';
import { User } from '@webapp/sdk/types/user-types';

const BASE_URL = `https://mvr-prod.onrender.com/identity`;

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

  const response = await fetch(`${BASE_URL}/add-favorite/${userId}`, options);

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || 'Failed to add favorite');
  }

  const updatedUser = await response.json();
  return updatedUser;
}
