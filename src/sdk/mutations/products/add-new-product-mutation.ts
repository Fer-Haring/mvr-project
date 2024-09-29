import { useMutation, useQueryClient } from '@tanstack/react-query';
import SnackbarUtils from '@webapp/components/snackbar';
import { addNewProduct } from '@webapp/sdk/actions/products/add-new-product';
import { Product } from '@webapp/sdk/types/products-types';

export function useAddNewProduct() {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: (product: Product) => addNewProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      SnackbarUtils.success(`Producto añadido con éxito`);
    },
  });
}
