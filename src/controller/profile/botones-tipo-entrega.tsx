import { Divider, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import { useUpdateUser } from '@webapp/sdk/mutations/auth/user-update-mutation';
import { User } from '@webapp/sdk/types/user-types';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';

interface DeliveryTypeButtonsProps {
  className?: string;
  userData: User;
}

const DeliveryTypeButtons: FunctionComponent<DeliveryTypeButtonsProps> = ({ userData }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { setUser } = useUserData();
  const [deliveryType, setDeliveryType] = useState(userData?.delivery_type);
  const { mutate } = useUpdateUser(userData?.id);

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
    const { id: ignoredUserId, ...restOfUserData } = userData;
    mutate({ payload: { ...restOfUserData, delivery_type: selectedDelivery } });
    setUser({ ...userData, delivery_type: selectedDelivery });
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
            color={deliveryType === 'Delivery' ? 'primary' : 'unselected'}
            aria-label={formatMessage({ id: 'COMMON.SELECTED.DELIVERY.DELIVERY' })}
          >
            {formatMessage({ id: 'COMMON.SELECTED.DELIVERY.DELIVERY' })}
          </Button>
          <Button
            onClick={handleSelectLocalPickup}
            onSelect={() => handleOnChange('Retiro en local')}
            color={deliveryType === 'Retiro en local' ? 'primary' : 'unselected'}
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
