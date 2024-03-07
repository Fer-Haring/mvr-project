import { FunctionComponent } from 'react';

import AuthLayout, { AuthLayoutProps } from '../auth-layout';
import HalfAndHalf, { HalfAndHalfProps } from '../half-and-half';

interface AuthLayoutContainerHalfProps extends HalfAndHalfProps {
  className?: string;
  variant: 'half';
}

interface AuthLayoutContainerCenteredProps extends AuthLayoutProps {
  className?: string;
  variant: 'centered';
}

type AuthLayoutContainerProps = AuthLayoutContainerHalfProps | AuthLayoutContainerCenteredProps;

const AuthLayoutContainer: FunctionComponent<AuthLayoutContainerProps> = ({ variant, className, ...restProps }) => {
  switch (variant) {
    case 'half':
      return <HalfAndHalf {...(restProps as HalfAndHalfProps)} className={className} />;
    case 'centered':
      return <AuthLayout {...(restProps as AuthLayoutProps)} className={className} />;
    default:
      return <div>Invalid variant</div>;
  }
};

export default AuthLayoutContainer;
