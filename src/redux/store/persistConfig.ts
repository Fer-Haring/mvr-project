// persistConfig.ts
import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { RootState } from './reducer';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart', 'isLoggedIn', 'userInfo', 'token'],
};

export default persistConfig;
