import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '@webapp/service/actions/oders/get-all-orders';
import { OrderResponse } from '@webapp/service/types/orders-types';

export const useGetAllOrders = () => {
  return useQuery<OrderResponse[], Error>({
    queryKey: ['get-all-orders'],
    queryFn: () => getAllOrders(),
  });
};
