import { useMutation } from '@tanstack/react-query';
import { updateDollarValue } from '@webapp/sdk/actions/admin/update-dollar-value';


export const useUpdateDollarValue = () => {
  return useMutation<{ dollarValue: number }, Error, { dollarValue: number }>({
    mutationFn: ({ dollarValue }) => updateDollarValue(dollarValue),
  });
}
