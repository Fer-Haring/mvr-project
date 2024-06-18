export interface UserLogoutPayload {
  token: string;
  tokenType: string;
}

export async function userLogout(token: string, tokenType: string): Promise<UserLogoutPayload> {
  const URL = "https://mvr-backend.onrender.com";

  if (tokenType === "google") {
    window.location.href = "https://accounts.google.com/Logout";
    return { token, tokenType };
  } else {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    const response = await fetch(`${URL}/identity/logout`, options);
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail);
    }
    return response.json();
  }
}