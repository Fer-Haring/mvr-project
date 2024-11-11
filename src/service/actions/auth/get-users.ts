import { User } from '../../types/user-types';
import { refreshToken } from './user-refresh-token';

export async function getUsers(): Promise<User[]> {
  const URL =
    window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  const accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  let response = await fetch(`${URL}/identity/get_users`, options);

  if (response.status === 401) {
    const newAccessToken = await refreshToken();
    options.headers['Authorization'] = `Bearer ${newAccessToken}`;
    response = await fetch(`${URL}/identity/get_users`, options);
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail);
  }

  const user = await response.json();
  return user;
}
