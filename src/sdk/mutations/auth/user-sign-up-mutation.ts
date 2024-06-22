import { useMutation } from '@tanstack/react-query';
import SnackbarUtils from '@webapp/components/snackbar';
import { SignupPayload, SignupResponse } from '@webapp/sdk/types/user-types';
import { userSignup } from '@webapp/sdk/actions/auth/user-sign-up';

export const useSignupMutation = (navigate: (path: string) => void) => {
  return useMutation<SignupResponse, Error, SignupPayload>({
    mutationFn: (payload: SignupPayload) => userSignup(payload),
    onSuccess: (data) => {
      if (data) {
        navigate('/sign-in');
        SnackbarUtils.success('Usuario creado exitosamente, por favor inicie sesión');
      }
    },
    onError: (error) => {
      SnackbarUtils.error(error.message);
    },
  });
};