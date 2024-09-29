import { useMutation } from '@tanstack/react-query';
import SnackbarUtils from '@webapp/components/snackbar';
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  changePassword,
} from '@webapp/sdk/actions/auth/password/change-password';

export const useChangePasswordMutation = () => {
  return useMutation<ChangePasswordResponse, Error, ChangePasswordPayload, unknown>({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onSuccess: (data) => {
      SnackbarUtils.success('Password changed successfully');
      // Maneja cualquier lógica adicional después de cambiar la contraseña exitosamente
    },
    onError: (error) => {
      SnackbarUtils.error('Failed to change password:' + error);
    },
  });
};
