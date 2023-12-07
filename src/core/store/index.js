import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartActions, cartReducer, cartSelectors } from './slices/cart.slice';
import { sharedActions, sharedReducer, sharedSelectors } from './slices/shared.slice';
import * as asyncActions from './async-actions';

const persistConfig = {
  key: 'root',
  storage,
};

const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      shared: sharedReducer,
      cart: cartReducer,
    }),
  ),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

export const storeActions = {
  ...sharedActions,
  ...cartActions,
  ...asyncActions,
};
export const storeSelectors = {
  ...sharedSelectors,
  ...cartSelectors,
};
export { persistor, store };
