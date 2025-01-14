import { Box, Divider, Paper, Stack, Typography, alpha, styled, useTheme } from '@mui/material';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { CartItem } from '@webapp/service/types/cart-types';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import { useMessageStore } from '@webapp/store/admin/message-store';
import { useCompletedOrdersStore } from '@webapp/store/orders/get-completed-orders';
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

  const { setOrders } = useCompletedOrdersStore();
  const {
    order,
    setOrder,
    shippingAddress,
    setShippingAddress,
    shippingCity,
    setShippingCity,
    shippingCost,
    setShippingCost,
  } = useMessageStore();

  useEffect(() => {
    const calculateTotal = (): number => {
      return cartProducts.reduce((acc, product) => {
        const price = Number(product.sub_total) || 0;
        const conversionRate = product.price_currency === 'USD' ? Number(dollarValue.value) || 1 : 1;
        const convertedValue = price * conversionRate;

        return acc + Math.round(convertedValue * 100) / 100;
      }, 0);
    };

    const subTotal = calculateTotal();
    const totalWithDelivery = subTotal + Number(shippingCost || 0);

    setTotalCartValue(totalWithDelivery);
    setSubTotal(subTotal);

    // Actualizamos el costo de envío en el store
    setShippingCost(Number(shippingCost || 0));
  }, [cartProducts, dollarValue, shippingCost]);

  useEffect(() => {
    if (totalCartValue > 0) {
      const totalUSD =
        order.currency_used_to_pay === 'USD' ? totalCartValue / Number(dollarValue.value) : totalCartValue;

      const roundedTotalUSD = Math.round(totalUSD * 100) / 100;

      // Actualizamos la orden con los nuevos valores
      const updatedOrder = {
        ...order,
        total_order_amount_ars: totalCartValue,
        total_order_amount_usd: roundedTotalUSD,
        delivery_cost: shippingCost,
        delivery_zone: `${shippingAddress}, ${shippingCity}`,
      };

      setOrder(updatedOrder);
      setOrders([updatedOrder]);
    }
  }, [totalCartValue, order.currency_used_to_pay, shippingAddress, shippingCity, shippingCost]);

  // Efecto para actualizar la dirección y ciudad de envío
  useEffect(() => {
    if (address) {
      setShippingAddress(address);
    }
    if (city) {
      setShippingCity(city);
    }
  }, [address, city, setShippingAddress, setShippingCity]);

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
                {shippingAddress}, {shippingCity}
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
            <CustomTypography variant="h5">$ {shippingCost}</CustomTypography>
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
