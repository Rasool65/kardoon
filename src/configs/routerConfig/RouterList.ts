import { URL_MAIN, URL_LOGIN, URL_USER_PROFILE, URL_CATEGORIES, URL_PRODUCTS, URL_CITY, URL_HOME } from './../urls';
import IRoute from './IRoute';
import RouteType from './RouteType';

import Login from '@src/pages/authentication/Login';
import Profile from '@src/pages/profile';
import test from '@src/pages/test';
import Category from '@src/pages/category';
import Products from '@src/pages/products';
import MainPage from '@src/pages/main';
import Home from '@src/pages/main/Home';

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
    path: URL_HOME,
    component: Home,
    type: RouteType.public,
    props: {
      title: 'خانه',
    },
  },
  {
    path: URL_USER_PROFILE,
    component: Profile,
    type: RouteType.private,
    props: {
      title: 'حساب کاربری',
    },
  },
  {
    path: URL_CATEGORIES,
    component: Category,
    type: RouteType.public,
    props: {
      title: 'دسته بندی ها',
    },
  },
  {
    path: URL_PRODUCTS,
    component: Products,
    type: RouteType.public,
    props: {
      title: 'محصولات',
    },
  },
  {
    path: '/test',
    component: test,
    type: RouteType.public,
    props: {
      title: 'test',
    },
  },
  // {
  //   path: URL_CITY,
  //   component: SelectCity,
  //   type: RouteType.public,
  //   props: {
  //     title: 'انتخاب شهر',
  //   },
  // },
  {
    path: '/main',
    component: MainPage,
    type: RouteType.public,
    props: {
      title: 'صفحه اصلی',
    },
  },
];

export default routes;
