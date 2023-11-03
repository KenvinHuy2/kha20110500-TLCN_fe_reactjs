import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({})),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

export { persistor, store };
