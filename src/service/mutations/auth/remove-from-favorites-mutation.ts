import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { removeFavorite } from '@webapp/service/actions/auth/remove-from-favorites';
import { User } from '@webapp/service/types/user-types';



import { useGetUserByIdMutation } from './get-user-by-id-mutation';


interface RemoveFavoriteVariables {
  userId: string;
  productId: string;
}

export const useRemoveFavorite = () => {
  return useMutation<User, Error, RemoveFavoriteVariables>({
    mutationFn: ({ userId, productId }) => removeFavorite(userId, productId),
    onSuccess: (data) => {
      toast.success('Producto eliminado de favoritos exitosamente');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};