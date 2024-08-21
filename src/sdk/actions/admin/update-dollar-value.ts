import { refreshToken } from '@webapp/sdk/actions/auth/user-refresh-token';
import { DollarValueResponse } from '@webapp/sdk/types/dollar-value-types';

export async function updateDollarValue(dollarValue: number): Promise<DollarValueResponse> {
  const URL =
    window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;
  const accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ dollarValue }),
  };

  let response = await fetch(`${URL}/dollar_value`, options);

  if (response.status === 401) {
    const newAccessToken = await refreshToken();
    options.headers['Authorization'] = `Bearer ${newAccessToken}`;
    response = await fetch(`${URL}/dollar_value`, options);
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail);
  }

  const updatedDollarValue = await response.json();
  return updatedDollarValue;
}
