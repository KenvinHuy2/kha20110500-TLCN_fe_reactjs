import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import StoreSlices from '../slices/StoreSlices';

const persistConfig = {
  key: 'root',
  storage
};

const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({
    store: StoreSlices
  })),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

export { persistor, store };
