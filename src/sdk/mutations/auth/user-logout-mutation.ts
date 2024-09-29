import { useMutation } from '@tanstack/react-query';
import { userLogout } from '@webapp/sdk/actions/auth/user-logout';
import { useUserGoogleStore } from '@webapp/store/auth/google-sessions';
import { useUserStore } from '@webapp/store/auth/session';

export const useLogout = () => {
  const userStore = useUserStore();
  const googleUserStore = useUserGoogleStore();

  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('access_token');
      const tokenType = localStorage.getItem('token_type');
      if (!token || !tokenType) {
        throw new Error('No token available');
      }
      await userLogout(token, tokenType);
    },
    onSuccess: () => {
      userStore.logOut();
      googleUserStore.logOut();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};