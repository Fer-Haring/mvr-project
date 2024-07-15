import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import { useIsMobile } from '@webapp/hooks/is-mobile';
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
  setIsCurrencyPayValid: (isValid: boolean) => void;
}

const DeliveryTypeButtons: FunctionComponent<DeliveryTypeButtonsProps> = ({
  userData,
  onValidChange,
  setIsCurrencyPayValid,
}) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { setUser } = useUserData();
  const [deliveryType, setDeliveryType] = useState('');
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
      onValidChange(!!userData?.delivery_type);
    }
  }, []);

  return (
    <Stack
      gap={2}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      <Stack gap={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          fontSize={isMobile ? '3vw' : '1.6vw'}
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
            flexDirection: 'row',
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
      <CurrencySelectButtons userData={userData} setIsCurrencyPayValid={setIsCurrencyPayValid} />
    </Stack>
  );
};

export default DeliveryTypeButtons;