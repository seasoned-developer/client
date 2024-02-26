import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./Redux/index";
import { configureStore } from '@reduxjs/toolkit'; 
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import {
  persistStore, 
  persistReducer,
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST,
  PURGE, 
  REGISTER
} from 'redux-persist';
import storage from "redux-persist/lib/storage";




const persistConfig    = { key : "root", storage, version: 1};
const persistedReducer = persistReducer(persistConfig, authReducer); 
//now we gonna configure our store : global state 
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk,
        serializableCheck: {
            ignoredActions: [REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], 
            // Add any action types you want to ignore serialization for
        },
      }),
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)} >
        <App />
      </PersistGate>
    </Provider>  
);
