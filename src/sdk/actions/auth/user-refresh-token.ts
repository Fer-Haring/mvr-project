import { emitter } from './event-emitter';


export async function refreshToken(): Promise<string> {
  const URL = "https://mvr-prod.onrender.com/identity/refresh-token";
  const refreshToken = localStorage.getItem('refresh_token');
  const accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ refresh_token: refreshToken || '' })
  };

  const response = await fetch(URL, options);
  if (!response.ok) {
    const err = await response.json();
    if (!refreshToken || !accessToken || response.status === 401) {
      emitter.emit('redirectToLogin');
    }
    throw new Error(err.detail);
  }

  const data = await response.json();
  localStorage.setItem('access_token', data.access_token);
  return data.access_token;
}