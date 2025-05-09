import { useMutation } from '@tanstack/react-query';
import { updateProductStock } from '@webapp/service/actions/products/update-product-stock';

export const useUpdateProductStock = () => {
  return useMutation<{ productId: string; stockDelta: number }, Error, { productId: string; stockDelta: number }>({
    mutationFn: ({ productId, stockDelta }) => updateProductStock(productId, stockDelta),
  });
};
