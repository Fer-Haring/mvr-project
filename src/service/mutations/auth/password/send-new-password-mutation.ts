import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  SendNewPasswordPayload,
  SendNewPasswordResponse,
  sendNewPassword,
} from '@webapp/service/actions/auth/password/send-new-password';

export const useSendNewPasswordMutation = () => {
  return useMutation<SendNewPasswordResponse, Error, SendNewPasswordPayload, unknown>({
    mutationFn: (payload: SendNewPasswordPayload) => sendNewPassword(payload),
    onSuccess: (data) => {
      toast.success('Password updated successfully');
      // Maneja cualquier lógica adicional después de actualizar la contraseña exitosamente
    },
    onError: (error) => {
      toast.error('Failed to update password:' + error);
    },
  });
};
