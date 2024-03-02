import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import Stack from '@mui/system/Stack';
import { CartItem, Order } from '@webapp/sdk/users-types';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import { useCartStore } from '@webapp/store/cart/cart';
import { FunctionComponent, useEffect } from 'react';
import { useIntl } from 'react-intl';

interface CartProductsDetailProps {
  className?: string;
  cartProducts?: CartItem[];
  order?: Order;
  setOrder: (order: Order) => void;
}

export const CartProductsDetail: FunctionComponent<CartProductsDetailProps> = ({ cartProducts, order, setOrder }) => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const { dollarValue } = useDollarValue();
  const { addToCart, removeFromCart } = useCartStore();

  const subTotalValue = (price: number, priceCurrency: string) => {
    if (priceCurrency === 'ARS') {
      return `$ ${price} ARS`;
    } else if (priceCurrency === 'USD') {
      const convertedPrice = Number(price * Number(dollarValue.value));
      return `$ ${price} USD = ${convertedPrice.toFixed(2)} ARS`;
    }
  };

  const unitValue = (price: number, priceCurrency: string) => {
    if (priceCurrency === 'ARS') {
      return `$ ${price} ARS`;
    } else if (priceCurrency === 'USD') {
      return `$ ${price} USD`;
    }
  };

  useEffect(() => {
    if (!cartProducts || cartProducts.length === 0) {
      setOrder({
        ...order,
        totalProducts: order?.totalProducts ? order.totalProducts : 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts, dollarValue.value, setOrder]);

  return (
    <Stack direction={'column'} gap={2} width={'100%'}>
      {cartProducts?.map((cartProduct) => (
        <Stack gap={3} sx={{ width: '100%' }} key={cartProduct.productId}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600} fontSize={18} sx={{ mb: 0, color: theme.palette.grey[900] }}>
              {formatMessage({ id: 'CART.HEADER.NAME' })}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={400}
              fontSize={16}
              sx={{
                mb: 0,
                color: theme.palette.grey[900],
                textWrap: 'wrap',
                maxWidth: 200,
                width: '100%',
                textAlign: 'right',
              }}
            >
              {cartProduct.productName}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600} fontSize={18} sx={{ mb: 0, color: theme.palette.grey[900] }}>
              {formatMessage({ id: 'CART.HEADER.QUANTITY' })}
            </Typography>
            <Stack direction={'row'} gap={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconButton
                size="small"
                onClick={() => removeFromCart(cartProduct.productId)}
                aria-label="Disminuir cantidad"
              >
                <RemoveCircleOutlineRoundedIcon sx={{ width: 18, height: 18, color: theme.palette.grey[800] }} />
              </IconButton>
              <Typography variant="h6" fontWeight={400} fontSize={16} sx={{ mb: 0, color: theme.palette.grey[900] }}>
                {cartProduct.unitQuantity}
              </Typography>
              <IconButton
                size="small"
                onClick={() => {
                  addToCart(cartProduct, 1);
                }}
                aria-label="Aumentar cantidad"
              >
                <AddCircleOutlineRoundedIcon sx={{ width: 18, height: 18, color: theme.palette.grey[800] }} />
              </IconButton>
            </Stack>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600} fontSize={18} sx={{ mb: 0, color: theme.palette.grey[900] }}>
              {formatMessage({ id: 'CART.HEADER.PRICE' })}
            </Typography>
            <Typography variant="h6" fontWeight={400} fontSize={16} sx={{ mb: 0, color: theme.palette.grey[900] }}>
              {unitValue(cartProduct.unitPrice, cartProduct.priceCurrency)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600} fontSize={18} sx={{ mb: 0, color: theme.palette.grey[900] }}>
              {formatMessage({ id: 'CART.HEADER.SUBTOTAL' })}
            </Typography>
            <Typography variant="h6" fontWeight={400} fontSize={16} sx={{ mb: 0, color: theme.palette.grey[900] }}>
              {subTotalValue(cartProduct.unitPrice * cartProduct.unitQuantity, cartProduct.priceCurrency)}
            </Typography>
          </Box>
          <Divider />
        </Stack>
      ))}
    </Stack>
  );
};
