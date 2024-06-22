import { SignupPayload, SignupResponse } from "../../types/user-types";

export async function userSignup(payload: SignupPayload): Promise<SignupResponse> {
  const URL = "http://127.0.0.1:8000/identity/signup";

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  return fetch(URL, options)
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