import { useMutation } from "@tanstack/react-query";
import { Product } from "../../types/products-types";
import { updateProduct } from "@webapp/sdk/actions/products/update-product";

export const useUpdateProduct = () => {
  return useMutation<{ productId: string, productData: Product }, Error, { productId: string, productData: Product }>({
    mutationFn: ({ productId, productData }) => updateProduct(productId, productData),
  });
}
