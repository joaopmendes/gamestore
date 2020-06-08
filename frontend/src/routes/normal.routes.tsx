import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../create-store.config';
import Home from '../Pages/Home';
import Register from '../Pages/Register/Register';

const OnlyNotLoginRoute = ({ Component, ...rest }: any) => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.userLoggedIn ? <Component {...props as any} /> : <Redirect to="/" />}
    />
  );
};
const OnlyLoginRoute = ({ Component, ...rest }: { Component: React.FC}) => {
  const auth = useSelector((state: any) => state.auth);
  if (!auth.userLoggedIn) {
    return <Route {...rest} render={() => <Redirect to="/" />} />;
  }
  return <Route {...rest} render={(props) => <Component {...props as any} />} />;
};
const NormalRoutes = () => (
  <>
    <Route path={'/'} exact render={() => <Home />} />
     <Route path="/register" render={() => <Register />} />
    {/* <OnlyLoginRoute path="/manage" Components={RegisterPage} /> */}
  </>
);
export default NormalRoutes;
