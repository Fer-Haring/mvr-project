import { NavigateFunction } from 'react-router-dom';

export interface VerifyCodePayload {
  email: string;
  code: string;
  navigate: NavigateFunction;
}

export interface VerifyCodeResponse {
  message: string;
}

export async function verifyRecoveryCode(payload: VerifyCodePayload): Promise<VerifyCodeResponse> {
  const params = new URLSearchParams();
  params.append('email', payload.email);
  params.append('code', payload.code);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  };

  const URL =
    window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  return fetch(`${URL}/identity/recover_password/validate_code`, options)
    .then(async (response) => {
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail);
      }
      if (response.status === 200) {
        payload.navigate('/forgot-password/new-password');
      }
      return response.json();
    })
    .catch((error) => {
      console.log('error', error);
      throw error;
    });
}
