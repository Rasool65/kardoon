import { Fragment, FunctionComponent, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from '../configs/routerConfig/RouterList';
import RouteType from '../configs/routerConfig/RouteType';
import PrivateRoute from './PrivateRoute';
import { URL_LOGIN, URL_MAIN } from '@src/configs/urls';
import { useSelector } from 'react-redux';
import Layout from '../layout';
import { RootStateType } from '@src/redux/Store';

const Routers: FunctionComponent = () => {

  const authenticationStore = useSelector((state: RootStateType) => state.authentication);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          return route.type == RouteType.private ? 
          //* Private Route
          (
            <Route key={index} path={route.path} element={
            <PrivateRoute />
            }>
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout {...route.props}>
                    <route.component name={route.name} />
                  </Layout>
                }
              />
             </Route>
          ): (
            //* Public Route
            <Route
              key={index}
              path={route.path}
              element={
                authenticationStore.isAuthenticate && route.path == URL_MAIN ? (
                  <Navigate to={URL_MAIN} />
                ) : route.path == URL_LOGIN ? (
                  <Layout>
                    <route.component name={route.name} {...route.props} />
                  </Layout>
                ) : (
                  // todo for other layout use it
                  <Layout>
                    <route.component name={route.name} {...route.props} />
                   </Layout> 
                )
              }
            />
          );;
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
