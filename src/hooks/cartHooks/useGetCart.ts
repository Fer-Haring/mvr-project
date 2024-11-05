import { useAppDispatch, useAppSelector } from '@webapp/hooks/redux-hooks';
import { clearCart, removeCartItem } from '@webapp/redux/store/slices/cartSlices';
import { addToCartThunk, clearCartThunk, getUserCartThunk } from '@webapp/redux/store/thunks/cartThunks';
import { CartItem } from '@webapp/services/types/cart-types';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cart);

  const fetchCart = () => dispatch(getUserCartThunk());
  const addItemToCart = (item: CartItem) => dispatch(addToCartThunk(item));
  const clearUserCart = () => dispatch(clearCartThunk());
  const resetCart = () => dispatch(clearCart());

  const handleRemoveCartItem = (itemId: string) => {
    dispatch(removeCartItem(itemId));
  };

  return {
    ...cartState,
    fetchCart,
    addItemToCart,
    clearUserCart,
    resetCart,
    handleRemoveCartItem,
  };
};
