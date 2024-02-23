import { Box, Button, Paper, Stack, Typography, alpha, styled, useTheme } from '@mui/material';
import { CartItem } from '@webapp/sdk/users-types';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

// import { useNavigate } from 'react-router-dom';

interface CartProductsDetailProps {
  className?: string;
  cartProducts: CartItem[];
}

export const CartPaymentDetail: FunctionComponent<CartProductsDetailProps> = ({ cartProducts }) => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const { dollarValue } = useDollarValue();
  const deliveryPrice = 2340;
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  // const calculateTotal = (): number => {
  //   return cartProducts.reduce((acc, product) => {
  //     const conversionRate = product.priceCurrency === 'USD' ? dollarValue.value : 1;
  //     const convertedValue = product.subTotal * Number(conversionRate);
  //     return convertedValue + acc;
  //   }, 0);
  // };

  useEffect(() => {
    const calculateTotal = (): number => {
      return cartProducts.reduce((acc, product) => {
        const conversionRate = product.priceCurrency === 'USD' ? dollarValue.value : 1;
        const convertedValue = product.subTotal * Number(conversionRate);
        return convertedValue + acc;
      }, 0);
    };
    const totalCartValue = calculateTotal() + deliveryPrice;
    setTotalCartValue((totalCartValue));
    setSubTotal(calculateTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts, dollarValue, deliveryPrice]);

  return (
    <Paper sx={{ p: 2, width: 'auto', backgroundColor: alpha(theme.palette.common.white, 0.8) }}>
      <Stack direction={'column'} gap={4} width={'100%'}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textWrap: 'nowrap', color: theme.palette.grey[800] }}>
          {formatMessage({ id: 'CART.PAYMENT.TITLE' })}
        </Typography>
        <TextsContainer>
          <CustomTypography variant="subtitle1">Subtotal</CustomTypography>

          <CustomTypography variant="subtitle1">$ {subTotal}</CustomTypography>
        </TextsContainer>
        <TextsContainer>
          <CustomTypography variant="subtitle1">Envío</CustomTypography>
          <CustomTypography variant="subtitle1">$ {deliveryPrice}</CustomTypography>
        </TextsContainer>
      </Stack>
      <Stack direction={'column'} gap={2} width={'100%'} sx={{ marginTop: 10 }}>
        <TextsContainer>
          <CustomTypography variant="subtitle1">Total</CustomTypography>
          <CustomTypography variant="subtitle1">$ {totalCartValue}</CustomTypography>
        </TextsContainer>
        <Button variant="contained" color="primary" size="small" fullWidth>
          {formatMessage({ id: 'CART.PAYMENT.CHECKOUT' })}
        </Button>
      </Stack>
    </Paper>
  );
};

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  textAlign: 'center',
  p: 2,
}));

const TextsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 2,
  width: '100%',
  justifyContent: 'space-between',
}));
