import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@webapp/sdk/actions/auth/get-user-by-id';
import { User } from '@webapp/sdk/actions/auth/types';


export const useGetUserByIdMutation = (userId: string) => {
  return useQuery<User, Error>({
    queryKey: ["user-by-id", userId],
    queryFn: () => getUserById(userId),
  });
}