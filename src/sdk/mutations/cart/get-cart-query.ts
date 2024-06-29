import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "@webapp/sdk/actions/cart/get-cart";
import { CartItem } from "@webapp/sdk/types/user-types";


export const useGetUserCart = () => {
  const token = localStorage.getItem('access_token');

  return useQuery<CartItem[], Error>({
    queryKey: ['cart'],
    queryFn: () => getUserCart(token!),
    enabled: !!token,
  });
}