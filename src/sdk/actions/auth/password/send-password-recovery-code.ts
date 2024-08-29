import SnackbarUtils from '@webapp/components/snackbar';
import { NavigateFunction } from 'react-router-dom';

export interface SendCodePayload {
  email: string;
  navigate: NavigateFunction;
}

export interface SendCodeResponse {
  message: string;
}

export async function sendPasswordRecoveryCode(payload: SendCodePayload): Promise<SendCodeResponse> {
  const params = new URLSearchParams();
  params.append('email', payload.email);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  };

  const URL =
    window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  return fetch(`${URL}/identity/recover_password/send_code`, options)
    .then(async (response) => {
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail);
      }
      if (response.status === 200) {
        payload.navigate('/verification-code');
      }
      return response.json();
    })
    .catch((error) => {
      SnackbarUtils.error(error);
      throw error;
    });
}
