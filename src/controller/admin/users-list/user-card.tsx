import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { SxProps, Theme, styled, useTheme } from '@mui/material/styles';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useAddFavorite } from '@webapp/sdk/mutations/auth/add-to-favorites-mutation';
import { useGetUserByIdMutation } from '@webapp/sdk/mutations/auth/get-user-by-id-mutation';
import { useRemoveFavorite } from '@webapp/sdk/mutations/auth/remove-from-favorites-mutation';
import { Product } from '@webapp/sdk/types/products-types';
import { User } from '@webapp/sdk/types/user-types';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent, useMemo } from 'react';
import { useIntl } from 'react-intl';

const Wrapper = styled(Paper)<{}>(({ theme }) => ({
  padding: theme.spacing(0),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  border: 0,
  width: '100%',
  backgroundColor: 'rgba(230, 235, 241, 0.9)',
  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.02)',
    transition: 'transform 0.5s',
    boxShadow: '10px 10px 20px 4px rgba(48,111,183,0.9)',
  },
}));

interface UserCardProps {
  className?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  user: User;
}

const UserCard: FunctionComponent<UserCardProps> = ({ className, sx, onClick, user }) => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { formatMessage } = useIntl();

  return (
    <Wrapper className={className || ''} sx={{ ...sx }} role="region" key={user.id} onClick={onClick}>
      {user.profile_picture && user.profile_picture !== '' && (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.common.white,
            borderBottomLeftRadius: 16,
            borderTopLeftRadius: 16,
          }}
        >
          <img
            src={user.profile_picture}
            alt="Product"
            style={{
              width: isMobile ? '30vw' : '11vw',
              height: 'auto',
              aspectRatio: '1/1',
              borderRadius: 16,
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
            }}
          />
        </Box>
      )}

      {user.profile_picture === '' && (
        <Box
          sx={{
            width: '50%',
            height: 'auto',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 16,
            borderTopLeftRadius: 16,
            mt: theme.spacing(2),
            gap: theme.spacing(2),
          }}
        >
          <CameraAltRoundedIcon
            sx={{
              fontSize: isMobile ? 60 : 100,
              color: theme.palette.grey[500],
            }}
          />
          <Typography
            sx={{
              textAlign: 'center',
              color: theme.palette.grey[500],
              fontWeight: 'bold',
              fontSize: isMobile ? 16 : 24,
            }}
            variant="h6"
          >
            {formatMessage({ id: 'PRODUCT.CARD.PRODUCTS.NO_IMAGE' })}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          padding: theme.spacing(1),
          width: '100%',
          height: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <Typography
            sx={{
              textAlign: 'left',
              color: theme.palette.grey[800],
              fontWeight: 'bold',
              fontSize: isMobile ? '4vw' : '1.2vw',
            }}
            variant="h6"
          >
            {user.name} {user.last_name}
          </Typography>
          <Typography
            sx={{
              textAlign: 'left',
              color: theme.palette.grey[800],
              whiteSpace: 'pre-line',
              fontSize: isMobile ? '3vw' : '0.8vw',
            }}
            variant="body1"
          >
            <strong>{formatMessage({ id: 'ADMIN.USERS.LIST.PAGE.USER.EMAIL' })}</strong>
            {user.email}
          </Typography>
          <Typography
            sx={{
              textAlign: 'left',
              color: theme.palette.grey[800],
              whiteSpace: 'pre-line',
              fontSize: isMobile ? '3vw' : '0.8vw',
            }}
            variant="body1"
          >
            <strong>{formatMessage({ id: 'ADMIN.USERS.LIST.PAGE.USER.PHONE' })}</strong>
            {user.phone}
          </Typography>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default UserCard;
