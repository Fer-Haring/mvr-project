import { useMutation } from '@tanstack/react-query';
import { SendCodePayload, SendCodeResponse, sendPasswordRecoveryCode } from '@webapp/sdk/actions/auth/password/send-password-recovery-code';

export const useSendRecoveryCodeMutation = () => {
  return useMutation<SendCodeResponse, Error, SendCodePayload, unknown>({
    mutationFn: (payload: SendCodePayload) => sendPasswordRecoveryCode(payload),
    onSuccess: (data) => {
      console.log('Code sent successfully:', data);
      // Maneja cualquier lógica adicional después de enviar el código exitosamente
    },
    onError: (error) => {
      console.error('Failed to send code:', error);
    },
  });
};