import { useMutation } from '@tanstack/react-query';
import { updateOrderStatus } from '@webapp/services/actions/oders/update-order-status';
import { OrderResponse } from '@webapp/services/types/orders-types';

export const useUpdateOrderStatus = () => {
  return useMutation<OrderResponse, Error, { id: number | string; status: string }>({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
  });
};
