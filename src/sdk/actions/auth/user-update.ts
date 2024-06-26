import { SignupResponse, UpdateUserPayload } from "../../types/user-types";
import { refreshToken } from "../auth/user-refresh-token";

export async function updateUser(userId: string, payload: UpdateUserPayload, file?: File | null): Promise<SignupResponse> {
  const URL = `https://mvr-prod.onrender.com`;
  const accessToken = localStorage.getItem('access_token');

  const formData = new FormData();
  formData.append("user_data", JSON.stringify(payload));
  if (file) {
    formData.append("file", file);
  }

  const options = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    body: formData,
  };

  let response = await fetch(`${URL}/identity/update-user/${userId}`, options);

  if (response.status === 401) {
    const newAccessToken = await refreshToken();
    options.headers['Authorization'] = `Bearer ${newAccessToken}`;
    response = await fetch(`${URL}/identity/update-user/${userId}`, options);
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail);
  }

  const user = await response.json();
  return user;
}