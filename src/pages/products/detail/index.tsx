import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { FormControl, MenuItem, Select, SelectChangeEvent, alpha, styled, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import ContentWrapper from '@webapp/components/content-wrapper';
import SnackbarUtils from '@webapp/components/snackbar';
import ProductImageHolder from '@webapp/controller/product-detail/product-image-holder';
import SimilarProducts from '@webapp/controller/product-detail/similar-products';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useAddToCart } from '@webapp/sdk/mutations/cart/add-to-cart-mutation';
import { useGetUserCart } from '@webapp/sdk/mutations/cart/get-cart-query';
import { useGetProductById } from '@webapp/sdk/mutations/products/get-product-by-id-query';
import { CartItem } from '@webapp/sdk/types/cart-types';
import { Product } from '@webapp/sdk/types/products-types';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

export const ProductDetailPage: FunctionComponent = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const { formatMessage } = useIntl();
  const isMobile = useIsMobile();
  const { product, setProduct } = useSingleProduct();
  const { productList } = useProductsListData();
  const stockNumber = product?.actual_stock || 0;
  const [selectedQuantity, setSelectedQuantity] = useState('1');
  const { data: productById, isLoading } = useGetProductById(id!);
  const { mutateAsync: addToCartMutation, isPending } = useAddToCart();
  const getCart = useGetUserCart();

  const handleQuantityChange = (event: SelectChangeEvent<string>) => {
    setSelectedQuantity(event.target.value);
  };

  useEffect(() => {
    if (id && !isLoading && productById) {
      if (id !== product?.id) {
        setProduct(productById as Product);
      }
    }
  }, [id, isLoading, productById, product, setProduct]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem: CartItem = {
      product_id: product?.id,
      product_name: product?.product_name,
      unit_price: parseFloat(product?.sale_price),
      price_currency: product?.price_currency,
      product_category: product?.product_category,
      product_description: product?.description,
      sub_total: parseFloat(product?.sale_price) * parseInt(selectedQuantity, 10),
      product_image: product?.product_image,
      quantity: parseInt(selectedQuantity, 10),
    };
    addToCartMutation(cartItem).then(() => {
      getCart.refetch();
      SnackbarUtils.success(formatMessage({ id: 'PRODUCT.ADD.TO.CART.SUCCESS' }));
    });
  };

  const options = [];
  for (let i = 1; i <= stockNumber; i++) {
    options.push(
      <MenuItem
        key={i}
        value={i}
        sx={{
          color: theme.palette.grey[900],
        }}
      >
        {i}
      </MenuItem>
    );
  }

  return (
    <ContentWrapper key={id}>
      <Typography variant="h4" fontWeight={600} sx={{ mb: 2 }}>
        {formatMessage({ id: 'PRODUCT.DETAIL.TITLE' })}
      </Typography>
      <Stack
        sx={{
          mt: 1,
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: theme.spacing(1),
          mb: theme.spacing(6),
        }}
      >
        <ProductImageHolder product={product} id={product?.id} />
        <Paper
          sx={{
            p: 2,
            width: '100%',
            mt: 0,
            maxWidth: 700,
            backgroundColor: alpha(theme.palette.common.white, 0.6),
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {stockNumber === 0 && (
            <OutOfStockOverlay>
              <Typography variant="h3" fontWeight={600} sx={{ color: theme.palette.error.main }}>
                {formatMessage({ id: 'PRODUCT.DETAIL.NO.STOCK' })}
              </Typography>
            </OutOfStockOverlay>
          )}
          <Stack
            sx={{
              mt: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="h2" fontWeight={600} sx={{ mb: 2, color: theme.palette.grey[900], fontSize: 39 }}>
              {product?.product_name}
            </Typography>
            <Typography variant="h4" fontWeight={400} sx={{ mb: 2, color: theme.palette.grey[700] }}>
              {product?.description}
            </Typography>
          </Stack>

          <Stack
            sx={{
              mt: 3,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="body1" fontWeight={400} sx={{ color: theme.palette.grey[800] }}>
              {formatMessage({ id: 'PRODUCT.DETAIL.UNIT.PRICE' })}
            </Typography>
            {product?.price_currency === 'USD' ? (
              <Typography variant="h3" fontWeight={600} sx={{ mb: 2, color: theme.palette.grey[900] }}>
                ${product?.sale_price} USD
              </Typography>
            ) : (
              <Typography variant="h3" fontWeight={600} sx={{ mb: 2, color: theme.palette.grey[900] }}>
                ${product?.sale_price} ARS
              </Typography>
            )}
          </Stack>

          <Stack
            sx={{
              mt: 3,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="body1"
              fontWeight={400}
              sx={{ color: theme.palette.grey[800], textAlign: 'center', p: 2 }}
            >
              {formatMessage({ id: 'PRODUCT.DETAIL.SELECT.QUANTITY' })}
            </Typography>
            <FormControl fullWidth sx={{ maxWidth: 100 }}>
              <CustomSelect
                labelId="product-quantity-select-label"
                id="quantity-select"
                onChange={(e) => {
                  handleQuantityChange(e as SelectChangeEvent<string>);
                }}
                displayEmpty
                sx={{ width: '100%', maxWidth: 300, color: theme.palette.grey[900] }}
                value={selectedQuantity}
                defaultValue={selectedQuantity}
                disabled={stockNumber === 0}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                      width: 'fit-content',
                      borderRadius: theme.spacing(0.5),
                    },
                  },
                }}
              >
                {options}
              </CustomSelect>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              loading={isPending}
              startIcon={<ShoppingCartRoundedIcon />}
              sx={{
                ml: 2,
                ':hover': {
                  color: theme.palette.grey[200],
                },
              }}
              onClick={handleAddToCart}
            >
              {formatMessage({ id: 'PRODUCT.ADD.TO.CART' })}
            </Button>
          </Stack>
        </Paper>
      </Stack>
      <Stack direction={'row'} width={'100%'}>
        <SimilarProducts productList={productList} selectedProduct={product} />
      </Stack>
    </ContentWrapper>
  );
};

const CustomSelect = styled(Select)(({ theme }) => ({
  height: theme.spacing(5),
  minHeight: theme.spacing(1),
  borderRadius: theme.spacing(0.5),
  width: 'auto',
  border: 'none',
  backgroundColor: theme.palette.grey[200],
  '.MuiSelect-select': {
    height: 'auto',
    borderRadius: theme.spacing(0.5),
    width: 180,
    backgroundColor: 'transparent',

    '&:focus-within': {
      borderRadius: theme.spacing(0.5),
      borderColor: theme.palette.grey[800],
    },
  },
  '& label.MuiInputLabel-root': {
    fontSize: 16,
    color: theme.palette.grey[800],
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.grey[800],
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: theme.spacing(0.5),
    borderColor: theme.palette.grey[800],
  },
  '& .MuiOutlinedInput-root': {
    '& input': {
      color: theme.palette.grey[800],
    },
  },
  '& .MuiMenuItem-root': {
    color: theme.palette.grey[800],
  },
  '& .MuiSelect-select.MuiSelect-select': {
    color: theme.palette.grey[800],
  },
}));

const OutOfStockOverlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.common.white, 0.6),
  zIndex: 1,
  borderRadius: theme.shape.borderRadius,
}));
