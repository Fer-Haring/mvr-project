import { useMutation } from '@tanstack/react-query';
import { downloadOrderPdf } from '@webapp/sdk/actions/admin/create-bill';
import { saveAs } from 'file-saver';


export function useDownloadOrderPdf() {
  return useMutation({
    mutationFn: async (orderId: string) => {
      const { blob, filename } = await downloadOrderPdf(orderId);
      saveAs(blob, filename);
    },
    onError: (error) => {
      console.error('Error downloading PDF:', error);
      // You can add additional error handling here, like showing a toast notification
    },
  });
}
