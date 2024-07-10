import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import { User } from '@webapp/sdk/types/user-types';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';



import CurrencySelectButtons from './botones-moneda-pago';


interface DeliveryTypeButtonsProps {
  className?: string;
  userData: User;
  onValidChange?: (isValid: boolean) => void;
}

const DeliveryTypeButtons: FunctionComponent<DeliveryTypeButtonsProps> = ({ userData, onValidChange }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { setUser } = useUserData();
  const [deliveryType, setDeliveryType] = useState(userData.delivery_type);
  const { setOrder, order } = useMessageStore();

  const handleSelectDelivery = () => {
    setDeliveryType('Delivery');
    handleOnChange('Delivery');
  };

  const handleSelectLocalPickup = () => {
    setDeliveryType('Retiro en local');
    handleOnChange('Retiro en local');
  };

  const handleOnChange = (selectedDelivery: string) => {
    if (onValidChange) {
      onValidChange(true);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: ignoredUserId, ...restOfUserData } = userData;
    setUser({ ...userData, delivery_type: selectedDelivery });
    setOrder({ ...order, delivery_type: selectedDelivery });
  };

    React.useEffect(() => {
      if (onValidChange) {
        onValidChange(!!userData.delivery_type);
      }
    }, []);

  return (
    <Stack gap={2} sx={{ width: '33%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="center"
        fontSize={24}
        sx={{ mb: 0, color: theme.palette.grey[900] }}
      >
        {formatMessage({ id: 'PROFILE.USER_INFO.SELECTED.DELIVERY' })}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: 2,
          mb: 3,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'column',
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
            backgroundColor: deliveryType === 'Retiro en local' ? theme.palette.primary.main : theme.palette.grey[200],
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
      <CurrencySelectButtons userData={userData} />
    </Stack>
  );
};

export default DeliveryTypeButtons;