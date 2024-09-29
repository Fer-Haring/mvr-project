import { useQuery } from "@tanstack/react-query"
import { getProductById } from "@webapp/sdk/actions/products/get-product-by-id";
import { Product } from "../../types/products-types";


export const useGetProductById = (productId: string) => {
  return useQuery<Product, Error>({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
  });
}