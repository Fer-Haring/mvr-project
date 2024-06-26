import {
  AboutUsPage,
  AdminDashboardPage,
  ContactPage,
  HomePage,
  ProductDetailPage,
  ProductsPage,
  ProfilePage,
} from '@webapp/pages';
import ForgotPasswordPage2 from '@webapp/pages/auth/forgot-password';
import ForgotPasswordVerifyPage2 from '@webapp/pages/auth/forgot-password-verify';
// Auth pages
import SignInPage2 from '@webapp/pages/auth/sign-in';
import SignUpPage2 from '@webapp/pages/auth/sign-up';
import VerificationCodePage2 from '@webapp/pages/auth/verification-code';
import { CartPage } from '@webapp/pages/cart';
import UnderConstructionPage from '@webapp/pages/under-construction';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface Route {
  path: string;
  component: React.ReactNode;
}

const ProjectRoutes: Route[] = [
  {
    path: '/home',
    component: <HomePage />,
  },
  // {
  //   path: '/',
  //   component: <Navigate to="/sign-in" />,
  // },
  {
    path: '/',
    component: <Navigate to="/under-construction" />,
  },
  {
    path: '/under-construction',
    component: <UnderConstructionPage />,
  },
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
    component: <VerificationCodePage2 />,
  },
  {
    path: '/sobre-nosotros',
    component: <AboutUsPage />,
  },
  {
    path: '/admin-dashboard',
    component: <AdminDashboardPage />,
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
];
export { ProjectRoutes };
