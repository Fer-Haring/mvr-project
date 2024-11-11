import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createOrder } from '@webapp/service/actions/oders/save-new-order';
import { OrderRequest } from '@webapp/service/types/orders-types';


export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<OrderRequest, Error, OrderRequest>({
    mutationFn: (order: OrderRequest) => createOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      // toast.success(`Order created successfully`);
    },
    onError: () => {
      toast.error(`Error creating order`);
    },
  });
}
