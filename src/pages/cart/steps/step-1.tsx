import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useTheme } from '@mui/material';
import { Box, Checkbox, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@webapp/components/button';
import PaymentTypeButtons from '@webapp/controller/cart/step-1/botones-metodo-pago';
import DeliveryTypeButtons from '@webapp/controller/cart/step-1/botones-tipo-entrega';
import DeliveryData from '@webapp/controller/cart/step-1/delivery-data';
import { OrderRequest } from '@webapp/sdk/types/orders-types';
import { User } from '@webapp/sdk/types/user-types';
import React, { useState } from 'react';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface Step1Props {
  user: User;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
  city: string;
  setCity: (city: string) => void;
  address: string;
  setAddress: (address: string) => void;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  order: OrderRequest;
}

export const Step1: FunctionComponent<Step1Props> = ({
  handlePreviousStep,
  user,
  handleNextStep,
  city,
  setCity,
  address,
  setAddress,
  checked,
  setChecked,
  order,
}) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const [isPaymentTypeValid, setIsPaymentTypeValid] = useState(false);
  const [isDeliveryTypeValid, setIsDeliveryTypeValid] = useState(false);
  const [isCurrencyPayValid, setIsCurrencyPayValid] = useState(false);
  const [isZoneDeliveryValid, setIsZoneDeliveryValid] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isCityValid, setIsCityValid] = useState(false);

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
        isCurrencyPayValid
      );
    } else {
      return isPaymentTypeValid && isDeliveryTypeValid && isCurrencyPayValid;
    }
  };

  React.useEffect(() => {
    setIsAddressValid(isValidField(user?.address));
    setIsCityValid(isValidField(user?.city));
    setIsPaymentTypeValid(!!user?.payment_method);
    setIsDeliveryTypeValid(!!user?.delivery_type);
    setIsZoneDeliveryValid(!!user?.deliver_zone);
    setIsCurrencyPayValid(!!user?.preferred_currency);
  }, [user]);

  console.log('Step1Props', order?.delivery_type);

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

      <PaymentTypeButtons userData={user} onValidChange={setIsPaymentTypeValid} />
      <DeliveryTypeButtons
        userData={user}
        onValidChange={setIsDeliveryTypeValid}
        setIsCurrencyPayValid={setIsCurrencyPayValid}
      />

      {order?.delivery_type === 'Delivery' && (
        <DeliveryData
          user={user}
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
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              disabled={!areAllFieldsValid()}
              sx={{ color: theme.palette.grey[800] }}
            />
            <Typography variant="body1" sx={{ color: theme.palette.grey[800], textAlign: 'center', fontSize: '1.1vw' }}>
              {formatMessage({ id: 'CART.PAYMENT.CONFIRMATION' })}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          onClick={handleNextStep}
          color={!checked ? 'disabled' : 'primary'}
          disabled={!checked}
          endIcon={<ArrowForwardIosRoundedIcon />}
        >
          {formatMessage({ id: 'CART.PAYMENT.NEXT' })}
        </Button>
      </Stack>
    </Stack>
  );
};
