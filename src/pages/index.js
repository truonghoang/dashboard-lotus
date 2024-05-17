import { lazy } from 'react';
import Loadable from '@/components/loader/Loadable';
const HomePage = Loadable(lazy(() => import('./Home')));
const LoginPage = Loadable(lazy(()=>import('./Login')))
const UserPage = Loadable(lazy(()=>import('./User')))
const ReportFormPage = Loadable(lazy(()=>import('./Report')))
export {

  HomePage, LoginPage,UserPage,ReportFormPage

};
