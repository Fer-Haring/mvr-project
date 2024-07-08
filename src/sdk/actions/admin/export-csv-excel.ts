import { refreshToken } from '../auth/user-refresh-token';

export async function exportCsvExcel(fileFormat: string) {
  const URL = 'http://127.0.0.1:8000/products';
  const accessToken = localStorage.getItem('access_token');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const queryParam = `?file_format=${fileFormat}`;
  let response = await fetch(`${URL}/export_product_list${queryParam}`, options);
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
