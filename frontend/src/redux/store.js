import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import reducer
import userReducer from "./user/userSlice";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:persistedReducer,

    devTools: process.env.NODE_ENV !== 'production',
})

// persistor

export const persistor = persistStore(store)

