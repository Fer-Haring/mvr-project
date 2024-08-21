import { SignupPayload, SignupResponse } from '../../types/user-types';


export async function userSignup(payload: SignupPayload, file?: File): Promise<SignupResponse> {
    const URL =
      window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  const formData = new FormData();

  // Append each field of the payload individually
  for (const [key, value] of Object.entries(payload)) {
    formData.append(key, value as string);
  }

  if (file) {
    formData.append('file', file);
  }

  const options = {
    method: 'POST',
    body: formData,
  };

  return fetch(`${URL}/identity/signup`, options)
    .then(async (response) => {
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail);
      }
      return response.json();
    })
    .catch((error) => {
      console.log('error', error);
      throw error;
    });
}