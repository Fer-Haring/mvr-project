import { useMutation } from '@tanstack/react-query';
import { updateProduct } from '@webapp/sdk/actions/products/update-product';

import { Product } from '../../types/products-types';

export const useUpdateProduct = () => {
  return useMutation<
    { productId: string; productData: Product },
    Error,
    { productId: string; productData: Product; file?: File }
  >({
    mutationFn: ({ productId, productData, file }) => updateProduct(productId, productData, file),
  });
};
