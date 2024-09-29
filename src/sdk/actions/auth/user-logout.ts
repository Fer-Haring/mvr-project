import SnackbarUtils from '@webapp/components/snackbar';
import { useUserGoogleStore } from '@webapp/store/auth/google-sessions';
import { useUserStore } from '@webapp/store/auth/session';

export interface UserLogoutPayload {
  token: string;
  tokenType: string;
}

export async function userLogout(token: string, tokenType: string): Promise<void> {
  const URL =
    window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  if (!token || !tokenType) {
    console.error('No token available');
    throw new Error('No token available');
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ token_type: tokenType }),
  };

  try {
    const response = await fetch(`${URL}/identity/logout`, options);
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail);
    }

    // Limpiar tokens y actualizar los stores
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('refresh_token');

    useUserStore.getState().logOut();
    useUserGoogleStore.getState().logOut();
  } catch (error) {
    SnackbarUtils.error('Error al cerrar sesión: ' + error);
    throw error;
  }
}
