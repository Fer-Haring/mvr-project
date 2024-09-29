import { useMutation } from '@tanstack/react-query';
import { updatePendingOrder } from '@webapp/sdk/actions/oders/update-pending-order';
import { OrderRequest, OrderResponse } from '@webapp/sdk/types/orders-types';

export const useUpdatePendingOrder = () => {
  return useMutation<OrderResponse, Error, { id: number | string; order: OrderRequest }>({
    mutationFn: ({ id, order }) => updatePendingOrder(id, order),
  });
};
