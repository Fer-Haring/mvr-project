import {
  AboutUsPage,
  AdminDashboardPage,
  ContactPage,
  EditPendingOrdersPage,
  HomePage,
  ProductDetailPage,
  ProductsPage,
  ProfilePage,
} from '@webapp/pages';
import AdminAddProductPage from '@webapp/pages/admin/add-new-product';
import OrderManagementPage from '@webapp/pages/admin/order-management';
import UserListPage from '@webapp/pages/admin/user-list';
import ForgotPasswordPage2 from '@webapp/pages/auth/forgot-password';
import ForgotPasswordNewPassword from '@webapp/pages/auth/forgot-password-new-password';
import ForgotPasswordVerifyPage2 from '@webapp/pages/auth/forgot-password-verify';
import GoogleAuthCallback from '@webapp/pages/auth/google_auth';
import SetPasswrodPage from '@webapp/pages/auth/set-password';
// Auth pages
import SignInPage2 from '@webapp/pages/auth/sign-in';
import SignUpPage2 from '@webapp/pages/auth/sign-up';
import VerificationCodePage from '@webapp/pages/auth/verification-code';
import { CartPage } from '@webapp/pages/cart';
import PrivacyPolicyPage from '@webapp/pages/privacy_policies';
// import UnderConstructionPage from '@webapp/pages/under-construction';
import React from 'react';
import { Navigate } from 'react-router-dom';
import StatisticsPage from '@webapp/pages/admin/statistics-page';

interface Route {
  path: string;
  component: React.ReactNode;
}

const ProjectRoutes: Route[] = [
  {
    path: '/home',
    component: <HomePage />,
  },
  {
    path: '/',
    component: <Navigate to="/sign-in" />,
  },
  // {
  //   path: '/under-construction',
  //   component: <UnderConstructionPage />,
  // },
  {
    path: '/sign-in',
    component: <SignInPage2 />,
  },
  {
    path: '/sign-up',
    component: <SignUpPage2 />,
  },
  {
    path: '/forgot-password',
    component: <ForgotPasswordPage2 />,
  },
  {
    path: '/forgot-password/verify',
    component: <ForgotPasswordVerifyPage2 />,
  },
  {
    path: '/verification-code',
    component: <VerificationCodePage />,
  },
  {
    path: '/forgot-password/new-password',
    component: <ForgotPasswordNewPassword />,
  },
  {
    path: '/sobre-nosotros',
    component: <AboutUsPage />,
  },
  {
    path: '/contacto',
    component: <ContactPage />,
  },
  {
    path: '/productos',
    component: <ProductsPage />,
  },
  {
    path: '/profile',
    component: <ProfilePage />,
  },
  {
    path: '/productos/:id?',
    component: <ProductDetailPage />,
  },
  {
    path: '/cart',
    component: <CartPage />,
  },
  {
    path: '/privacy-policy',
    component: <PrivacyPolicyPage />,
  },
  {
    path: '/google-auth-callback',
    component: <GoogleAuthCallback />,
  },
  {
    path: '/set-password',
    component: <SetPasswrodPage />,
  },
  //ADMIN ROUTES
  {
    path: '/admin-dashboard',
    component: <AdminDashboardPage />,
  },
  {
    path: '/admin-dashboard/add-new-product',
    component: <AdminAddProductPage />,
  },
  {
    path: '/admin-dashboard/lista-de-usuarios',
    component: <UserListPage />,
  },
  {
    path: '/admin-dashboard/estadisticas',
    component: <StatisticsPage />,
  },
  {
    path: '/admin-dashboard/pedidos-pendientes',
    component: <OrderManagementPage />,
  },
  {
    path: '/admin-dashboard/pedidos-pendientes/:id?',
    component: <EditPendingOrdersPage />,
  },
];
export { ProjectRoutes };
