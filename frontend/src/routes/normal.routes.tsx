import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../Pages/Home';
import Register from '../Pages/Register/Register';
import Login from '../Pages/Login/Login';
import { isUserLoggedIn } from '../Store/authSlice';

const OnlyNotLoginRoute = ({ Component, ...rest }: any) => {
  const isUserLogged = useSelector(isUserLoggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isUserLogged ? <Component {...props as any} /> : <Redirect to="/" />}
    />
  );
};
const OnlyLoginRoute = ({ Component, ...rest }: { Component: React.FC}) => {
  const isUserLogged = useSelector(isUserLoggedIn);
  if (!isUserLogged) {
    return <Route {...rest} render={() => <Redirect to="/" />} />;
  }
  return <Route {...rest} render={(props) => <Component {...props as any} />} />;
};
const NormalRoutes = () => {
  return (
    <>
      <Route path={'/'} exact render={() => <Home/>}/>
      <OnlyNotLoginRoute path="/register" Component={Register}/>
      <OnlyNotLoginRoute path="/Login" Component={Login}/>
      {/* <OnlyLoginRoute path="/manage" Components={RegisterPage} /> */}
    </>
  );
};
export default NormalRoutes;
