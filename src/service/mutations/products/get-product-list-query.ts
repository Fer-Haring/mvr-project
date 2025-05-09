import { useQuery } from "@tanstack/react-query";
import { getProductsList } from "@webapp/service/actions/products/get-products-list";
import { ProductsListResponse } from "../../types/products-types";


export const useProductListQuery = (page: number, limit: number) => {
  return useQuery<ProductsListResponse, Error>({
    queryKey: ["products", page, limit],
    queryFn: () => getProductsList(page, limit),
  });
}