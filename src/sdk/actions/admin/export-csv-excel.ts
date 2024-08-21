import { refreshToken } from '../auth/user-refresh-token';


export async function exportCsvExcel(fileFormat: string) {
    const URL =
      window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  const accessToken = localStorage.getItem('access_token');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const queryParam = `?file_format=${fileFormat}`;
  let response = await fetch(`${URL}/products/export_product_list${queryParam}`, options);
  if (response.status === 401) {
    const newAccessToken = await refreshToken();
    localStorage.setItem('access_token', newAccessToken);
    options.headers['Authorization'] = `Bearer ${newAccessToken}`;
    response = await fetch(`${URL}/export_product_list${queryParam}`, options);
  }
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || 'Failed to export File');
  }
  return response.blob();
}