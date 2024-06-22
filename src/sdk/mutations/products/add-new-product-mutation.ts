import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addNewProduct } from "@webapp/sdk/actions/products/add-new-product";
import { Product } from "@webapp/sdk/types/products-types";
import SnackbarUtils from '@webapp/components/snackbar';

export function useAddNewProduct() {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: (product: Product) => addNewProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products']});
      SnackbarUtils.success(`Producto añadido con éxito`);
    },
  })
}