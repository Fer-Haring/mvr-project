import { useMutation } from '@tanstack/react-query';
import { VerifyCodePayload, VerifyCodeResponse, verifyRecoveryCode } from '@webapp/sdk/actions/auth/password/verify-recovery-code';

export const useVerifyRecoveryCodeMutation = () => {
  return useMutation<VerifyCodeResponse, Error, VerifyCodePayload, unknown>({
    mutationFn: (payload: VerifyCodePayload) => verifyRecoveryCode(payload),
    onSuccess: (data) => {
      console.log('Code verified successfully:', data);
      // Maneja cualquier lógica adicional después de verificar el código exitosamente
    },
    onError: (error) => {
      console.error('Failed to verify code:', error);
    },
  });
};
