import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { User } from '@webapp/sdk/types/user-types';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent, useEffect } from 'react';
import { useIntl } from 'react-intl';

interface ZoneDeliverButtonsProps {
  className?: string;
  userData: User;
  setUser: (user: User) => void;
  onValidChange?: (isValid: boolean) => void;
}

const ZoneDeliverButtons: FunctionComponent<ZoneDeliverButtonsProps> = ({ userData, onValidChange, setUser }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { setUser: setUserData } = useUserData();
  const { setDeliverValue, setOrder, order } = useMessageStore();

  useEffect(() => {
    let deliveryCost = 0;
    const selectedDelivery = userData.delivery_zone || order.delivery_zone;

    if (selectedDelivery === 'BSSO') {
      deliveryCost = 1400;
    } else if (selectedDelivery === 'CASCO') {
      deliveryCost = 2800;
    } else if (selectedDelivery === 'OUTCASCO') {
      deliveryCost = 4000;
    } else if (selectedDelivery === 'LEJOS') {
      deliveryCost = 4500;
    }

    // Actualizar el costo de entrega si es necesario
    if (userData.delivery_cost !== deliveryCost) {
      const updatedUserData = {
        ...userData,
        delivery_cost: deliveryCost,
      };
      setUser(updatedUserData);
      setUserData(updatedUserData);
      setDeliverValue(deliveryCost);
      setOrder({
        ...order,
        user: updatedUserData,
      });
    }
  }, [userData]);

  const handleOnChange = async (selectedDelivery: string) => {
    let deliveryCost = 0;

    if (selectedDelivery === 'BSSO') {
      deliveryCost = 1400;
    } else if (selectedDelivery === 'CASCO') {
      deliveryCost = 2800;
    } else if (selectedDelivery === 'OUTCASCO') {
      deliveryCost = 4000;
    } else if (selectedDelivery === 'LEJOS') {
      deliveryCost = 4500;
    }

    const updatedUserData = {
      ...userData,
      delivery_zone: selectedDelivery,
      delivery_cost: deliveryCost,
    };

    if (onValidChange) {
      onValidChange(true);
    }

    setUser(updatedUserData);
    setUserData(updatedUserData);
    setDeliverValue(deliveryCost);
    setOrder({
      ...order,
      user: updatedUserData,
    });
  };

  React.useEffect(() => {
    if (onValidChange) {
      onValidChange(!!userData.delivery_zone);
    }
  }, [userData, onValidChange]);

  return (
    <Stack gap={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="center"
        fontSize={isMobile ? '3vw' : '1.6vw'}
        sx={{ mb: 0, color: theme.palette.grey[900] }}
      >
        {formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.SELECTOR' })}
      </Typography>
      <Stack
        gap={isMobile ? 0 : 2}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: isMobile ? '100%' : '50%',
            gap: 2,
            mb: 3,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Button
            size="small"
            onClick={() => handleOnChange('BSSO')}
            color={userData.delivery_zone === 'BSSO' ? 'primary' : 'unselected'}
            aria-label={formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.1' })}
            sx={{ fontSize: isMobile ? '14px' : '1vw' }}
          >
            {formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.1' })}
          </Button>
          <Button
            size="small"
            onClick={() => handleOnChange('CASCO')}
            color={userData.delivery_zone === 'CASCO' ? 'primary' : 'unselected'}
            aria-label={formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.2' })}
            sx={{ fontSize: isMobile ? '14px' : '1vw' }}
          >
            {formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.2' })}
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: isMobile ? '100%' : '50%',
            gap: 2,
            mb: 3,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Button
            size="small"
            onClick={() => handleOnChange('OUTCASCO')}
            color={userData.delivery_zone === 'OUTCASCO' ? 'primary' : 'unselected'}
            aria-label={formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.3' })}
            sx={{ fontSize: isMobile ? '14px' : '1vw' }}
          >
            {formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.3' })}
          </Button>
          <Button
            size="small"
            onClick={() => handleOnChange('LEJOS')}
            color={userData.delivery_zone === 'LEJOS' ? 'primary' : 'unselected'}
            aria-label={formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.4' })}
            sx={{ fontSize: isMobile ? '14px' : '1vw' }}
          >
            {formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.4' })}
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ZoneDeliverButtons;
