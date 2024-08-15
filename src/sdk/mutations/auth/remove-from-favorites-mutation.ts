import { useMutation } from '@tanstack/react-query';
import SnackbarUtils from '@webapp/components/snackbar';
import { removeFavorite } from '@webapp/sdk/actions/auth/remove-from-favorites';
import { User } from '@webapp/sdk/types/user-types';



import { useGetUserByIdMutation } from './get-user-by-id-mutation';


interface RemoveFavoriteVariables {
  userId: string;
  productId: string;
}

export const useRemoveFavorite = () => {
  return useMutation<User, Error, RemoveFavoriteVariables>({
    mutationFn: ({ userId, productId }) => removeFavorite(userId, productId),
    onSuccess: (data) => {
      SnackbarUtils.success('Producto eliminado de favoritos exitosamente');
    },
    onError: (error) => {
      SnackbarUtils.error(error.message);
    },
  });
};