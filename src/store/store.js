import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';  // localStorage에 저장
import { combineReducers } from "redux";
import { 
  persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from "redux-persist";
// slice
import messageBundleReducer from './slice/messageBundle'
import tokenReducer from './slice/token'
import userReducer from './slice/user'

const rootReducer = combineReducers({
  messageBundle: messageBundleReducer,
  token: tokenReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,  // localStorage에 저장
  whitelist: ["token"] // 'token' reducer만 localstorage에 저장
  // blacklist -> 그것만 제외
};

export default configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});