import { useMutation } from '@tanstack/react-query';
import { ChangePasswordPayload, ChangePasswordResponse, changePassword } from '@webapp/sdk/actions/auth/password/change-password';

export const useChangePasswordMutation = () => {
  return useMutation<ChangePasswordResponse, Error, ChangePasswordPayload, unknown>({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onSuccess: (data) => {
      console.log('Password changed successfully:', data);
      // Maneja cualquier lógica adicional después de cambiar la contraseña exitosamente
    },
    onError: (error) => {
      console.error('Failed to change password:', error);
    },
  });
};
