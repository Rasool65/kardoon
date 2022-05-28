// import navigation from '@src/navigation/vertical';
import { Fragment, FunctionComponent, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from '../configs/routerConfig/RouterList';
// import RouteType from '../configs/routerConfig/RouteType';
import PrivateRoute from './PrivateRoute';
// import LayoutWrapper from '@src/layouts/components/layout-wrapper';
// import { useLayout } from '@src/hooks/useLayout';
// import { useRouterTransition } from '@src/hooks/useRouterTransition';
// import { URL_DASHBOARD, URL_LOGIN, URL_MAIN } from '@src/configs/urls';
import { useSelector } from 'react-redux';
import Layout from '../layout';

const Routers: FunctionComponent = () => {
  // const { layout, setLayout } = useLayout();
  // const { transition, setTransition } = useRouterTransition();
  // const authenticationStore = useSelector((state: RootStateType) => state.authentication);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={<PrivateRoute />}>
              <Route
                key={index}
                path={route.path}
                element={
                  // <>
                  //   <LazyVerticalLayout
                  //     layout='VerticalLayout'
                  //     transition={transition}
                  //     setTransition={setTransition}
                  //     setLayout={setLayout}
                  //     menuData={navigation}
                  //   >
                  //     <LayoutWrapper
                  //       layout='VerticalLayout'
                  //       transition={transition}
                  //       setTransition={setTransition}
                  //     >
                  <Layout {...route.props}>
                    <route.component name={route.name} />
                  </Layout>
                  //   </LayoutWrapper>
                  // </LazyVerticalLayout>
                  // </>
                }
              />
            </Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
