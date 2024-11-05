import { useMutation, useQueryClient } from '@tanstack/react-query';
import SnackbarUtils from '@webapp/components/snackbar';
import { addToCart } from '@webapp/services/actions/cart/add-to-cart';
import { CartItem } from '@webapp/services/types/cart-types';

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation<CartItem, Error, CartItem>({
    mutationFn: (cartItem: CartItem) => addToCart(cartItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      // SnackbarUtils.success(`Producto añadido con éxito`);
    },
    onError: () => {
      SnackbarUtils.error(`Error al añadir el producto`);
    },
  });
}
