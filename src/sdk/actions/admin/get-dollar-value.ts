import { ValorDollarAPI } from '@webapp/sdk/types/dollar-value-types';

// import { refreshToken } from "../auth/user-refresh-token";

export async function getDollarValue(): Promise<ValorDollarAPI> {
  const URL = 'https://dolarapi.com/v1/dolares/blue';
  // const URL = "https://mvr-prod.onrender.com";
  // const accessToken = localStorage.getItem('access_token');

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`,
  //   },
  // };

  const response = await fetch(`${URL}`);

  // if (response.status === 401) {
  //   const newAccessToken = await refreshToken();
  //   options.headers['Authorization'] = `Bearer ${newAccessToken}`;
  //   response = await fetch(`${URL}/dollar_value`, options);
  // }

  // if (!response.ok) {
  //   const err = await response.json();
  //   throw new Error(err.detail);
  // }

  const dollarValue = await response.json();
  return dollarValue;
}
