import { useUserGoogleStore } from "@webapp/store/auth/google-sessions";
import { useUserStore } from "@webapp/store/auth/session";

export interface UserLogoutPayload {
  token: string;
  tokenType: string;
}

export async function userLogout(token: string, tokenType: string): Promise<void> {
  const URL = "https://mvr-prod.onrender.com/identity/logout";

  if (!token || !tokenType) {
    console.error("No token available");
    throw new Error("No token available");
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ token_type: tokenType }),
  };

  try {
    const response = await fetch(URL, options);
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
    console.log('Logout error:', error);
    throw error;
  }
}