import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Box, Checkbox, Divider, Link, MenuItem, Select, Typography, styled, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@webapp/components/button';
import DeliveryData from '@webapp/controller/cart/step-1/delivery-data';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useUpdateUser } from '@webapp/service/mutations/auth/user-update-mutation';
import { OrderRequest } from '@webapp/service/types/orders-types';
import { User } from '@webapp/service/types/user-types';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { useUserData } from '@webapp/store/users/user-data';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface Step1Props {
  user: User;
  // setUser: (user: User) => void;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
  city: string;
  setCity: (city: string) => void;
  address: string;
  setAddress: (address: string) => void;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  order: OrderRequest;
  updatingUserLoading: boolean;
}

export const Step1: React.FC<Step1Props> = ({
  handlePreviousStep,
  // user,
  // setUser,
  handleNextStep,
  city,
  setCity,
  address,
  setAddress,
  checked,
  setChecked,
  updatingUserLoading,
}) => {
  const { formatMessage } = useIntl();
  const isMobile = useIsMobile();
  const theme = useTheme();
  const { order, setOrder, setDeliverValue } = useMessageStore();
  const { user, setUser } = useUserData();
  const [isPaymentTypeValid, setIsPaymentTypeValid] = useState<boolean>(false);
  const [isDeliveryTypeValid, setIsDeliveryTypeValid] = useState(false);
  const [isCurrencyPayValid, setIsCurrencyPayValid] = useState(false);
  const [isZoneDeliveryValid, setIsZoneDeliveryValid] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isCurrencyUsedToPayValid, setIsCurrencyUsedToPayValid] = useState(false);
  const [isCityValid, setIsCityValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const updateUser = useUpdateUser(user.id);

  const isValidField = (value: string | undefined): boolean => {
    return !!value && value.trim() !== '';
  };

  const areAllFieldsValid = () => {
    if (user?.delivery_type === 'Delivery') {
      return (
        isPaymentTypeValid &&
        isDeliveryTypeValid &&
        isZoneDeliveryValid &&
        isAddressValid &&
        isCityValid &&
        isCurrencyUsedToPayValid &&
        isCurrencyPayValid &&
        order.delivery_cost !== 0 &&
        user?.delivery_cost !== 0
      );
    } else {
      return isPaymentTypeValid && isDeliveryTypeValid && isCurrencyPayValid;
    }
  };

  useEffect(() => {
    setIsAddressValid(isValidField(user?.address));
    setIsCityValid(isValidField(user?.city));
    setIsPaymentTypeValid(!!user?.payment_method);
    setIsDeliveryTypeValid(!!user?.delivery_type);
    setIsZoneDeliveryValid(!!user?.delivery_zone);
    setIsCurrencyPayValid(!!user?.preferred_currency);
    setIsCurrencyUsedToPayValid(!!order?.currency_used_to_pay);
    setPhoneNumber(user?.phone || '');
  }, [user]);

  useEffect(() => {
    // Asegúrate de actualizar las validaciones cuando se cambien los estados locales
    setIsAddressValid(isValidField(address));
    setIsCityValid(isValidField(city));
  }, [address, city]);

  const handlePaymentMethodChange = (selectedPaymentMethod: string) => {
    if (isPaymentTypeValid) {
      setIsPaymentTypeValid(true);
    }

    // Actualizar usuario y orden en el store de Zustand
    setUser({ ...user, payment_method: selectedPaymentMethod });
    setOrder({ ...order, payment_method: selectedPaymentMethod });
  };

  const handleDeliveryTypeChange = (selectedDelivery: string) => {
    setIsDeliveryTypeValid(true);
    setUser({ ...user, delivery_type: selectedDelivery, delivery_cost: 0 });
    setOrder({ ...order, delivery_type: selectedDelivery, delivery_cost: 0 });
    setDeliverValue(0);
  };

  const handleCurrencyUsedToPayChange = (selectedCurrency: string) => {
    setIsCurrencyUsedToPayValid(true);
    setUser({ ...user, preferred_currency: selectedCurrency });
    setOrder({ ...order, currency_used_to_pay: selectedCurrency });
  };

  React.useEffect(() => {
    if (isPaymentTypeValid) {
      setIsPaymentTypeValid(!!user?.payment_method);
    }
    if (isCurrencyUsedToPayValid) {
      setIsCurrencyUsedToPayValid(!!order?.currency_used_to_pay);
    }
    if (isCurrencyPayValid) {
      setIsCurrencyPayValid(!!user?.preferred_currency);
    }
    if (isDeliveryTypeValid) {
      setIsDeliveryTypeValid(!!user?.delivery_type);
    }
  }, [user]);

  return (
    <Stack direction={'column'} gap={2} width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Button
        variant="contained"
        onClick={handlePreviousStep}
        startIcon={<ArrowBackIosNewRoundedIcon />}
        color="primary"
        sx={{ mb: 2 }}
      >
        {formatMessage({ id: 'CART.PAYMENT.BACK' })}
      </Button>
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign="center"
        fontSize={isMobile ? '3vw' : '1.6vw'}
        sx={{ mb: 0, color: theme.palette.grey[900] }}
      >
        {formatMessage({ id: 'CART.PAYMENT.PAYMENT.METHOD' })}
      </Typography>
      <CustomSelect
        id="payment-method"
        label={formatMessage({ id: 'CART.PAYMENT.PAYMENT.METHOD' })}
        value={user?.payment_method}
        onChange={(e) => handlePaymentMethodChange(e.target.value as string)}
        fullWidth
      >
        <CustomMenuItem value="Efectivo">Efectivo</CustomMenuItem>
        <CustomMenuItem value="Tarjeta Credito">Tarjeta Credito</CustomMenuItem>
        <CustomMenuItem value="Tarjeta Debito">Tarjeta Debito</CustomMenuItem>
        <CustomMenuItem value="Transferencia Bancaria">Transferencia Bancaria</CustomMenuItem>
        <CustomMenuItem value="Pago con Crypto">Pago con Crypto</CustomMenuItem>
      </CustomSelect>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            textAlign="center"
            fontSize={isMobile ? '3vw' : '1.6vw'}
            sx={{ mb: 0, color: theme.palette.grey[900] }}
          >
            {formatMessage({ id: 'CART.PAYMENT.DELIVERY.METHOD' })}
          </Typography>
          <CustomSelect
            id="delivery-type"
            label={formatMessage({ id: 'PROFILE.USER_INFO.SELECTED.DELIVERY' })}
            value={user?.delivery_type}
            onChange={(e) => handleDeliveryTypeChange(e.target.value as string)}
            fullWidth
          >
            <CustomMenuItem value="Delivery">Delivery</CustomMenuItem>
            <CustomMenuItem value="Retiro en local">Retiro en Local</CustomMenuItem>
          </CustomSelect>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            textAlign="center"
            fontSize={isMobile ? '3vw' : '1.6vw'}
            sx={{ mb: 0, color: theme.palette.grey[900] }}
          >
            {formatMessage({ id: 'CART.CURRENCY.USED.TO.PAY' })}
          </Typography>
          <CustomSelect
            id="currency-used-to-pay"
            label={formatMessage({ id: 'CART.CURRENCY.USED.TO.PAY' })}
            value={order?.currency_used_to_pay}
            onChange={(e) => handleCurrencyUsedToPayChange(e.target.value as string)}
            fullWidth
          >
            <CustomMenuItem value="USD">Dolares</CustomMenuItem>
            <CustomMenuItem value="ARS">Pesos Argentinos</CustomMenuItem>
          </CustomSelect>
        </Box>
      </Stack>
      {user.delivery_type === 'Delivery' && (
        <DeliveryData
          user={user}
          setUser={setUser}
          address={address}
          setAddress={setAddress}
          city={city}
          setCity={setCity}
          setIsAddressValid={setIsAddressValid}
          setIsCityValid={setIsCityValid}
          setIsZoneDeliveryValid={setIsZoneDeliveryValid}
          isValidField={isValidField}
        />
      )}
      <Stack direction={'column'} gap={4} width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {!areAllFieldsValid() && (
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{ color: theme.palette.error.main, textAlign: 'center', fontSize: '14px' }}
            >
              {formatMessage({ id: 'CART.PAYMENT.CONFIRMATION.WARNING.ADVICE' })}
            </Typography>
          )}
          {!phoneNumber && (
            <>
              <Divider sx={{ width: '90%', backgroundColor: theme.palette.error.main, margin: '1rem 0 1rem' }} />
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ color: theme.palette.error.main, textAlign: 'center', fontSize: '14px' }}
              >
                {formatMessage({ id: 'CART.PAYMENT.CONFIRMATION.WARNING.MISSING.PHONE.ADVICE' })}
                <Link href="/profile" sx={{ color: theme.palette.error.main, textAlign: 'center', fontSize: '14px' }}>
                  {formatMessage({ id: 'CART.PAYMENT.CONFIRMATION.WARNING.MISSING.PHONE.LINK' })}
                </Link>
              </Typography>
            </>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              disabled={!areAllFieldsValid() || !phoneNumber}
              sx={{ color: theme.palette.common.black }}
            />
            <Typography
              variant="body1"
              sx={{ color: theme.palette.grey[800], textAlign: 'center', fontSize: '0.8rem', maxLines: '2' }}
            >
              {formatMessage({ id: 'CART.PAYMENT.CONFIRMATION' })}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          onClick={handleNextStep}
          color={!checked ? 'disabled' : 'primary'}
          disabled={!checked || !phoneNumber}
          loading={updateUser.isPending || updatingUserLoading}
          endIcon={<ArrowForwardIosRoundedIcon />}
        >
          {formatMessage({ id: 'CART.PAYMENT.NEXT' })}
        </Button>
      </Stack>
    </Stack>
  );
};

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
