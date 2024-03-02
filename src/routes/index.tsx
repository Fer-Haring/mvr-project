import { MobileAdminDashboardPage } from '@webapp/mobile/pages/admin';
import MobileProductAdminDetail from '@webapp/mobile/pages/admin/product-admin-detail';
import MobileSignInPage from '@webapp/mobile/pages/auth/sign-in';
import MobileSignUpPage from '@webapp/mobile/pages/auth/sign-up';
import { MobileCartPage } from '@webapp/mobile/pages/cart';
import { MobileContactPage } from '@webapp/mobile/pages/contact';
import { MobileHomePage } from '@webapp/mobile/pages/home';
import { MobileProductsPage } from '@webapp/mobile/pages/products';
import { MobileProductDetailPage } from '@webapp/mobile/pages/products/detail';
import { MobileProfilePage } from '@webapp/mobile/pages/profile';
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
  {
    path: '/',
    component: <Navigate to="/sign-in" />,
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

const MobileRoutes: Route[] = [
  {
    path: '/home',
    component: <MobileHomePage />,
  },
  {
    path: '/',
    component: <Navigate to="/sign-in" />,
  },
  {
    path: '/sign-in',
    component: <MobileSignInPage />,
  },
  {
    path: '/sign-up',
    component: <MobileSignUpPage />,
  },
  {
    path: '/sobre-nosotros',
    component: <AboutUsPage />,
  },
  {
    path: '/admin-dashboard',
    component: <MobileAdminDashboardPage />,
  },
  {
    path: '/admin-dashboard/product/:id?',
    component: <MobileProductAdminDetail />,
  },
  {
    path: 'nuevo-producto',
    component: <MobileProductAdminDetail />,
  },
  {
    path: '/contacto',
    component: <MobileContactPage />,
  },
  {
    path: '/productos',
    component: <MobileProductsPage />,
  },
  {
    path: '/profile',
    component: <MobileProfilePage />,
  },
  {
    path: '/productos/:id?',
    component: <MobileProductDetailPage />,
  },
  {
    path: '/cart',
    component: <MobileCartPage />,
  },
];

export { MobileRoutes, ProjectRoutes };
