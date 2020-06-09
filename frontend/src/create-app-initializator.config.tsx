import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { authSlice, getUserToken } from './Store/authSlice';
import { useAppDispatch } from './create-store.config';
import { loadersSlice } from './Store/loadersSlice';
import UserService from './Services/UserService';


export const AppInitializator: FC<PropsWithChildren<{}>> = ({children}) => {
  const userToken = useSelector(getUserToken);
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      // eslint-disable-next-line no-param-reassign
      if (userToken && !config.headers.authorization) {
        config.headers.authorization = userToken;
      }
      return config;
    }, (error) => Promise.reject(error));
    //eslint-disable-next-line
  },[userToken]);

  //! If user already has a token, fetch the user data
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if(token && !userToken) {
        dispatch(loadersSlice.actions.addLoader('APP_INITIALIZATOR'));
        const response = await UserService.getUserInfo(token);
        if(response.hasError) {
          localStorage.removeItem('token');
          return;
        }
        dispatch(authSlice.actions.login(response.data.user));
        dispatch(loadersSlice.actions.removeLoader('APP_INITIALIZATOR'));
      }
    })();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      {children}
    </>
  );
};
