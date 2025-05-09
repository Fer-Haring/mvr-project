import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@webapp/service/actions/auth/get-users';
import { User } from '@webapp/service/types/user-types';

export const useGetUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['get-users'],
    queryFn: () => getUsers(),
  });
};
