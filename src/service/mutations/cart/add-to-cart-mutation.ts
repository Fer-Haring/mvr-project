import { useQueryClient, useMutation } from "@tanstack/react-query";
import { CartItem } from "@webapp/service/types/cart-types";
import { addToCart } from "@webapp/service/actions/cart/add-to-cart";
import { toast } from 'react-toastify';

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation<CartItem, Error, CartItem>({
    mutationFn: (cartItem: CartItem) => addToCart(cartItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      
    },
    onError: () => {
      toast.error(`Error al añadir el producto`);
    }
  });
}
