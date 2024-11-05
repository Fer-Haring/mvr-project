import { useMutation } from '@tanstack/react-query';
import SnackbarUtils from '@webapp/components/snackbar';
import { addFavorite } from '@webapp/services/actions/auth/add-to-favorites';
import { updateUser } from '@webapp/services/actions/auth/user-update';
import { Product } from '@webapp/services/types/products-types';
import { User } from '@webapp/services/types/user-types';

interface AddFavoriteVariables {
  userId: string;
  product: Product | undefined;
}

export const useAddFavorite = () => {
  return useMutation<User, Error, AddFavoriteVariables>({
    mutationFn: ({ userId, product }) => addFavorite(userId, product!),
    onSuccess: (data) => {
      SnackbarUtils.success('Producto añadido a favoritos exitosamente');
    },
    onError: (error) => {
      SnackbarUtils.error(error.message);
    },
  });
};
