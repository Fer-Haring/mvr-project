import { Badge, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import cartAnimation from '@webapp/assets/images/animations/cart.json';
import { useGetUserCart } from '@webapp/sdk/mutations/cart/get-cart-query';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent } from 'react';
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
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserData();
  const [paused, setPaused] = React.useState(true);

  const { data: cartData } = useGetUserCart();

  const handlePause = () => {
    setPaused(!paused);
    navigate('/cart');
  };

  return (
    <NavbarContainer className={className || ''}>
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

const NavbarContainer = styled('nav')(({ theme }) => ({
  height: NAVBAR_HEIGHT,
  width: '100%',
  background: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: theme.spacing(0.5, 2),
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
