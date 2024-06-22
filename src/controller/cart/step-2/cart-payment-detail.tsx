import { Box, Divider, Paper, Stack, Typography, alpha, styled, useTheme } from '@mui/material';
import { CartItem } from '@webapp/sdk/types/user-types';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { useCompletedOrdersStore } from '@webapp/store/orders/get-completed-orders';
import { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface CartProductsDetailProps {
  className?: string;
  cartProducts: CartItem[];
}

export const CartPaymentDetail: FunctionComponent<CartProductsDetailProps> = ({ cartProducts }) => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const { dollarValue } = useDollarValue();
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const { setOrders } = useCompletedOrdersStore();
  const { order, setOrder, address, msgCity, deliverValue } = useMessageStore();

  useEffect(() => {
    const calculateTotal = (): number => {
      return cartProducts.reduce((acc, product) => {
        const conversionRate = product.priceCurrency === 'USD' ? dollarValue.value : 1;
        const convertedValue = product.subTotal * Number(conversionRate);
        const roundedResult = Math.round(convertedValue * 100) / 100;
        return roundedResult + acc;
      }, 0);
    };
    const totalCartValue = calculateTotal() + deliverValue;
    setTotalCartValue(totalCartValue);
    setSubTotal(calculateTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts, dollarValue, deliverValue]);

  useEffect(() => {
    const totalUSD = totalCartValue / dollarValue.value;
    setOrder({
      ...order,
      totalOrderAmountARS: totalCartValue,
      totalOrderAmountUSD: Math.round(totalUSD * 100) / 100,
    });
    setOrders([
      {
        ...order,
        totalOrderAmount: totalCartValue,
        totalOrderAmountARS: totalCartValue,
        totalOrderAmountUSD: Math.round(totalUSD * 100) / 100,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCartValue]);

  return (
    <Paper
      sx={{
        p: 2,
        minWidth: '100%',
        backgroundColor: alpha(theme.palette.common.white, 0.8),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', textWrap: 'nowrap', color: theme.palette.grey[800] }}>
        {formatMessage({ id: 'CART.PAYMENT.TITLE' })}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          width: '100%',
          pt: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack direction={'column'} gap={4} width={'100%'}>
          <TextsContainer>
            <CustomTypography variant="h5">{formatMessage({ id: 'CART.PAYMENT.DETAILS.ADDRESS' })}</CustomTypography>
            <CustomTypography variant="subtitle1">
              {address}, {msgCity}
            </CustomTypography>
          </TextsContainer>
          <TextsContainer>
            <CustomTypography variant="h5">{formatMessage({ id: 'CART.PAYMENT.DETAILS.PAYMENT' })}</CustomTypography>
            <CustomTypography variant="subtitle1">{order.paymentMethod}</CustomTypography>
          </TextsContainer>
          <TextsContainer>
            <CustomTypography variant="h5">
              {formatMessage({ id: 'CART.PAYMENT.DETAILS.DELIVER.TYPE' })}
            </CustomTypography>
            <CustomTypography variant="subtitle1">{order.deliveryType}</CustomTypography>
          </TextsContainer>
          <TextsContainer>
            <CustomTypography variant="h5">
              {formatMessage({ id: 'CART.PAYMENT.DETAILS.SLECTED.CURRENCY' })}
            </CustomTypography>
            {order.currencyUsedToPay === 'USD' ? (
              <CustomTypography variant="subtitle1">{formatMessage({ id: 'CART.PAYMENT.USD' })}</CustomTypography>
            ) : (
              <CustomTypography variant="subtitle1">{formatMessage({ id: 'CART.PAYMENT.ARS' })}</CustomTypography>
            )}
          </TextsContainer>
        </Stack>

        <Stack direction={'column'} gap={4} width={'100%'}>
          <TextsRowContainer>
            <CustomTypography variant="h4">{formatMessage({ id: 'CART.PAYMENT.DETAILS.SUBTOTAL' })}</CustomTypography>
            <StyledDivider orientation="horizontal" flexItem />
            <CustomTypography variant="h5">$ {subTotal}</CustomTypography>
          </TextsRowContainer>
          <TextsRowContainer>
            <CustomTypography variant="h4">
              {formatMessage({ id: 'CART:PAYMENT.DETAILS.DELIVERY.PRICE' })}
            </CustomTypography>
            <StyledDivider orientation="horizontal" flexItem />
            <CustomTypography variant="h5">$ {deliverValue}</CustomTypography>
          </TextsRowContainer>

          <Stack direction={'row'} gap={2} width={'100%'} sx={{ marginTop: 10 }}>
            <TextsRowContainer>
              <CustomTypography sx={{ fontSize: 24, fontWeight: 'bold' }} variant="subtitle1">
                {formatMessage({ id: 'CART.PAYMENT.DETAILS.TOTAL' })}
              </CustomTypography>
              <StyledDivider orientation="horizontal" flexItem />
              {order.currencyUsedToPay === 'USD' ? (
                <CustomTypography sx={{ fontSize: 24, fontWeight: 'bold' }} variant="subtitle1">
                  $ {totalCartValue / dollarValue.value}
                </CustomTypography>
              ) : (
                <CustomTypography sx={{ fontSize: 24, fontWeight: 'bold' }} variant="subtitle1">
                  $ {totalCartValue}
                </CustomTypography>
              )}
            </TextsRowContainer>
          </Stack>
        </Stack>
      </Box>
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
  flexDirection: 'column',
  gap: 2,
  width: '100%',
  justifyContent: 'space-between',
}));

const TextsRowContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 2,
  width: '100%',
  justifyContent: 'space-between',
}));

const StyledDivider = styled(Divider)({
  flexGrow: 1,
  margin: '10px 10px', // Ajusta el margen según necesites
});
