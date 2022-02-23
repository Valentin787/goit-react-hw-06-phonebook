import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import { configureStore } from "@reduxjs/toolkit";
import phoneBookReducer from './phoneBook/phoneBookReducer'

const persistConfig = {
  key: 'item',
  version: 1,
  storage,
}

const contactsPersistedReducer = persistReducer(persistConfig, phoneBookReducer)


const store = configureStore ({
  reducer: {
    contacts: contactsPersistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools:process.env.NODE_ENV !== "production"
})

export const persistor = persistStore(store)


export default store
