import SnackbarUtils from '@webapp/components/snackbar';
import { NavigateFunction } from 'react-router-dom';

export interface SendNewPasswordPayload {
  email: string;
  new_password: string;
  navigate: NavigateFunction;
}

export interface SendNewPasswordResponse {
  message: string;
}

export async function sendNewPassword(payload: SendNewPasswordPayload): Promise<SendNewPasswordResponse> {
  const params = new URLSearchParams();
  params.append('email', payload.email);
  params.append('new_password', payload.new_password);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  };

  const URL =
    window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  return fetch(`${URL}/identity/recover_password/update_password`, options)
    .then(async (response) => {
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail);
      }
      if (response.status === 200) {
        payload.navigate('/sign-in');
        SnackbarUtils.success('La Contraseña ha sido actualizada correctamente');
      }
      return response.json();
    })
    .catch((error) => {
      SnackbarUtils.error(error);
      throw error;
    });
}
