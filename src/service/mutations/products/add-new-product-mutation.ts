import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addNewProduct } from '@webapp/service/actions/products/add-new-product';
import { Product } from '@webapp/service/types/products-types';

export function useAddNewProduct() {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: (product: Product) => addNewProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }).then(r => r);
      toast.success(`Producto añadido con éxito`);
    },
  });
}
