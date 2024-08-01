import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Divider, Link, useTheme } from '@mui/material';
import { Box, Checkbox, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@webapp/components/button';
import PaymentTypeButtons from '@webapp/controller/cart/step-1/botones-metodo-pago';
import CurrencySelectButtons from '@webapp/controller/cart/step-1/botones-moneda-pago';
import DeliveryTypeButtons from '@webapp/controller/cart/step-1/botones-tipo-entrega';
import DeliveryData from '@webapp/controller/cart/step-1/delivery-data';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useUpdateUser } from '@webapp/sdk/mutations/auth/user-update-mutation';
import { OrderRequest } from '@webapp/sdk/types/orders-types';
import { User } from '@webapp/sdk/types/user-types';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { set } from 'lodash';
import React, { useEffect, useState } from 'react';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface Step1Props {
  user: User;
  setUser: (user: User) => void;
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

export const Step1: FunctionComponent<Step1Props> = ({
  handlePreviousStep,
  user,
  setUser,
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
  const { order } = useMessageStore();
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
        isCurrencyPayValid
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

      <PaymentTypeButtons userData={user} setUser={setUser} onValidChange={setIsPaymentTypeValid} />

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
        <DeliveryTypeButtons
          userData={user}
          setUser={setUser}
          onValidChange={setIsDeliveryTypeValid}
          setIsCurrencyPayValid={setIsCurrencyPayValid}
        />
        <CurrencySelectButtons userData={user} setIsCurrencyPayValid={setIsCurrencyPayValid} setUser={setUser} />
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
              sx={{ color: theme.palette.error.main, textAlign: 'center', fontSize: '1.1vw' }}
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
                sx={{ color: theme.palette.error.main, textAlign: 'center', fontSize: '1.1vw' }}
              >
                {formatMessage({ id: 'CART.PAYMENT.CONFIRMATION.WARNING.MISSING.PHONE.ADVICE' })}
                <Link href="/profile" sx={{ color: theme.palette.error.main, textAlign: 'center', fontSize: '1.1vw' }}>
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
              sx={{ color: theme.palette.grey[800] }}
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
