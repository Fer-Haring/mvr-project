// En un archivo como import-xlsx.ts
import { refreshToken } from '../auth/user-refresh-token';


export async function importXlsx(file: File) {
  const URL = 'https://mvr-prod.onrender.com/products/import_product_list';
  const accessToken = localStorage.getItem('access_token');

  const formData = new FormData();
  formData.append('file', file);

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  };

  let response = await fetch(URL, options);

  if (response.status === 401) {
    const newAccessToken = await refreshToken();
    localStorage.setItem('access_token', newAccessToken);
    options.headers['Authorization'] = `Bearer ${newAccessToken}`;
    response = await fetch(URL, options);
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || 'Failed to import File');
  }

  return response.json();
}