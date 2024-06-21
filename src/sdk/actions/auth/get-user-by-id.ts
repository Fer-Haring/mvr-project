import { User } from "./types";
import { refreshToken } from "./user-refresh-token";


export async function getUserById(userId: string): Promise<User> {
  const URL = "https://mvr-backend.onrender.com";
  // const URL = 'http://127.0.0.1:8000'
  const accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  };

  let response = await fetch(`${URL}/identity/${userId}`, options);
  
  if (response.status === 401) {
    const newAccessToken = await refreshToken();
    options.headers['Authorization'] = `Bearer ${newAccessToken}`;
    response = await fetch(`${URL}/users/${userId}`, options);
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail);
  }

  const user = await response.json();
  return user;
}