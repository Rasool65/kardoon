import {
  URL_MAIN,
  URL_LOGIN,
  URL_USER_PROFILE,
  URL_CATEGORIES,
  URL_PRODUCTS,
  URL_CITY,
  URL_REQUEST_DETAIL,
  URL_MY_ORDERS,
  URL_ORDER_DETAIL,
  URL_TECHNICIAN_PROFILE,
  URL_TECHNICIAN_MISSION,
  URL_TECHNICIAN_MISSION_DETAIL,
  URL_TECHNICIAN_MISSION_DETAIL_ACTION,
} from './../urls';

import IRoute from './IRoute';
import RouteType from './RouteType';
import Login from '@src/pages/authentication/Login';
import Profile from '@src/pages/profile';
import test from '@src/pages/test';
import Category from '@src/pages/category';
import Products from '@src/pages/products';
import Main from '@src/pages/main';
import City from '@src/pages/city';
import Order from '@src/pages/order';
import RequestDetail from '@src/pages/requestDetail';
import OrderDetail from '@src/pages/orderDetail';
import TechnicianProfile from '@src/pages/technicianProfile';
import TechnicianMission from '@src/pages/technicianMissions';
import technicianMissionDetail from '@src/pages/technicianMissionDetail';
import Action from '@src/pages/technicianMissionDetail/technicianAction';

const routes: IRoute[] = [
  {
    path: URL_MAIN,
    component: Main,
    type: RouteType.all,
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
    type: RouteType.all,
    props: {
      title: 'دسته بندی ها',
    },
  },
  {
    path: URL_PRODUCTS,
    component: Products,
    type: RouteType.all,
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
    type: RouteType.public,
    props: {
      title: 'انتخاب شهر',
    },
  },
  {
    path: URL_MY_ORDERS,
    component: Order,
    type: RouteType.private,
    props: {
      title: 'سفارشات من',
    },
  },
  {
    path: URL_REQUEST_DETAIL,
    component: RequestDetail,
    type: RouteType.private,
    props: {
      title: 'جزئیات درخواست',
    },
  },
  {
    path: URL_ORDER_DETAIL,
    component: OrderDetail,
    type: RouteType.private,
    props: {
      title: 'جرئیات بیشتر سفارش',
    },
  },
  {
    path: URL_TECHNICIAN_PROFILE,
    component: TechnicianProfile,
    type: RouteType.private,
    props: {
      title: 'پروفایل متخصص',
    },
  },
  {
    path: URL_TECHNICIAN_MISSION,
    component: TechnicianMission,
    type: RouteType.private,
    props: {
      title: 'لیست ماموریت های متخصص',
    },
  },
  {
    path: URL_TECHNICIAN_MISSION_DETAIL,
    component: technicianMissionDetail,
    type: RouteType.private,
    props: {
      title: 'جزییات ماموریت های متخصص',
    },
  },
  {
    path: URL_TECHNICIAN_MISSION_DETAIL_ACTION,
    component: Action,
    type: RouteType.private,
    props: {
      title: 'اکشن روی ماموریت',
    },
  },
];

export default routes;
