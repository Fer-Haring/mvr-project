export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export async function changePassword(payload: ChangePasswordPayload): Promise<ChangePasswordResponse> {
  const params = new URLSearchParams();
  params.append('current_password', payload.current_password);
  params.append('new_password', payload.new_password);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    body: params.toString(),
  };

  const URL = "https://mvr-prod.onrender.com";

  return fetch(`${URL}/identity/change_password`, options)
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
