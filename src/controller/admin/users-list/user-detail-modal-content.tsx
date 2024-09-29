import { alpha, Box, Stack, styled, Typography } from '@mui/material';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { User } from '@webapp/sdk/types/user-types';
import React from 'react';
import { useIntl } from 'react-intl';

interface UserDetailModalContentProps {
  user: User | null;
}

const UserDetailModalContent: React.FunctionComponent<UserDetailModalContentProps> = ({ user }) => {
  const { formatMessage } = useIntl();
  const isMobile = useIsMobile();
  
  if (!user) {
    return null;
  }

  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1">
          <StyledStrongText>{formatMessage({ id: 'ADMIN.LIST.USERS.MODAL.FIRST_NAME' })}</StyledStrongText>
          {user.name}
        </Typography>
        <Typography variant="body1">
          <StyledStrongText>{formatMessage({ id: 'ADMIN.LIST.USERS.MODAL.LAST_NAME' })}</StyledStrongText>
          {user.last_name}
        </Typography>
        <Typography variant="body1">
          <StyledStrongText>{formatMessage({ id: 'ADMIN.LIST.USERS.MODAL.USERNAME' })}</StyledStrongText>
          {user.username}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1">
          <StyledStrongText>{formatMessage({ id: 'ADMIN.LIST.USERS.MODAL.EMAIL' })}</StyledStrongText>
          {user.email}
        </Typography>
        <Typography variant="body1">
          <StyledStrongText>{formatMessage({ id: 'ADMIN.LIST.USERS.MODAL.PHONE' })}</StyledStrongText>
          {user.phone || 'Sin Registrar'}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1">
          <StyledStrongText>{formatMessage({ id: 'ADMIN.LIST.USERS.MODAL.ADRESS' })}</StyledStrongText>
          {user.address}
        </Typography>
        <Typography variant="body1">
          <StyledStrongText>{formatMessage({ id: 'ADMIN.LIST.USERS.MODAL.CITY' })}</StyledStrongText>
          {user.city}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1">
          <StyledStrongText>{formatMessage({ id: 'ADMIN.LIST.USERS.MODAL.LAST_CURRENCY' })}</StyledStrongText>
          {user.preferred_currency}
        </Typography>
        <Typography variant="body1">
          <StyledStrongText>{formatMessage({ id: 'ADMIN.LIST.USERS.MODAL.DELIVERY_TYPE' })}</StyledStrongText>
          {user.delivery_type}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1">
          <StyledStrongText>{formatMessage({ id: 'ADMIN.LIST.USERS.MODAL.PAYMENT_METHOD' })}</StyledStrongText>
          {user.payment_method}
        </Typography>
        <Typography variant="body1">
          <StyledStrongText>{formatMessage({ id: 'ADMIN.LIST.USERS.MODAL.DELIVERY_ZONE' })}</StyledStrongText>
          {user.delivery_zone}
        </Typography>
      </Box>
    </Stack>
  );
};

export default UserDetailModalContent;

const StyledStrongText = styled('strong')(({ theme }) => ({
  fontWeight: 'bold',
  color: alpha(theme.palette.common.white, 0.3),
}));