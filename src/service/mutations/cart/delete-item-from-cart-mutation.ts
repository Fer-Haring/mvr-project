import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { removeItemFromCart } from '@webapp/service/actions/cart/delete-item-from-cart';

export function useRemoveItemFromCart() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (productId: string) => removeItemFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] }).then(() => {
        toast.success(`Producto eliminado del carrito`);
      });
    },
    onError: () => {
      toast.error(`Error al eliminar el producto del carrito`);
    },
  });
}
