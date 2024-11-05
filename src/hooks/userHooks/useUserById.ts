import { useAppDispatch, useAppSelector } from '@webapp/hooks/redux-hooks';
import { clearUserByIdState } from '@webapp/redux/store/slices/userSlices';
import { getUserByIdThunk } from '@webapp/redux/store/thunks/userThunks';

export const useGetUserById = (userId: string) => {
  const dispatch = useAppDispatch();
  const userByIdState = useAppSelector((state) => state.user.userById);

  const fetchUserById = () => dispatch(getUserByIdThunk(userId));
  const clearUserById = () => dispatch(clearUserByIdState());

  return {
    ...userByIdState,
    fetchUserById,
    clearUserById,
  };
};
