import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isUserAdmin } from '../Store/authSlice';
import Dashboard from '../Backoffice/Pages/Dashboard/Dashboard';
import Categories from '../Backoffice/Pages/Categories/Categories';
import { RootState } from '../create-store.config';
import Products from '../Backoffice/Pages/Products/Products';

const AdminRoute = ({ Component, ...rest }: any) => {
  const admin = useSelector((state: RootState) => state.auth.user.admin);
  return (
    <Route
      {...rest}
      render={(props) =>
        admin ? <Component {...props as any} /> : <Redirect to="/" />}
    />
  );
};
const AdminRoutes = () => {
  return (
    <>
      {/*<AdminRoute path="/admin/dashboard" Components={DashboardPage} />*/}
      <AdminRoute path={'/backoffice'} exact Component={Dashboard} />
      <AdminRoute path={'/backoffice/categories'} Component={Categories} />
      <AdminRoute path={'/backoffice/products'} Component={Products} />
    </>
  );
};

export default AdminRoutes;
