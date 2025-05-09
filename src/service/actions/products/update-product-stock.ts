import { refreshToken } from '../auth/user-refresh-token';

export async function updateProductStock(productId: string, stockDelta: number) {
  const URL =
    window.location.hostname === 'localhost' ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;

  let accessToken = localStorage.getItem('access_token');

  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ stock_delta: stockDelta }), // Enviar solo stock_delta
  };

  let response;
  try {
    response = await fetch(`${URL}/products/update-stock/${productId}`, options);
  } catch (networkError) {
    if (networkError instanceof Error) {
      throw new Error('Network error: ' + networkError.message);
    } else {
      throw new Error('An unknown network error occurred');
    }
  }

  // Manejo de autenticación
  if (response.status === 401) {
    // Si el token ha expirado, intenta refrescarlo
    try {
      accessToken = await refreshToken();
      localStorage.setItem('access_token', accessToken);
      options.headers['Authorization'] = `Bearer ${accessToken}`;
      response = await fetch(`${URL}/update-stock/${productId}`, options);
    } catch (refreshError) {
      if (refreshError instanceof Error) {
        throw new Error('Failed to refresh token: ' + refreshError.message);
      } else {
        throw new Error('Unknown error refreshing token');
      }
    }
  }

  if (!response.ok) {
    let errDetail;
    try {
      errDetail = await response.json();
    } catch (jsonError) {
      if (jsonError instanceof Error) {
        console.error('Failed to parse error response:', jsonError.message);
        throw new Error('Failed to parse error response: ' + jsonError.message);
      } else {
        console.error('Unknown error parsing error response:', jsonError);
        throw new Error('Failed to parse error response');
      }
    }
    console.error('Error response from server:', errDetail);
    throw new Error(errDetail.detail || 'Unknown error occurred');
  }

  const updatedProduct = await response.json();
  return updatedProduct;
}
