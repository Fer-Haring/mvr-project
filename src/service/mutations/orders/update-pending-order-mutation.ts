import { useMutation } from '@tanstack/react-query';
import { updatePendingOrder } from '@webapp/service/actions/oders/update-pending-order';
import { OrderRequest, OrderResponse } from '@webapp/service/types/orders-types';

export const useUpdatePendingOrder = () => {
  return useMutation<OrderResponse, Error, { id: number | string; order: OrderRequest }>({
    mutationFn: ({ id, order }) => updatePendingOrder(id, order),
  });
};
