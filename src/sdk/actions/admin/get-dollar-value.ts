import { DollarValueResponse } from "@webapp/sdk/types/dollar-value-types";
import { refreshToken } from "../auth/user-refresh-token";

export async function getDollarValue(): Promise<DollarValueResponse> {
  const URL = "https://mvr-prod.onrender.com";
  const accessToken = localStorage.getItem('access_token');
  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
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

  const dollarValue = await response.json();
  return dollarValue;
}