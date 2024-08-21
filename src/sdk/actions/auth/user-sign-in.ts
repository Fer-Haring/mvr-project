import SnackbarUtils from '@webapp/components/snackbar';

import { LoginPayload, LoginResponse } from '../../types/user-types';

export async function userSignIn(payload: LoginPayload): Promise<LoginResponse> {
  const params = new URLSearchParams();
  params.append('email', payload.email);
  params.append('password', payload.password);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  };

  // Determina cuál URL utilizar dependiendo del entorno
  const URL = import.meta.env.VITE_API_URL_PROD;
  // window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  return fetch(`${URL}/identity/login`, options)
    .then(async (response) => {
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail);
      }
      const loginResponse: LoginResponse = await response.json();
      // Store the token and token_type in localStorage
      localStorage.setItem('access_token', loginResponse.access_token);
      localStorage.setItem('token_type', loginResponse.token_type);
      localStorage.setItem('refresh_token', loginResponse.refresh_token);
      return loginResponse;
    })
    .catch((error) => {
      console.log('error', error);
      throw error;
    });
}
