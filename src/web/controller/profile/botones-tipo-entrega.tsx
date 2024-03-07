import { Divider, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { updateUserInDb } from '@webapp/sdk/firebase/user';
import { User } from '@webapp/sdk/users-types';
import { useUserData } from '@webapp/store/users/user-data';
import { useUserId } from '@webapp/store/users/user-id';
import Button from '@webapp/web/components/button';
import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';

interface DeliveryTypeButtonsProps {
  className?: string;
  userData: User;
}

const DeliveryTypeButtons: FunctionComponent<DeliveryTypeButtonsProps> = ({ userData }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { userId } = useUserId();
  const { setUser } = useUserData();
  const [deliveryType, setDeliveryType] = useState(userData.deliveryType);

  const handleSelectDelivery = () => {
    setDeliveryType('Delivery');
    handleOnChange('Delivery');
  };

  const handleSelectLocalPickup = () => {
    setDeliveryType('Retiro en local');
    handleOnChange('Retiro en local');
  };

  const handleOnChange = (selectedDelivery: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId: ignoredUserId, ...restOfUserData } = userData;
    updateUserInDb({ userId, ...restOfUserData, deliveryType: selectedDelivery });
    setUser({ ...userData, deliveryType: selectedDelivery });
  };

  return (
    <Stack gap={2} sx={{ mt: 4, width: '100%', display: 'flex' }}>
      <Typography variant="h4" fontWeight={600} fontSize={22} sx={{ mb: 0, color: theme.palette.grey[900] }}>
        {formatMessage({ id: 'PROFILE.USER_INFO.SELECTED.OPTIONS' })}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack gap={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          fontSize={16}
          sx={{ mb: 0, color: theme.palette.grey[900] }}
        >
          {formatMessage({ id: 'PROFILE.USER_INFO.SELECTED.DELIVERY' })}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            gap: 2,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={handleSelectDelivery}
            onSelect={() => handleOnChange('Delivery')}
            sx={{
              width: '100%',
              maxWidth: '236px',
              height: '48px',
              backgroundColor: deliveryType === 'Delivery' ? theme.palette.primary.main : theme.palette.grey[200],
              border: deliveryType === 'Delivery' ? 'none' : `1px solid ${theme.palette.divider}`,
              '&:hover': {
                backgroundColor: deliveryType === 'Delivery' ? theme.palette.primary.main : theme.palette.grey[300],
                border: deliveryType === 'Delivery' ? 'none' : `1px solid ${theme.palette.divider}`,
              },
            }}
            aria-label={formatMessage({ id: 'COMMON.SELECTED.DELIVERY.DELIVERY' })}
          >
            {formatMessage({ id: 'COMMON.SELECTED.DELIVERY.DELIVERY' })}
          </Button>
          <Button
            onClick={handleSelectLocalPickup}
            onSelect={() => handleOnChange('Retiro en local')}
            sx={{
              width: '100%',
              maxWidth: '236px',
              height: '48px',
              backgroundColor:
                deliveryType === 'Retiro en local' ? theme.palette.primary.main : theme.palette.grey[200],
              border: deliveryType === 'Retiro en local' ? 'none' : `1px solid ${theme.palette.divider}`,
              '&:hover': {
                backgroundColor:
                  deliveryType === 'Retiro en local' ? theme.palette.primary.main : theme.palette.grey[300],
                border: deliveryType === 'Retiro en local' ? 'none' : `1px solid ${theme.palette.divider}`,
              },
            }}
            aria-label={formatMessage({ id: 'COMMON.SELECTED.DELIVERY.LOCAL_PICKUP' })}
          >
            {formatMessage({ id: 'COMMON.SELECTED.DELIVERY.LOCAL_PICKUP' })}
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default DeliveryTypeButtons;
