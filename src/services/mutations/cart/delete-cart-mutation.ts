import { useMutation, useQueryClient } from '@tanstack/react-query';
import SnackbarUtils from '@webapp/components/snackbar';
import { clearCartApi } from '@webapp/services/actions/cart/delete-cart';

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation<void, Error>({
    mutationFn: () => clearCartApi(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      // SnackbarUtils.success(`Carrito limpiado con éxito`);
    },
    onError: () => {
      SnackbarUtils.error(`Error al limpiar el carrito`);
    },
  });
}
