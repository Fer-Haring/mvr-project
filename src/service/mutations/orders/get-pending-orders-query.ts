import { useQuery } from '@tanstack/react-query';
import { getPendingOrders } from '@webapp/service/actions/oders/get-pending-orders';
import { OrderResponse } from '@webapp/service/types/orders-types';

export const useGetPendingOrders = () => {
  return useQuery<OrderResponse[], Error>({
    queryKey: ['get-pending-orders'],
    queryFn: () => getPendingOrders(),
  });
};
