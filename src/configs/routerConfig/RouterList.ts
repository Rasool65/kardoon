import { URL_MAIN, URL_LOGIN } from './../urls';
import IRoute from './IRoute';
import RouteType from './RouteType';
import Home from '../../pages/home/Home';
// import LoginLayout from '@src/pages/authentication/LoginLayout';
// import History from '@src/pages/aboutUs/History';
// import Profile from '@src/pages/profile/Profile';

// import AppChat from '@src/pages/chat';
// import Request from '@src/pages/requisition';
import Login from './../../pages/authentication/Login';
import Home2 from '@src/pages/home/Home2';

const routes: IRoute[] = [
  {
    path: URL_MAIN,
    component: Home,
    type: RouteType.public,
    props: {
      title: 'Home',
    },
  },
  {
    path: URL_LOGIN,
    component: Login,
    type: RouteType.public,
    props: {
      title: 'login',
    },
  },
  {
    path: '/home2',
    component: Home2,
    type: RouteType.public,
    props: {
      title: 'home 2',
    },
  },
];

export default routes;
