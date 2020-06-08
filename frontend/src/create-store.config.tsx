import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch } from 'react-redux';
import { authSlice } from './Store/authSlice';
import logger from 'redux-logger';
const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  middleware: [logger]
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export const ReduxStore = ({ children }: any) => (
  <Provider store={store}>
    {children}
  </Provider>
);
