export async function downloadOrderPdf(orderId: string): Promise<{ blob: Blob; filename: string }> {
  const token = localStorage.getItem('access_token');
  const URL = 'https://mvr-prod.onrender.com/orders';

  const response = await fetch(`${URL}/generate_bill/${orderId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    // If you need to send any data in the body, add it here
    // body: JSON.stringify({ /* any data you need to send */ }),
  });

  if (!response.ok) {
    throw new Error('Failed to download PDF');
  }

  const blob = await response.blob();

  // Get the filename from the Content-Disposition header
  const contentDisposition = response.headers.get('Content-Disposition');
  let filename = `Recibo N°${orderId}.pdf`;
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
    if (filenameMatch) {
      filename = filenameMatch[1];
    }
  }

  return { blob, filename };
}
