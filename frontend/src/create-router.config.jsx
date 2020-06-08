import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import NormalRoutes from './routes/normal.routes';
import AdminRoutes from './routes/admin.routes';

const Routes = () => (
  <>
    <NormalRoutes/>
    <AdminRoutes/>
  </>
);
export const RouterConfig = () => {
  const auth = useSelector((state) => state.auth);
  axios.interceptors.request.use((config) => {
    // eslint-disable-next-line no-param-reassign
    if (auth.user.token) {
      config.headers.authorization = auth.user.token;
    }
    return config;
  }, (error) => Promise.reject(error));
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Routes/>
        </Switch>
      </BrowserRouter>
    </>
  );
};
