import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { styled, useTheme } from '@mui/material';
import { Box, Checkbox, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputField from '@webapp/mobile/components/form/input';
import PaymentTypeButtons from '@webapp/mobile/controller/cart/step-1/botones-metodo-pago';
import DeliveryTypeButtons from '@webapp/mobile/controller/cart/step-1/botones-tipo-entrega';
import ZoneDeliverButtons from '@webapp/mobile/controller/cart/step-1/botones-zona-entrega';
import { User } from '@webapp/sdk/users-types';
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
}) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
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
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 5,
        }}
      >
        <PaymentTypeButtons userData={user} />
        <DeliveryTypeButtons userData={user} />
        {user.deliveryType === 'Delivery' && (
          <Box sx={{ width: '100%' }}>
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
              onChange={(e) => setAddress(e.target.value)}
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
              onChange={(e) => setCity(e.target.value)}
              type="text"
              fullWidth
              size="small"
              aria-label={formatMessage({ id: 'COMMON.CITY' })}
              autoComplete="city"
              hidden
              aria-hidden="true"
              sx={{ width: '100%' }}
            />
            <ZoneDeliverButtons userData={user} />
          </Box>
        )}
      </Box>
      <Stack direction={'column'} gap={4} width={'100%'} justifyContent={'center'} alignItems={'center'}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
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
