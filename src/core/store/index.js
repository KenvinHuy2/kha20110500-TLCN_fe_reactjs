import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { sharedReducer, sharedActions, sharedSelectors } from './slices/shared.slice';

const persistConfig = {
  key: 'root',
  storage,
};

const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      shared: sharedReducer,
    }),
  ),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

export const storeActions = {
  ...sharedActions,
};
export const storeSelectors = {
  ...sharedSelectors,
};
export { persistor, store };
