import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// Logger (is Dev only)

//Api Middleware
import apiMiddleware from '../features/api/middleware';

//Api Reducers
import { AuthApi } from '../features/api/auth';
import { classApi } from 'src/features/api/class';

// Slices
import authslice from '../features/slices/auth';
import { StudentApi } from 'src/features/api/student';

const reducers = combineReducers({
  [AuthApi.reducerPath]: AuthApi.reducer,
  [classApi.reducerPath]: classApi.reducer,
  [StudentApi.reducerPath]: StudentApi.reducer,
  authslice: authslice
});

const persistConfig = {
  key: 'yedibilim',
  storage,
  whitelist: ['authslice'],
  blacklist: ['api']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(thunk, apiMiddleware.middleware)
});

export default store;
