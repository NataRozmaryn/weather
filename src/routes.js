// import { lazy } from 'react';
import DetailWeather from './components/DetailWeather/DetailWeather';

const route = [
//   {
//     path: '/',
//     label: 'Home',
//     isExact: true,
//     isInMenu: true,
//     needsAuth: false,
//     component: Home,
//   },
  {
    path: '/users/:city',
    label: 'User Posts',
    isExact: true,
    isInMenu: false,
    needsAuth: true,
    component: DetailWeather,
  }
];

export default route;