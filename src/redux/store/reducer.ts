// reducer.ts
import { combineReducers } from '@reduxjs/toolkit';

import adminReducer from './slices/adminSlices';
import cartReducer from './slices/cartSlices';
import favoritesReducer from './slices/favoritesSlices';
import messageReducer from './slices/messageSlice';
import ordersReducer from './slices/ordersSlice';
import productsReducer from './slices/productsSlice';
import userReducer from './slices/userSlices';
import adminTableReducer from './slices/adminTableSlice';

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  admin: adminReducer,
  cart: cartReducer,
  favorites: favoritesReducer,
  message: messageReducer,
  orders: ordersReducer,
  adminTable: adminTableReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
