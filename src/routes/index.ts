import { lazy } from 'react';

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const AccountManagement = lazy(() => import('../pages/AccountManagement'));
const Home = lazy(() => import('../pages/Home'));
const OrderManagement = lazy(() => import('../pages/OrderManagement'));
const ProductsManagement = lazy(() => import('../pages/ProductsManagement'));
const DeliveryManagement = lazy(() => import('../pages/DeliveryManagement'));
const RevenueStatistics = lazy(() => import('../pages/RevenueStatistics'));
const UserInformation = lazy(() => import('../pages/UserInformation'));

export const adminAuthRoutes = [
  {
    path: 'login',
    Component: Login,
  },
  {
    path: 'register',
    Component: Register,
  },
];

export const adminAppRoutes = [
  {
    path: 'accounts',
    Component: AccountManagement,
  },
  {
    path: 'home',
    Component: Home,
  },
  {
    path: 'orders',
    Component: OrderManagement,
  },
  {
    path: 'products',
    Component: ProductsManagement,
  },
  {
    path: 'statistical',
    Component: RevenueStatistics,
  },
  {
    path: 'user-info',
    Component: UserInformation,
  },
];

export const shipperAuthRoutes = [
  {
    path: 'login',
    Component: Login,
  },
];
export const shipperAppRoutes = [
  {
    path: 'delivery',
    Component: DeliveryManagement,
  },
];
