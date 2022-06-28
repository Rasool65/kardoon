import { URL_MAIN, URL_LOGIN, URL_USER_PROFILE, URL_CATEGORIES, URL_PRODUCTS, URL_CITY, URL_ORDER_DETAIL } from './../urls';
import IRoute from './IRoute';
import RouteType from './RouteType';
import Login from '@src/pages/authentication/Login';
import Profile from '@src/pages/profile';
import test from '@src/pages/test';
import Category from '@src/pages/category';
import Products from '@src/pages/products';
import Main from '@src/pages/main';
import City from '@src/pages/city';
import OrderDetail from '@src/pages/orderDetail';

const routes: IRoute[] = [
  {
    path: '/',
    component: Main,
    type: RouteType.private,
    props: {
      title: 'صفحه اصلی',
    },
  },
  {
    path: URL_LOGIN,
    component: Login,
    type: RouteType.public,
    props: {
      title: 'صفحه ورود',
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
    type: RouteType.private,
    props: {
      title: 'دسته بندی ها',
    },
  },
  {
    path: URL_PRODUCTS,
    component: Products,
    type: RouteType.private,
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
  {
    path: URL_CITY,
    component: City,
    type: RouteType.private,
    props: {
      title: 'انتخاب شهر',
    },
  },
  {
    path: URL_ORDER_DETAIL,
    component: OrderDetail,
    type: RouteType.private,
    props: {
      title: 'حزییات سفارش اولیه',
    },
  },
];

export default routes;
