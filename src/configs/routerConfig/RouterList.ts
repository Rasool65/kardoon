import IRoute from './IRoute';
import RouteType from './RouteType';
import { URL_MAIN, URL_LOGIN } from '../urls';

import Home from '@src/pages/home/Home';
import Login from '@src/pages/authentication/Login';
import { URL_HOME } from './../urls';
import Main from '@src/pages/main/Home';

const routes: IRoute[] = [
  {
    path: URL_LOGIN,
    component: Login,
    type: RouteType.public,
    props: {
      title: 'Goldiran Kardoon Login',
    },
  },
  {
    path: URL_HOME,
    component: Main,
    type: RouteType.public,
    props: {
      title: 'home',
    },
  },
];

export default routes;
