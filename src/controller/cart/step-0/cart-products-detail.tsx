import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  useTheme,
} from '@mui/material';
import Stack from '@mui/system/Stack';
import { CartItem, Order } from '@webapp/sdk/types/user-types';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import { useCartStore } from '@webapp/store/cart/cart';
import { FunctionComponent, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { TableBox } from '../table-styles';

// import { useNavigate } from 'react-router-dom';

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
      <TableContainer component={TableBox}>
        <Table sx={{ width: '100%', border: 'none' }}>
          <TableHead>
            <TableRow>
              <CustomTableHeaderCell>{formatMessage({ id: 'CART.HEADER.NAME' })}</CustomTableHeaderCell>
              <CustomTableHeaderCell>{formatMessage({ id: 'CART.HEADER.QUANTITY' })}</CustomTableHeaderCell>
              <CustomTableHeaderCell>{formatMessage({ id: 'CART.HEADER.PRICE' })}</CustomTableHeaderCell>
              <CustomTableHeaderCell>{formatMessage({ id: 'CART.HEADER.SUBTOTAL' })}</CustomTableHeaderCell>
            </TableRow>
          </TableHead>
          <Box sx={{ height: 30 }} />
          <TableBody>
            {cartProducts?.map((cartProduct) => (
              <TableRow key={cartProduct.productId}>
                <TableCell>{cartProduct.productName}</TableCell>
                <TableCell>
                  <Stack
                    direction={'row'}
                    gap={1}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => removeFromCart(cartProduct.productId)}
                      aria-label="Disminuir cantidad"
                    >
                      <RemoveCircleOutlineRoundedIcon sx={{ width: 18, height: 18, color: theme.palette.grey[800] }} />
                    </IconButton>
                    {cartProduct.unitQuantity}
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
                </TableCell>
                <TableCell>{unitValue(cartProduct.unitPrice, cartProduct.priceCurrency)}</TableCell>
                <TableCell>
                  {subTotalValue(cartProduct.unitPrice * cartProduct.unitQuantity, cartProduct.priceCurrency)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

const CustomTableHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontWeight: 'bold',
  fontSize: 18,
  maxWidth: 200,
  width: '100%',
  padding: 10,
  textWrap: 'nowrap',
  textAlign: 'center',
  '&:first-of-type': {
    textAlign: 'left',
  },
}));
