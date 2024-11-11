import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateUser } from '@webapp/service/actions/auth/user-update';
import { UpdateUserPayload, User } from '@webapp/service/types/user-types';

interface UpdateUserVariables {
  payload: UpdateUserPayload;
  file?: File;
}

export const useUpdateUser = (userId: string) => {
  return useMutation<User, Error, UpdateUserVariables>({
    mutationFn: ({ payload, file }) => updateUser(userId, payload, file),
    onSuccess: (data) => {
      if (data) {
        toast.success('Usuario actualizado exitosamente');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
