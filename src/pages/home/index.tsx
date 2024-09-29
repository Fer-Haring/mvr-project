import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { CircularProgress, styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@webapp/components/button';
import ContentWrapper from '@webapp/components/content-wrapper';
import ProductCardV2 from '@webapp/components/product-card-V2';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useGetDollarValue } from '@webapp/sdk/mutations/admin/get-dollar-value-query';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { useAdminDataStore } from '@webapp/store/admin/admin-data';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { setDollarValue } = useDollarValue();
  const { setProduct } = useSingleProduct();
  const { setUsers, setOrders } = useAdminDataStore();
  const { productList, setProductList } = useProductsListData();
  const productListArray = useProductListQuery(1, 500);
  const products = Object.values(productList);
  const featuredProducts = products.filter((product) => product.featured === true);
  const getDollar = useGetDollarValue();

  useEffect(() => {
    setProductList(productListArray.data?.products || []);
  }, [productListArray.data?.products, setOrders, setProductList, setUsers]);

  useEffect(() => {
    if (getDollar.isSuccess) {
      setDollarValue(getDollar.data?.venta || 0);
    }
  }, [getDollar.data?.venta, getDollar.isSuccess, setDollarValue]);

  return (
    <ContentWrapper>
      <Stack direction={'column'} gap={6} width={'100%'} zIndex={10}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack direction={'column'} gap={2} height={isMobile ? '30vh' : '40vh'}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'WordMean',
                fontSize: isMobile ? '8vw' : '5vw',
                color: theme.palette.common.white,
              }}
            >
              {formatMessage({ id: 'WELCOME.HOME.MESSAGE' })}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                textWrap: 'wrap',
                textOverflow: 'ellipsis',
                width: isMobile ? '80vw' : '50%',
                fontSize: isMobile ? '4vw' : '2vw',
                color: theme.palette.common.white,
              }}
            >
              {formatMessage({ id: 'WELCOME.HOME.DESCRIPTION' })}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/productos')}
              sx={{
                width: isMobile ? '75vw' : '60vw',
                marginTop: theme.spacing(4),
                marginLeft: theme.spacing(4),
                fontSize: 16,
              }}
            >
              {formatMessage({ id: 'WELCOME.HOME.BUTTON' })}
              <ArrowForwardRoundedIcon sx={{ marginLeft: 2, width: 16, height: 16 }} />
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              marginBottom: theme.spacing(4),
              textDecoration: 'underline',
              fontSize: isMobile ? '5vw' : 36,
              fontFamily: 'WordMean',
              letterSpacing: 4,
              color: theme.palette.common.white,
            }}
          >
            {formatMessage({ id: 'WELCOME.HOME.FEATURED.PRODUCTS.TITLE' })}
          </Typography>
          {productListArray.isLoading ? (
            <CircularProgress
              size={60}
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          ) : (
            <StockWrapper key={featuredProducts.map((product) => product.id).join('')} isMobile={isMobile}>
              {featuredProducts.map((product, id) =>
                product.actual_stock > 0 ? (
                  <ProductCardV2
                    key={product.id}
                    id={id}
                    product={product}
                    image={product.product_image || ''}
                    name={product.product_name}
                    description={product.description}
                    price={product.sale_price}
                    currency={product.price_currency}
                    onClick={() => {
                      setProduct(product);
                      navigate(`/productos/${product.id}`);
                    }}
                  />
                ) : null
              )}
            </StockWrapper>
          )}
        </Box>
      </Stack>
    </ContentWrapper>
  );
};

export const StockWrapper = styled(motion.ul)<{
  isMobile: boolean;
}>(({ theme, isMobile }) => ({
  display: isMobile ? 'flex' : 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(1, 1fr)',
  gridGap: theme.spacing(4),
  flexDirection: isMobile ? 'column' : 'row',
  width: '100%',
  padding: 0,
  margin: 0,
}));
