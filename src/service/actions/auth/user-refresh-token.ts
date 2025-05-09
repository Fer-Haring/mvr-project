import { jwtDecode } from 'jwt-decode';



import { emitter } from './event-emitter';


interface DecodedAccessToken {
  email: string;
  password: string;
  exp: number;
  // Otros campos que puedas necesitar del token
}

export async function decodeAccessToken(accessToken: string): Promise<DecodedAccessToken> {
  try {
    const decoded: DecodedAccessToken = jwtDecode(accessToken);
    return decoded;
  } catch (error) {
    throw new Error('Invalid access token');
  }
}

export async function refreshToken(): Promise<string> {
    const URL =
      window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;
  const refreshToken = localStorage.getItem('refresh_token');
  const accessToken = localStorage.getItem('access_token');

  // Decodificar el access token para obtener email y password
  let email = '';
  let password = '';
  if (accessToken) {
    const decoded = await decodeAccessToken(accessToken);
    email = decoded.email;
    password = decoded.password;
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ refresh_token: refreshToken || '', email, password }),
  };

  const response = await fetch(`${URL}/identity/refresh-token`, options);
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