import SnackbarUtils from '@webapp/components/snackbar';

// set-password.ts
export interface SetPasswordPayload {
  email: string;
  new_password: string;
}

export async function setPassword(payload: SetPasswordPayload): Promise<void> {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  const URL =
    window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  return fetch(`${URL}/identity/set-password`, options)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.detail);
        });
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      SnackbarUtils.error(error);
      throw error;
    });
}
