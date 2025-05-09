import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { clearCart } from '@webapp/service/actions/cart/delete-cart';


export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation<void, Error>({
    mutationFn: () => clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      // toast.success(`Carrito limpiado con éxito`);
    },
    onError: () => {
      toast.error(`Error al limpiar el carrito`);
    },
  });
}
