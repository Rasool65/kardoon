import { URL_MAIN, URL_LOGIN, URL_USER_PROFILE } from './../urls';
import IRoute from './IRoute';
import RouteType from './RouteType';
import Login from '@src/pages/authentication/Login';
import Profile from '@src/pages/profile';
import Home from '@src/pages/home/Home';

const routes: IRoute[] = [
  // {
  //   path: URL_MAIN,
  //   component: Home,
  //   type: RouteType.public,
  //   props: {
  //     title: 'Home',
  //   },
  // },
  {
    path: URL_LOGIN,
    component: Login,
    type: RouteType.public,
    props: {
      title: 'login',
    },
  },
  {
    path: '/home',
    component: Home,
    type: RouteType.public,
    props: {
      title: 'خانه',
    },
  },
  {
    path: URL_USER_PROFILE,
    component: Profile,
    type: RouteType.public,
    props: {
      title: 'حساب کاربری',
    },
  },
];

export default routes;
