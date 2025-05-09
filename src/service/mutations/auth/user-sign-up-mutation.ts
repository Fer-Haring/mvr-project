import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { userSignup } from '@webapp/service/actions/auth/user-sign-up';
import { SignupPayload, SignupResponse } from '@webapp/service/types/user-types';

export const useSignupMutation = (navigate: (path: string) => void) => {
  return useMutation<SignupResponse, Error, SignupPayload>({
    mutationFn: (payload: SignupPayload) => userSignup(payload),
    onSuccess: (data) => {
      if (data) {
        navigate('/sign-in');
        toast.success('Usuario creado exitosamente, por favor inicie sesión');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
