
import { useQuery } from '@tanstack/react-query';
import { getDollarValue } from '@webapp/service/actions/admin/get-dollar-value';


export function useGetDollarValue() {
  return useQuery({
    queryKey: ["dollar-value"],
    queryFn: () => getDollarValue(),
  });
}