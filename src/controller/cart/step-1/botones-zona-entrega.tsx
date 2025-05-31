import { MenuItem, Select, styled, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { User } from '@webapp/service/types/user-types';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent, useEffect } from 'react';
import { useIntl } from 'react-intl';

interface ZoneDeliverButtonsProps {
  className?: string;
  user: User;
  setUser: (user: User) => void;
  onValidChange?: (isValid: boolean) => void;
}

const ZoneDeliverButtons: FunctionComponent<ZoneDeliverButtonsProps> = ({ onValidChange }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { user, setUser } = useUserData();
  const { setDeliverValue, setOrder, order } = useMessageStore();

  useEffect(() => {
    let deliveryCost = 0;
    const selectedDelivery = user.delivery_zone || order.delivery_zone;

    // Condición para el costo de entrega en función de `delivery_type`
    if (order.delivery_type === 'Retiro en local') {
      deliveryCost = 0;
    } else if (selectedDelivery === 'BSSO') {
      deliveryCost = 1700;
    } else if (selectedDelivery === 'CASCO') {
      deliveryCost = 3300;
    } else if (selectedDelivery === 'OUTCASCO') {
      deliveryCost = 4700;
    } else if (selectedDelivery === 'LEJOS') {
      deliveryCost = 5200;
    }

    // Validación para asegurar que el delivery_cost no sea menor que el valor actual
    if (user.delivery_cost < deliveryCost) {
      // Si el costo actual es menor, forzamos al usuario a seleccionar nuevamente
      const updatedUserData = {
        ...user,
        delivery_zone: '', // Limpiamos la zona de entrega
        delivery_cost: 0, // Reseteamos el costo
      };
      setUser(updatedUserData);
      setDeliverValue(0);
      setOrder({
        ...order,
        user: updatedUserData,
      });
      if (onValidChange) {
        onValidChange(false);
      }
      return;
    }

    // Actualizar el costo de entrega si es necesario
    if (user.delivery_cost !== deliveryCost) {
      const updatedUserData = {
        ...user,
        delivery_cost: deliveryCost,
      };
      setUser(updatedUserData);
      setDeliverValue(deliveryCost);
      setOrder({
        ...order,
        user: updatedUserData,
      });
    }
  }, [user, order.delivery_zone, order.delivery_type, setUser, setDeliverValue, setOrder, onValidChange]);

  const handleOnChange = async (selectedDelivery: string) => {
    let deliveryCost = 0;

    if (selectedDelivery === 'BSSO') {
      deliveryCost = 1700;
    } else if (selectedDelivery === 'CASCO') {
      deliveryCost = 3300;
    } else if (selectedDelivery === 'OUTCASCO') {
      deliveryCost = 4700;
    } else if (selectedDelivery === 'LEJOS') {
      deliveryCost = 5200;
    } else if (order.delivery_type === 'Retiro en local') {
      deliveryCost = 0;
    }

    const updatedUserData = {
      ...user,
      delivery_zone: selectedDelivery,
      delivery_cost: deliveryCost,
    };

    if (onValidChange) {
      onValidChange(true);
    }

    setUser(updatedUserData);
    setDeliverValue(deliveryCost);
    setOrder({
      ...order,
      user: updatedUserData,
    });
  };

  React.useEffect(() => {
    if (onValidChange) {
      onValidChange(!!user.delivery_zone);
    }
  }, [user, onValidChange]);

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
      <CustomSelect
        id="delivery-zone"
        label={formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.SELECTOR' })}
        value={user.delivery_zone}
        onChange={(e) => handleOnChange(e.target.value as string)}
        fullWidth
        error={!user.delivery_zone}
      >
        <CustomMenuItem value="BSSO">{formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.1' })}</CustomMenuItem>
        <CustomMenuItem value="CASCO">{formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.2' })}</CustomMenuItem>
        <CustomMenuItem value="OUTCASCO">{formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.3' })}</CustomMenuItem>
        <CustomMenuItem value="LEJOS">{formatMessage({ id: 'CART.PAYMENT.DELIVER.ZONE.4' })}</CustomMenuItem>
      </CustomSelect>
    </Stack>
  );
};

export default ZoneDeliverButtons;

const CustomSelect = styled(Select)(() => ({
  padding: '10px 14px',
  color: '#000000',
  '& .MuiSelect-icon': {
    color: '#FFFFFF', // Color del ícono
  },
}));

const CustomMenuItem = styled(MenuItem)(() => ({
  fontSize: '14px',
  color: '#000000',
}));
