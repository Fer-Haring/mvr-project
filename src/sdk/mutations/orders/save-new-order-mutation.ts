import { useMutation, useQueryClient } from '@tanstack/react-query';
import SnackbarUtils from '@webapp/components/snackbar';
import { createOrder } from '@webapp/sdk/actions/oders/save-new-order';
import { CompletedOrder } from '@webapp/sdk/types/user-types';


export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<CompletedOrder, Error, CompletedOrder>({
    mutationFn: (order: CompletedOrder) => createOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      // SnackbarUtils.success(`Order created successfully`);
    },
    onError: () => {
      SnackbarUtils.error(`Error creating order`);
    },
  });
}
