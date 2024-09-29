import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import {
  Box,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  styled,
  useTheme,
} from '@mui/material';
import Stack from '@mui/system/Stack';
import NoImageProd from '@webapp/assets/images/prod-no-image.png';
import SnackbarUtils from '@webapp/components/snackbar';
import { useAddToCart } from '@webapp/sdk/mutations/cart/add-to-cart-mutation';
import { useGetUserCart } from '@webapp/sdk/mutations/cart/get-cart-query';
import { CartItem } from '@webapp/sdk/types/cart-types';
import { OrderRequest } from '@webapp/sdk/types/orders-types';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { TableBox } from '../table-styles';

interface CartProductsDetailProps {
  className?: string;
  cartProducts?: CartItem[];
  order?: OrderRequest;
  setOrder: (order: OrderRequest) => void;
}

export const CartProductsDetail: FunctionComponent<CartProductsDetailProps> = ({ cartProducts }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { dollarValue } = useDollarValue();
  const { mutateAsync, isPending } = useAddToCart();
  const getCart = useGetUserCart();
  const [localCartProducts, setLocalCartProducts] = useState<CartItem[]>(cartProducts || []);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

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
    if (cartProducts) {
      setLocalCartProducts(cartProducts);
    }
  }, [cartProducts]);

  const updateQuantity = (cartProduct: CartItem, quantityChange: number) => {
    const updatedCartProducts = localCartProducts.map((item) =>
      item.product_id === cartProduct.product_id
        ? {
            ...item,
            quantity: Math.max(item.quantity + quantityChange, 0),
            sub_total: item.unit_price * Math.max(item.quantity + quantityChange, 0),
          }
        : item
    );

    if (cartProduct.quantity === 1 && quantityChange === -1) {
      // Si la cantidad es 1 y se está disminuyendo, eliminar el producto del carrito
      const filteredCartProducts = localCartProducts.filter((item) => item.product_id !== cartProduct.product_id);
      setLocalCartProducts(filteredCartProducts);
      SnackbarUtils.info(formatMessage({ id: 'CART.PRODUCT.REMOVED' }));
    } else {
      setLocalCartProducts(updatedCartProducts);

      // Mostrar el snack adecuado para aumento o disminución
      if (quantityChange > 0) {
        SnackbarUtils.success(formatMessage({ id: 'CART.PRODUCT.QUANTITY.INCREASED' }));
      } else if (quantityChange < 0) {
        SnackbarUtils.success(formatMessage({ id: 'CART.PRODUCT.QUANTITY.DECREASED' }));
      }
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const updatedCartProduct = updatedCartProducts.find((item) => item.product_id === cartProduct.product_id);
      if (updatedCartProduct) {
        mutateAsync({
          product_id: updatedCartProduct.product_id!,
          product_name: updatedCartProduct.product_name,
          unit_price: updatedCartProduct.unit_price,
          price_currency: updatedCartProduct.price_currency,
          sub_total: updatedCartProduct.sub_total,
          product_image: updatedCartProduct.product_image,
          quantity: updatedCartProduct.quantity,
          product_category: updatedCartProduct.product_category,
          product_description: updatedCartProduct.product_description,
        }).then(() => {
          getCart.refetch();
        });
      }
    }, 500);
  };

  const increaseQuantity = (cartProduct: CartItem) => {
    updateQuantity(cartProduct, 1);
  };

  const decreaseQuantity = (cartProduct: CartItem) => {
    updateQuantity(cartProduct, -1);
  };

  return (
    <Stack direction={'column'} gap={2} width={'100%'}>
      <TableContainer component={TableBox}>
        <Table sx={{ width: '100%', border: 'none' }}>
          <TableHead>
            <TableRow>
              <CustomTableHeaderImageCell />
              <CustomTableHeaderCell>{formatMessage({ id: 'CART.HEADER.NAME' })}</CustomTableHeaderCell>
              <CustomTableHeaderCell>{formatMessage({ id: 'CART.HEADER.QUANTITY' })}</CustomTableHeaderCell>
              <CustomTableHeaderCell>{formatMessage({ id: 'CART.HEADER.PRICE' })}</CustomTableHeaderCell>
              <CustomTableHeaderCell>{formatMessage({ id: 'CART.HEADER.SUBTOTAL' })}</CustomTableHeaderCell>
            </TableRow>
          </TableHead>
          <Box sx={{ height: 30 }} />
          <TableBody>
            {localCartProducts.map((cartProduct) => {
              return (
                <TableRow key={cartProduct.product_id}>
                  <TableCell
                    sx={{
                      width: 60, // Ajusta el ancho de la columna de imagen
                      padding: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 16,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={cartProduct.product_image === '' ? NoImageProd : cartProduct.product_image}
                        alt={cartProduct.product_name}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'cover',
                          aspectRatio: '1/1',
                          borderRadius: 16,
                        }}
                      />
                    </Box>
                  </TableCell>
                  <Tooltip title={formatMessage({ id: 'CART.TOOLTIP.PRODUCT.NAME' })} placement="top" arrow>
                    <TableCell
                      sx={{
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        height: '92px',
                        ':hover': {
                          color: theme.palette.grey[800],
                          fontSize: 16,
                        },
                        width: '30%', // Ajusta el ancho de la segunda columna
                      }}
                      onClick={() => {
                        navigate(`/productos/${cartProduct.product_id}`);
                      }}
                    >
                      {cartProduct.product_name}
                    </TableCell>
                  </Tooltip>
                  <TableCell>
                    <Stack
                      direction={'row'}
                      gap={1}
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <IconButton
                        size="small"
                        disabled={isPending}
                        onClick={() => {
                          decreaseQuantity(cartProduct);
                        }}
                        aria-label="Disminuir cantidad"
                      >
                        <RemoveCircleOutlineRoundedIcon
                          sx={{
                            width: 18,
                            height: 18,
                            color: isPending ? theme.palette.grey[200] : theme.palette.grey[800],
                          }}
                        />
                      </IconButton>
                      {isPending ? <CircularProgress size={15} /> : cartProduct.quantity}
                      <IconButton
                        size="small"
                        disabled={isPending}
                        onClick={() => {
                          increaseQuantity(cartProduct);
                        }}
                        aria-label="Aumentar cantidad"
                      >
                        <AddCircleOutlineRoundedIcon
                          sx={{
                            width: 18,
                            height: 18,
                            color: isPending ? theme.palette.grey[200] : theme.palette.grey[800],
                          }}
                        />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell>{unitValue(cartProduct.unit_price, cartProduct.price_currency)}</TableCell>
                  <TableCell>
                    {subTotalValue(cartProduct.unit_price * cartProduct.quantity, cartProduct.price_currency)}
                  </TableCell>
                </TableRow>
              );
            })}
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
  '&:nth-of-type(2)': {
    textAlign: 'left',
  },
}));

const CustomTableHeaderImageCell = styled(TableCell)(() => ({
  maxWidth: 50,
  width: 50,
  padding: 10,
}));
