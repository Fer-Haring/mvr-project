import { Box, Divider, Paper, Stack, Typography, alpha, styled, useTheme } from '@mui/material';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { CartItem } from '@webapp/service/types/cart-types';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import { useMessageStore } from '@webapp/store/admin/message-store';
// import { useCompletedOrdersStore } from '@webapp/store/orders/get-completed-orders';
import React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface CartProductsDetailProps {
  className?: string;
  cartProducts: CartItem[];
  address: string;
  city: string;
}

export const CartPaymentDetail: FunctionComponent<CartProductsDetailProps> = ({ cartProducts, address, city }) => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { formatMessage } = useIntl();
  const { dollarValue } = useDollarValue();
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const { order, setOrder } = useMessageStore();

  // Calculamos los totales cuando cambian los productos
  useEffect(() => {
    const calculateTotals = () => {
      let totalARS = 0;
      let totalUSD = 0;

      cartProducts.forEach((product) => {
        const price = Number(product.sub_total) || 0;
        if (product.price_currency === 'USD') {
          totalUSD += price;
          totalARS += price * Number(dollarValue.value);
        } else {
          totalARS += price;
          totalUSD += price / Number(dollarValue.value);
        }
      });

      // Redondeamos a 2 decimales
      totalARS = Math.round(totalARS * 100) / 100;
      totalUSD = Math.round(totalUSD * 100) / 100;

      // Agregamos el costo de envío (siempre en ARS)
      const deliveryCost = Number(order.delivery_cost || 0);
      totalARS += deliveryCost;
      totalUSD += deliveryCost / Number(dollarValue.value);

      return {
        totalARS: Math.round(totalARS * 100) / 100,
        totalUSD: Math.round(totalUSD * 100) / 100,
        subTotal: order.currency_used_to_pay === 'USD' ? totalUSD : totalARS,
      };
    };

    const { totalARS, totalUSD, subTotal } = calculateTotals();
    setSubTotal(subTotal);
    setTotalCartValue(order.currency_used_to_pay === 'USD' ? totalUSD : totalARS);

    // Actualizamos la orden con los nuevos totales
    if (address && city) {
      setOrder({
        ...order,
        delivery_zone: `${address}, ${city}`,
        total_order_amount_ars: totalARS,
        total_order_amount_usd: totalUSD,
      });
    }
  }, [cartProducts, dollarValue.value, order.delivery_cost, order.currency_used_to_pay, address, city]);

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
          flexDirection: isMobile ? 'column' : 'row',
          gap: 4,
          width: '100%',
          pt: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack direction={'column'} gap={4} width={'100%'}>
          <Stack direction={isMobile ? 'row' : 'column'} gap={2} width={'100%'}>
            <TextsContainer>
              <CustomTypography variant="h5">{formatMessage({ id: 'CART.PAYMENT.DETAILS.ADDRESS' })}</CustomTypography>
              <CustomTypography variant="subtitle1">
                {address}, {city}
              </CustomTypography>
            </TextsContainer>
            <TextsContainer>
              <CustomTypography variant="h5">{formatMessage({ id: 'CART.PAYMENT.DETAILS.PAYMENT' })}</CustomTypography>
              <CustomTypography variant="subtitle1">{order.payment_method}</CustomTypography>
            </TextsContainer>
          </Stack>
          <Stack direction={isMobile ? 'row' : 'column'} gap={2} width={'100%'}>
            <TextsContainer>
              <CustomTypography variant="h5">
                {formatMessage({ id: 'CART.PAYMENT.DETAILS.DELIVER.TYPE' })}
              </CustomTypography>
              <CustomTypography variant="subtitle1">{order.delivery_type}</CustomTypography>
            </TextsContainer>
            <TextsContainer>
              <CustomTypography variant="h5">
                {formatMessage({ id: 'CART.PAYMENT.DETAILS.SLECTED.CURRENCY' })}
              </CustomTypography>
              {order.currency_used_to_pay === 'USD' ? (
                <CustomTypography variant="subtitle1">{formatMessage({ id: 'CART.PAYMENT.USD' })}</CustomTypography>
              ) : (
                <CustomTypography variant="subtitle1">{formatMessage({ id: 'CART.PAYMENT.ARS' })}</CustomTypography>
              )}
            </TextsContainer>
          </Stack>
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
            <CustomTypography variant="h5">$ {order.delivery_cost}</CustomTypography>
          </TextsRowContainer>

          <Stack direction={'row'} gap={2} width={'100%'} sx={{ marginTop: 10 }}>
            <TextsRowContainer>
              <CustomTypography sx={{ fontSize: 24, fontWeight: 'bold' }} variant="subtitle1">
                {formatMessage({ id: 'CART.PAYMENT.DETAILS.TOTAL' })}
              </CustomTypography>
              <StyledDivider orientation="horizontal" flexItem />
              {order.currency_used_to_pay === 'USD' ? (
                <CustomTypography sx={{ fontSize: 24, fontWeight: 'bold' }} variant="subtitle1">
                  $ {(totalCartValue / Number(dollarValue.value)).toFixed(2)}
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
