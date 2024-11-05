import { useAppDispatch, useAppSelector } from '@webapp/hooks/redux-hooks';
import { clearFavoritesState } from '@webapp/redux/store/slices/favoritesSlices';
import { addFavoriteThunk } from '@webapp/redux/store/thunks/favoriteThunks';
import { Product } from '@webapp/services/types/products-types';

export const useAddFavorite = (userId: string) => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.favorites);

  const addFavoriteToUser = (product: Product) => {
    dispatch(addFavoriteThunk({ userId, product }));
  };

  const clearFavorites = () => {
    dispatch(clearFavoritesState());
  };

  return {
    user,
    loading,
    error,
    addFavoriteToUser,
    clearFavorites,
  };
};
