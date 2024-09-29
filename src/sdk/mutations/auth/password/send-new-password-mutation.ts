import { useMutation } from '@tanstack/react-query';
import SnackbarUtils from '@webapp/components/snackbar';
import {
  SendNewPasswordPayload,
  SendNewPasswordResponse,
  sendNewPassword,
} from '@webapp/sdk/actions/auth/password/send-new-password';

export const useSendNewPasswordMutation = () => {
  return useMutation<SendNewPasswordResponse, Error, SendNewPasswordPayload, unknown>({
    mutationFn: (payload: SendNewPasswordPayload) => sendNewPassword(payload),
    onSuccess: (data) => {
      SnackbarUtils.success('Password updated successfully');
      // Maneja cualquier lógica adicional después de actualizar la contraseña exitosamente
    },
    onError: (error) => {
      SnackbarUtils.error('Failed to update password:' + error);
    },
  });
};
