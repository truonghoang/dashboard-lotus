import { lazy } from 'react';
import Loadable from '@/components/loader/Loadable';
const HomePage = Loadable(lazy(() => import('./Home')));
const LoginPage = Loadable(lazy(()=>import('./Login')))
const UserPage = Loadable(lazy(()=>import('./User')))
const UserBanPage = Loadable(lazy(()=>import('./UserBanned')))
export {

  HomePage, LoginPage,UserPage,UserBanPage

};
