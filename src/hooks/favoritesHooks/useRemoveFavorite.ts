import { useAppDispatch, useAppSelector } from '@webapp/hooks/redux-hooks';
import { clearFavoritesState } from '@webapp/redux/store/slices/favoritesSlices';
import { removeFavoriteThunk } from '@webapp/redux/store/thunks/favoriteThunks';

export const useRemoveFavorite = (userId: string) => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.favorites);

  const removeFavoriteFromUser = (productId: string) => {
    dispatch(removeFavoriteThunk({ userId, productId }));
  };

  const clearFavorites = () => {
    dispatch(clearFavoritesState());
  };

  return {
    user,
    loading,
    error,
    removeFavoriteFromUser,
    clearFavorites,
  };
};
