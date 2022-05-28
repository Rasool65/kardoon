import { URL_MAIN, URL_LOGIN } from './../urls';
import IRoute from './IRoute';
import RouteType from './RouteType';
// import Contact from '../../views/contact/Contact';
import Home from '../../pages/home/Home';
// import Dashboard from '@src/pages/dashboard/Dashboard';
// import LoginLayout from '@src/pages/authentication/LoginLayout';
// import History from '@src/pages/aboutUs/History';
// import Profile from '@src/pages/profile/Profile';

// import AppChat from '@src/pages/chat';
// import Request from '@src/pages/requisition';

const routes: IRoute[] = [
  {
    path: URL_MAIN,
    component: Home,
    type: RouteType.public,
    props: {
      title: 'Home',
    },
  },
];

export default routes;
