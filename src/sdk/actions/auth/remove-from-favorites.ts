import { User } from '@webapp/sdk/types/user-types';

const BASE_URL = `https://mvr-prod.onrender.com/identity`;

export async function removeFavorite(userId: string, productId: string): Promise<User> {
  const accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch(`${BASE_URL}/remove-favorite/${userId}?product_id=${productId}`, options);

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || 'Failed to remove favorite');
  }

  const updatedUser = await response.json();
  return updatedUser;
}
