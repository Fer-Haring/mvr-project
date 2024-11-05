import { useMutation } from '@tanstack/react-query';
import SnackbarUtils from '@webapp/components/snackbar';
import { userSignup } from '@webapp/services/actions/auth/user-sign-up';
import { SignupPayload, SignupResponse } from '@webapp/services/types/user-types';

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
