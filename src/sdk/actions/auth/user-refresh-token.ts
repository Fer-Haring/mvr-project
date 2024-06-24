import  SnackbarUtils from "@webapp/components/snackbar";
import { Navigate } from "react-router-dom";


// user-refresh-token.ts
export async function refreshToken(): Promise<string> {
  const URL = "https://mvr-prod.onrender.com/identity/refresh-token";
  // const URL = "http://127.0.0.1:8000/identity/refresh-token";
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
    if(!refreshToken || !accessToken || response.status === 401) {
      localStorage.clear();
      SnackbarUtils.error('La Sesión ha expirado, por favor inicie sesión nuevamente.');
      Navigate({
        to: '/sign-in',
        replace: true
      });
    }
    throw new Error(err.detail);
  }

  const data = await response.json();
  localStorage.setItem('access_token', data.access_token);
  return data.access_token;
}
