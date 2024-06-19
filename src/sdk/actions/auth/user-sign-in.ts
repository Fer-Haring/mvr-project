import { LoginPayload, LoginResponse } from "./types";

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

  const URL = "https://mvr-backend.onrender.com";

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

