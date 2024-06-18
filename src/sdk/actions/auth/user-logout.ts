export interface UserLogoutPayload {
  token: string;
  tokenType: string;
}

export async function userLogout(token: string, tokenType: string): Promise<UserLogoutPayload> {
  const URL = "http://127.0.0.1:8000";

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