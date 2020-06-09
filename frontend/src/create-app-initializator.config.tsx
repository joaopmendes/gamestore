import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { authSlice, getUserToken } from './Store/authSlice';
import { useAppDispatch } from './create-store.config';
import { loadersSlice } from './Store/loadersSlice';
import UserService from './Services/UserService';
import jwtDecode from 'jwt-decode';
import CategoryService from './Services/CategoryService';
import { useToasts } from 'react-toast-notifications';
import { categoriesSlice } from './Store/categoriesSlice';
import ProductService from './Services/ProductService';
import { productSlice } from './Store/productSlice';


export const AppInitializator: FC<PropsWithChildren<null>> = ({children}) => {
  const userToken = useSelector(getUserToken);
  const dispatch = useAppDispatch();
  const {addToast} = useToasts();
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      // eslint-disable-next-line no-param-reassign
      if (userToken && !config.headers.authorization) {
        config.headers.authorization = `Bearer ` + userToken;
      }
      return config;
    }, (error) => Promise.reject(error));
    //eslint-disable-next-line
  },[userToken]);

  //! If user already has a token, fetch the user data
  useEffect(() => {
    (async () => {
      //! Deal with storage token
      dispatch(loadersSlice.actions.addLoader('APP_INITIALIZATOR'));

      const token = localStorage.getItem('token');
      if(token && !userToken) {
        if ((jwtDecode(token) as any)?.exp < Date.now() / 1000) {
          localStorage.removeItem('token');
          return;
        }
        const response = await UserService.getUserInfo(token);
        if(response.hasError) {
          localStorage.removeItem('token');
          dispatch(loadersSlice.actions.removeLoader('APP_INITIALIZATOR'));

          return;
        }
        dispatch(authSlice.actions.login(response.data.user));
      }

      //! Fetch Products
      const categoriesResult = await CategoryService.getCategories();
      if(categoriesResult.hasError) {
        handleError();
        return;
      }
      dispatch(categoriesSlice.actions.setCategoriesTo(categoriesResult.data.categories));
      //! Fetch Products
      const productResult = await ProductService.getListOfProducts();
      if(productResult.hasError) {
        handleError();
        return;
      }
      dispatch(productSlice.actions.setProductsTo(productResult.data.products));


      dispatch(loadersSlice.actions.removeLoader('APP_INITIALIZATOR'));

    })();
    //eslint-disable-next-line
  }, []);
  const handleError = () => {
    dispatch(loadersSlice.actions.removeLoader('APP_INITIALIZATOR'));
    addToast('Something went wrong trying to load the page, please refresh.', {appearance: 'error'});
  };
  return (
    <>
      {children}
    </>
  );
};
