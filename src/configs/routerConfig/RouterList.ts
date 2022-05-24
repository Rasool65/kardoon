import IRoute from './IRoute';
import RouteType from './RouteType';
import { URL_MAIN, URL_LOGIN } from '../urls';

import Home from '@src/pages/home/Home';
import Login from '@src/pages/authentication/Login';

const routes: IRoute[] = [
  {
    path: URL_LOGIN,
    component: Login,
    type: RouteType.public,
    props: {
      title: 'Goldiran Kardoon Login',
    },
  },
];

export default routes;
