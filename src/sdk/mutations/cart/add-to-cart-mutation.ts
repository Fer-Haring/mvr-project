import { useQueryClient, useMutation } from "@tanstack/react-query";
import { CartItem } from "@webapp/sdk/types/user-types";
import { addToCart } from "@webapp/sdk/actions/cart/add-to-cart";
import SnackbarUtils from '@webapp/components/snackbar';

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation<CartItem, Error, CartItem>({
    mutationFn: (cartItem: CartItem) => addToCart(cartItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      SnackbarUtils.success(`Producto añadido con éxito`);
    },
    onError: () => {
      SnackbarUtils.error(`Error al añadir el producto`);
    }
  });
}
