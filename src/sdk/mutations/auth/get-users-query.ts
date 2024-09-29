import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@webapp/sdk/actions/auth/get-users';
import { User } from '@webapp/sdk/types/user-types';

export const useGetUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['get-users'],
    queryFn: () => getUsers(),
  });
};
