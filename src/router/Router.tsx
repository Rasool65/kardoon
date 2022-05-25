import { Fragment, FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from '../configs/routerConfig/RouterList';
import RouteType from '../configs/routerConfig/RouteType';
import PrivateRoute from './PrivateRoute';
import Home from '@src/pages/home/Home';

const Routers: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          return route.type == RouteType.private ? (
            <Route key={index} path={route.path} element={<PrivateRoute />}>
              <Route
                path={route.path}
                element={
                  <>
                    <Home title={'salam'} />
                  </>
                }
              />
            </Route>
          ) : (
            <Route
              key={index}
              path={route.path}
              element={
                <Fragment>
                  <route.component name={route.name} {...route.props} />
                </Fragment>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
