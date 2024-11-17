import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { addFavorite } from '@webapp/service/actions/auth/add-to-favorites';
import { updateUser } from '@webapp/service/actions/auth/user-update';
import { Product } from '@webapp/service/types/products-types';
import { User } from '@webapp/service/types/user-types';

interface AddFavoriteVariables {
  userId: string;
  product: Product | undefined;
}

export const useAddFavorite = () => {
  return useMutation<User, Error, AddFavoriteVariables>({
    mutationFn: ({ userId, product }) => addFavorite(userId, product!),
    onSuccess: () => {
      toast.success('Producto añadido a favoritos exitosamente');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
