import { Badge, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import cartAnimation from '@webapp/assets/images/animations/cart.json';
import DrawerNavbar from '@webapp/controller/drawer-navbar';
import { useCart } from '@webapp/hooks/cartHooks/useGetCart';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useGetUserById } from '@webapp/hooks/userHooks/userHooks';
// import { useGetUserByIdMutation } from '@webapp/services/mutations/auth/get-user-by-id-mutation';
// import { useGetUserCart } from '@webapp/services/mutations/cart/get-cart-query';
import { User } from '@webapp/services/types/user-types';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent, useEffect } from 'react';
import { useIntl } from 'react-intl';
import Lottie from 'react-lottie';
import { useLocation, useNavigate } from 'react-router-dom';

import Avatar from '../avatar';
import { NAVBAR_HEIGHT } from '../sidebar';
import { useAppSelector } from '@webapp/hooks/redux-hooks';

interface NavbarProps {
  className?: string;
}

/**
 * Navbar component displaying organization and venue selection with user avatar.
 *
 * @param {NavbarProps} props - The props for the Navbar component.
 * @returns {React.ReactElement} - A React element representing the navbar.
 */
const Navbar: FunctionComponent<NavbarProps> = ({ className }) => {
  const { formatMessage } = useIntl();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUserData();
  const userId = useAppSelector((state) => state.user.signIn.userInfo?.user_id);
  const { user: userData, fetchUserById } = useGetUserById(userId ?? '');
  const [paused, setPaused] = React.useState(true);

  const { cartItems } = useCart();

  useEffect(() => {
    fetchUserById();
    if (userData) {
      setUser(userData as User);
    }
  }, []);

  const handlePause = () => {
    setPaused(!paused);
    navigate('/cart');
  };

  useEffect(() => {
    cartItems?.length;
  }, [cartItems]);

  return (
    <NavbarContainer className={className || ''} isMobile={isMobile}>
      {isMobile && (
        <div className="right">
          <DrawerNavbar />
        </div>
      )}
      <div className="right">
        <div className="forms">
          <Box onClick={handlePause}>
            <Badge badgeContent={cartItems?.length} color="error">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: cartAnimation,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                  },
                }}
                isClickToPauseDisabled={true}
                isPaused={paused}
                height={40}
                width={40}
              />
            </Badge>
          </Box>
        </div>
        <Avatar
          fullName={user?.name + ' ' + user?.last_name}
          aria-label={formatMessage({ id: 'NAVBAR.USER_AVATAR.ARIA_LABEL' }, { user: 'Lautaro Tolosa' })}
          active={location.pathname.startsWith('/profile')}
          imageSrc={user?.profile_picture}
        />
      </div>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled('nav')<{
  isMobile: boolean;
}>(({ theme, isMobile }) => ({
  height: NAVBAR_HEIGHT,
  width: '100%',
  background: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  display: 'flex',
  justifyContent: isMobile ? 'space-between' : 'flex-end',
  alignItems: 'center',
  padding: theme.spacing(0.5, 2),
  '.left': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: theme.spacing(3),
  },
  '.right': {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: theme.spacing(3),
    '.forms': {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: theme.spacing(3),
      '.MuiFormControl-root': {
        width: 260,
      },
    },
  },
}));
