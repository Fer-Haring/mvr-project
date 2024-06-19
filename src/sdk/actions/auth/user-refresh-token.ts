// user-refresh-token.ts
export async function refreshToken(): Promise<string> {
  const URL = "https://mvr-backend.onrender.com/identity/refresh-token";
  const refreshToken = localStorage.getItem('refresh_token');

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
    throw new Error(err.detail);
  }

  const data = await response.json();
  localStorage.setItem('access_token', data.access_token);
  return data.access_token;
}
