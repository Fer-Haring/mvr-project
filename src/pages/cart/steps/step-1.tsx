import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { styled, useTheme } from '@mui/material';
import { Box, Checkbox, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputField from '@webapp/components/form/input';
import PaymentTypeButtons from '@webapp/controller/cart/step-1/botones-metodo-pago';
import DeliveryTypeButtons from '@webapp/controller/cart/step-1/botones-tipo-entrega';
import ZoneDeliverButtons from '@webapp/controller/cart/step-1/botones-zona-entrega';
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
  const [isZoneDeliveryValid, setIsZoneDeliveryValid] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [isCityValid, setIsCityValid] = useState(false);

  const isValidField = (value: string | undefined): boolean => {
    return !!value && value.trim() !== '';
  };

  const areAllFieldsValid = () => {
    if (user?.delivery_type === 'Delivery') {
      return isPaymentTypeValid && isDeliveryTypeValid && isZoneDeliveryValid && isAddressValid && isCityValid;
    } else {
      return isPaymentTypeValid && isDeliveryTypeValid;
    }
  };

  React.useEffect(() => {
    setIsAddressValid(isValidField(user?.address));
    setIsCityValid(isValidField(user?.city));
    setIsPaymentTypeValid(!!user?.payment_method);
    setIsDeliveryTypeValid(!!user?.delivery_type);
    setIsZoneDeliveryValid(!!user?.deliver_zone);
  }, [user]);

  console.log(
    'Step1Props',
    isPaymentTypeValid,
    isDeliveryTypeValid,
    isZoneDeliveryValid,
    isAddressValid,
    isCityValid,
    areAllFieldsValid()
  );

  return (
    <Stack direction={'column'} gap={2} width={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Button
        variant="contained"
        onClick={handlePreviousStep}
        startIcon={<ArrowBackIosNewRoundedIcon />}
        sx={{
          maxWidth: 300,
          ': hover': {
            color: theme.palette.grey[200],
          },
        }}
      >
        {formatMessage({ id: 'CART.PAYMENT.BACK' })}
      </Button>
      <Box
        sx={{
          p: 2,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          gap: 1,
        }}
      >
        <PaymentTypeButtons userData={user} onValidChange={setIsPaymentTypeValid} />
        <DeliveryTypeButtons userData={user} onValidChange={setIsDeliveryTypeValid} />

        {order?.delivery_type === 'Delivery' && (
          <Box sx={{ width: '33%' }}>
            <Typography
              variant="h4"
              fontWeight={600}
              textAlign="center"
              fontSize={24}
              sx={{ mb: 1, color: theme.palette.grey[900] }}
            >
              {formatMessage({ id: 'CART.PAYMENT.ADRESS.TITLE' })}
            </Typography>
            <Typography
              variant="h4"
              fontWeight={600}
              textAlign="center"
              fontSize={16}
              sx={{ mb: 4, color: theme.palette.grey[500] }}
            >
              {formatMessage({ id: 'CART.PAYMENT.ADDRESS.DESCRIPTION.WARNING' })}
            </Typography>
            <CustomInputField
              name="address"
              label={formatMessage({ id: 'COMMON.ADRESS' })}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setIsAddressValid(isValidField(e.target.value));
              }}
              type="text"
              fullWidth
              size="small"
              aria-label={formatMessage({ id: 'COMMON.ADRESS' })}
              autoComplete="address"
              hidden
              aria-hidden="true"
              sx={{ width: '100%' }}
            />
            <CustomInputField
              name="city"
              label={formatMessage({ id: 'COMMON.CITY' })}
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setIsCityValid(isValidField(e.target.value));
              }}
              type="text"
              fullWidth
              size="small"
              aria-label={formatMessage({ id: 'COMMON.CITY' })}
              autoComplete="city"
              hidden
              aria-hidden="true"
              sx={{ width: '100%' }}
            />
            <ZoneDeliverButtons userData={user} onValidChange={setIsZoneDeliveryValid} />
          </Box>
        )}
      </Box>
      <Stack direction={'column'} gap={4} width={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            disabled={!areAllFieldsValid()}
            sx={{ color: theme.palette.grey[800] }}
          />
          <Typography variant="body1" fontWeight={400} sx={{ color: theme.palette.grey[800], textAlign: 'center' }}>
            {formatMessage({ id: 'CART.PAYMENT.CONFIRMATION' })}
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleNextStep}
          sx={{
            maxWidth: 300,
            ': hover': {
              color: theme.palette.grey[200],
            },
          }}
          disabled={!checked}
          endIcon={<ArrowForwardIosRoundedIcon />}
        >
          {formatMessage({ id: 'CART.PAYMENT.NEXT' })}
        </Button>
      </Stack>
    </Stack>
  );
};

const CustomInputField = styled(InputField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderColor: theme.palette.grey[700],
    backgroundColor: theme.palette.grey[200],
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[500],
  },
  '& input': {
    color: theme.palette.grey[800],
    fontWeight: 'bold',
    paddingRight: '0px',
  },
}));
