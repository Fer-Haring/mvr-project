import { useMutation } from '@tanstack/react-query';
import SnackbarUtils from '@webapp/components/snackbar';
import { updateUser } from '@webapp/sdk/actions/auth/user-update';
import { UpdateUserPayload, User } from '@webapp/sdk/types/user-types';

interface UpdateUserVariables {
  payload: UpdateUserPayload;
  file?: File;
}

export const useUpdateUser = (userId: string) => {
  return useMutation<User, Error, UpdateUserVariables>({
    mutationFn: ({ payload, file }) => updateUser(userId, payload, file),
    onSuccess: (data) => {
      if (data) {
        SnackbarUtils.success('Usuario actualizado exitosamente');
      }
    },
    onError: (error) => {
      SnackbarUtils.error(error.message);
    },
  });
};
