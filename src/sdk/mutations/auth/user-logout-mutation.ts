import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserLogoutPayload, userLogout } from '@webapp/sdk/actions/auth/user-logout';
import { useUserGoogleStore } from '@webapp/store/auth/google-sessions';
import { useUserStore } from '@webapp/store/auth/session';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<UserLogoutPayload, Error, { token: string }, unknown>({
    mutationFn: ({ token }) => userLogout(token, 'jwt'),
    onSuccess: () => {
      localStorage.removeItem('access_token');
      useUserStore.getState().logOut();
      useUserGoogleStore.getState().logOut();
      queryClient.invalidateQueries({ queryKey: ['user-data'] });
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });
};