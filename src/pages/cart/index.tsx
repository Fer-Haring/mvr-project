import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { Box, Button, Checkbox, Stack, Typography, alpha, styled, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import ContentWrapper from '@webapp/components/content-wrapper';
import InputField from '@webapp/components/form/input';
import CartEmptyState from '@webapp/controller/cart/empty-cart';
import { CartPaymentDetail } from '@webapp/controller/cart/step-1/cart-payment-detail';
import { CartProductsDetail } from '@webapp/controller/cart/step-1/cart-products-detail';
import PaymentTypeButtons from '@webapp/controller/cart/step-2/botones-metodo-pago';
import DeliveryTypeButtons from '@webapp/controller/cart/step-2/botones-tipo-entrega';
import { useCartStore } from '@webapp/store/cart/cart';
import { useUserData } from '@webapp/store/users/user-data';
import { motion } from 'framer-motion';
import { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';

export const CartPage: FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { cart } = useCartStore();
  const [step, setStep] = useState(0);
  const { user } = useUserData();
  const [address, setAdress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [checked, setChecked] = useState(false);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <ContentWrapper>
      {cart.length === 0 ? (
        <CartEmptyState />
      ) : (
        <Paper
          sx={{
            p: 2,
            width: '90%',
            backgroundColor: alpha(theme.palette.common.white, 0.6),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {step === 0 && (
            <Stack direction={'column'} gap={2} width={'100%'} justifyContent={'center'} alignItems={'center'}>
              <Box
                sx={{
                  p: 2,
                  pb: 10,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <CartProductsDetail cartProducts={cart} />
                <CartPaymentDetail cartProducts={cart} />
              </Box>
              <Button
                variant="contained"
                onClick={handleNextStep}
                sx={{ maxWidth: 300 }}
                endIcon={<ArrowForwardIosRoundedIcon />}
              >
                {formatMessage({ id: 'CART.PAYMENT.CHECKOUT' })}
              </Button>
            </Stack>
          )}
          {step === 1 && (
            <Stack direction={'column'} gap={2} width={'100%'} justifyContent={'center'} alignItems={'center'}>
              <Button variant="contained" onClick={handlePreviousStep} startIcon={<ArrowBackIosNewRoundedIcon />}>
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
                <PaymentTypeButtons userData={user} />
                <DeliveryTypeButtons userData={user} />
                <Box sx={{ width: '33%' }}>
                  <Typography
                    variant="h4"
                    fontWeight={600}
                    textAlign="center"
                    fontSize={24}
                    sx={{ mb: 4, color: theme.palette.grey[900] }}
                  >
                    {formatMessage({ id: 'CART.PAYMENT.ADRESS.TITLE' })}
                  </Typography>
                  <CustomInputField
                    name="address"
                    label={formatMessage({ id: 'COMMON.ADRESS' })}
                    value={address}
                    onChange={(e) => setAdress(e.target.value)}
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
                </Box>
              </Box>
              <Stack direction={'column'} gap={4} width={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Button
                  variant="contained"
                  onClick={handleNextStep}
                  disabled={!checked}
                  sx={{
                    maxWidth: 200,
                    color: theme.palette.common.white,
                    backgroundColor: checked ? theme.palette.primary.main : theme.palette.grey[200],
                    '&:hover': {
                      backgroundColor: checked ? theme.palette.primary.main : theme.palette.grey[300],
                    },
                    '&:disabled': {
                      backgroundColor: theme.palette.grey[200],
                      color: theme.palette.grey[400],
                    },
                  }}
                >
                  {formatMessage({ id: 'CART.PAYMENT.CONFIRM' })}
                </Button>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    sx={{ color: theme.palette.grey[800] }}
                  />
                  <Typography
                    variant="body1"
                    fontWeight={400}
                    sx={{ color: theme.palette.grey[800], textAlign: 'center' }}
                  >
                    {formatMessage({ id: 'CART.PAYMENT.CONFIRMATION' })}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          )}

          {step === 2 && (
            <Stack direction={'column'} gap={2} width={'100%'} justifyContent={'center'} alignItems={'center'}>
              <motion.div
                animate={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                  // borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 42,
                }}
              >
                <CheckCircleOutlineRoundedIcon sx={{ color: theme.palette.success.main, fontSize: 250 }} />
              </motion.div>
              <Typography
                variant="h4"
                fontWeight={600}
                textAlign="center"
                fontSize={60}
                sx={{ mb: 1, color: theme.palette.grey[900] }}
              >
                {formatMessage({ id: 'CART.PAYMENT.SUCCESS' })}
              </Typography>
              <Typography
                variant="h4"
                fontWeight={600}
                textAlign="center"
                fontSize={40}
                sx={{ mb: 4, color: theme.palette.grey[900] }}
              >
                {formatMessage({ id: 'CART.PAYMENT.SUCCESS.TITLE' })}
              </Typography>
              <Button variant="contained" onClick={() => navigate('/')} sx={{ maxWidth: 300 }}>
                {formatMessage({ id: 'CART.PAYMENT.SUCCESS.BUTTON.BACK.HOME' })}
              </Button>
            </Stack>
          )}
        </Paper>
      )}
    </ContentWrapper>
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
