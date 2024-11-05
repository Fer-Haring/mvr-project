import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userSignIn } from '@webapp/services/actions/auth/user-sign-in';
import { LoginResponse } from '@webapp/services/types/user-types';
import { useUserStore } from '@webapp/store/auth/session';

interface LoginPayload {
  email: string;
  password: string;
}

export const useUserSignInMutation = (navigate: (path: string) => void) => {
  const queryClient = useQueryClient();
  const logIn = useUserStore((state) => state.logIn);

  return useMutation<LoginResponse, Error, LoginPayload, unknown>({
    mutationFn: (payload: LoginPayload) => userSignIn(payload),
    onSuccess: (data) => {
      // Guardar el token en localStorage y manejar el redireccionamiento u otros efectos secundarios
      logIn(data.user_id, data.user_name, data.access_token);
      localStorage.setItem('access_token', data.access_token);
      queryClient.invalidateQueries({ queryKey: ['user-data'] });
      navigate('/home'); // Redirigir al usuario a la página de inicio
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};
