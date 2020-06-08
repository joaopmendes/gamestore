import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AdminRoute = ({ Component, ...rest }: {Component: React.FC}) => {
  const auth = useSelector((state: any) => state.auth);
  return (
    <Route
      {...rest}
      render={(props: any) =>
        auth.userLoggedIn && auth.user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
const AdminRoutes = () => {
  return (
    <>
      {/*<AdminRoute path="/admin/dashboard" Components={DashboardPage} />*/}
    </>
  );
};

export default AdminRoutes;
