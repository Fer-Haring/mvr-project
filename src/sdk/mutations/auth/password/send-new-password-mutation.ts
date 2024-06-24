import { useMutation } from '@tanstack/react-query';
import { SendNewPasswordPayload, SendNewPasswordResponse, sendNewPassword } from '@webapp/sdk/actions/auth/password/send-new-password';

export const useSendNewPasswordMutation = () => {
  return useMutation<SendNewPasswordResponse, Error, SendNewPasswordPayload, unknown>({
    mutationFn: (payload: SendNewPasswordPayload) => sendNewPassword(payload),
    onSuccess: (data) => {
      console.log('Password updated successfully:', data);
      // Maneja cualquier lógica adicional después de actualizar la contraseña exitosamente
    },
    onError: (error) => {
      console.error('Failed to update password:', error);
    },
  });
};
