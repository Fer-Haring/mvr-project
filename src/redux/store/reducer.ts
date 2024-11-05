// reducer.ts
import { combineReducers } from '@reduxjs/toolkit';



import adminReducer from './slices/adminSlices';
import cartReducer from './slices/carSlices';
import favoritesReducer from './slices/favoritesSlices';
import productsReducer from './slices/productsSlice';
import userReducer from './slices/userSlices';


const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  admin: adminReducer,
  cart: cartReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;