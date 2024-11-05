import { useAppDispatch, useAppSelector } from '@webapp/hooks/redux-hooks';
import { clearCart } from '@webapp/redux/store/slices/carSlices';
import { getUserCartThunk } from '@webapp/redux/store/thunks/cartThunks';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { cartItems, loading, error } = useAppSelector((state) => state.cart);

  const fetchCart = () => dispatch(getUserCartThunk());
  const clearCartData = () => dispatch(clearCart());

  return {
    cartItems,
    loading,
    error,
    fetchCart,
    clearCartData,
  };
};
