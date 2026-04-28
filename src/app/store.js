import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { apiSlice } from '../features/api/apiSlice';
import orebiReducer from '../features/orebi/orebiSlice';

// Combine reducers (useful if you add more slices later)
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  orebi: orebiReducer,
});

// Configure redux-persist
const persistConfig = {
  key: 'orebi-root',
  storage,
  // Optionally whitelist or blacklist specific reducers
  // whitelist: ['api'], // Only persist the 'api' slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these Redux Persist action types in the serializable check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER', 'persist/PAUSE', 'persist/PURGE', 'persist/FLUSH'],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
