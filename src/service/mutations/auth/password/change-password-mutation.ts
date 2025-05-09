import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  changePassword,
} from '@webapp/service/actions/auth/password/change-password';

export const useChangePasswordMutation = () => {
  return useMutation<ChangePasswordResponse, Error, ChangePasswordPayload, unknown>({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onSuccess: (data) => {
      toast.success('Password changed successfully');
      // Maneja cualquier lógica adicional después de cambiar la contraseña exitosamente
    },
    onError: (error) => {
      toast.error('Failed to change password:' + error);
    },
  });
};
