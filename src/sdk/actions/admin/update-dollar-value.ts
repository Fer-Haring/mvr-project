import { DollarValueResponse } from "@webapp/sdk/types/dollar-value-types";
import { refreshToken } from "@webapp/sdk/actions/auth/user-refresh-token";

export async function updateDollarValue(dollarValue: number): Promise<DollarValueResponse> {
  const URL = "https://mvr-prod.onrender.com";
  const accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
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