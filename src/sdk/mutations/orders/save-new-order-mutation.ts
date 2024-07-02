import { useMutation, useQueryClient } from '@tanstack/react-query';
import SnackbarUtils from '@webapp/components/snackbar';
import { createOrder } from '@webapp/sdk/actions/oders/save-new-order';
import { OrderRequest } from '@webapp/sdk/types/orders-types';


export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<OrderRequest, Error, OrderRequest>({
    mutationFn: (order: OrderRequest) => createOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      // SnackbarUtils.success(`Order created successfully`);
    },
    onError: () => {
      SnackbarUtils.error(`Error creating order`);
    },
  });
}
