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

  const URL = "http://127.0.0.1:8000";

  return fetch(`${URL}/identity/set-password`, options)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.detail);
        });
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log('error', error);
      throw error;
    });
}
