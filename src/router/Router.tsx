import { Fragment, FunctionComponent, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from '../configs/routerConfig/RouterList';
import RouteType from '../configs/routerConfig/RouteType';
import PrivateRoute from './PrivateRoute';
import { URL_LOGIN, URL_MAIN } from '@src/configs/urls';
import { useSelector } from 'react-redux';
import { RootStateType } from '@src/redux/Store';
import PrivateLayout from '@src/layout/PrivateLayout';
import PublicLayout from '@src/layout/publicLayout';

const Routers: FunctionComponent = () => {
  const authenticationStore = useSelector((state: RootStateType) => state.authentication);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          return route.type == RouteType.private ? (
            //* Private Route
            <Route key={index} path={route.path} element={<PrivateRoute />}>
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateLayout {...route.props}>
                    <route.component name={route.name} />
                  </PrivateLayout>
                }
              />
            </Route>
          ) : (
            //* Public Route
            <Route
              key={index}
              path={route.path}
              element={
                authenticationStore.isAuthenticate && route.path == URL_MAIN ? (
                  <Navigate to={URL_MAIN} />
                ) : route.path == URL_LOGIN ? (
                  <PrivateLayout>
                    <route.component name={route.name} {...route.props} />
                  </PrivateLayout>
                ) : (
                  // <PublicLayout>
                  <route.component name={route.name} {...route.props} />
                  // </PublicLayout>
                )
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
