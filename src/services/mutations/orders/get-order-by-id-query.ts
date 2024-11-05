import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '@webapp/services/actions/oders/get-order-by-id';
import { OrderResponse } from '@webapp/services/types/orders-types';

export const useGetOrderById = (orderId: string) => {
  return useQuery<OrderResponse, Error>({
    queryKey: ['order-by-id', orderId],
    queryFn: () => getOrderById(orderId),
  });
};
