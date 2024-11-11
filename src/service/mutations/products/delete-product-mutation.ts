import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteProduct } from '@webapp/service/actions/products/delete-product';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('El producto se elimino con exito');
    },
    onError: (error: any) => {
      toast.error(`Error al borrar Producto: ${error.message}`);
    },
  });
}
