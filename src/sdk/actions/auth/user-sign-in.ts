export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  user_name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

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

  const URL = "http://127.0.0.1:8000";

  return fetch(`${URL}/identity/login`, options)
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

