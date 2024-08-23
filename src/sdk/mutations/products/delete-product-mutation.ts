import { useMutation, useQueryClient } from '@tanstack/react-query';
import SnackbarUtils from '@webapp/components/snackbar';
import { deleteProduct } from '@webapp/sdk/actions/products/delete-product';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      SnackbarUtils.success('El producto se elimino con exito');
    },
    onError: (error: any) => {
      SnackbarUtils.error(`Error al borrar Producto: ${error.message}`);
    },
  });
}
