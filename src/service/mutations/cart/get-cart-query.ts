import { useQuery } from '@tanstack/react-query';
import { getUserCart } from '@webapp/service/actions/cart/get-cart';
import { CartResponse } from '@webapp/service/types/cart-types';


export const useGetUserCart = () => {
  return useQuery<CartResponse[], Error>({
    queryKey: ['get-cart'],
    queryFn: () => getUserCart(),
  });
};