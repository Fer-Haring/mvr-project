import { Badge, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import cartAnimation from '@webapp/assets/images/animations/cart.json';
import DrawerNavbar from '@webapp/controller/drawer-navbar';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useGetUserByIdMutation } from '@webapp/sdk/mutations/auth/get-user-by-id-mutation';
import { useGetUserCart } from '@webapp/sdk/mutations/cart/get-cart-query';
import { User } from '@webapp/sdk/types/user-types';
import { useUserStore } from '@webapp/store/auth/session';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent, useEffect } from 'react';
import { useIntl } from 'react-intl';
import Lottie from 'react-lottie';
import { useLocation, useNavigate } from 'react-router-dom';

import Avatar from '../avatar';
import { NAVBAR_HEIGHT } from '../sidebar';

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
  const userData = useGetUserByIdMutation(useUserStore((state) => state.userInfo?.userId) ?? '');
  const [paused, setPaused] = React.useState(true);

  console.log(userData);

  const { data: cartData } = useGetUserCart();

  useEffect(() => {
    if (userData) {
      setUser(userData.data as User);
    }
  }, [userData.data]);

  const handlePause = () => {
    setPaused(!paused);
    navigate('/cart');
  };

  useEffect(() => {
    cartData?.length;
  }, [cartData]);

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
            <Badge badgeContent={cartData?.length} color="error">
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
