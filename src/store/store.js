import { configureStore } from '@reduxjs/toolkit';
import messageBundleReducer from './modules/messageBundle'
import userReducer from './modules/user'

export default configureStore({
  reducer: {
    messageBundle: messageBundleReducer,
    user: userReducer
  },
})
