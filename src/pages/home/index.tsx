/* eslint-disable react/react-in-jsx-scope */
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { CircularProgress, styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import VapeHomeImage from '@webapp/assets/images/home/liquid-home.png';
import Button from '@webapp/components/button';
import ContentWrapper from '@webapp/components/content-wrapper';
import ProductCard from '@webapp/components/product-card';
import { getCompletedOrders } from '@webapp/sdk/firebase/admin';
import { getAllUsers } from '@webapp/sdk/firebase/user';
import { useGetDollarValue } from '@webapp/sdk/mutations/admin/get-dollar-value-query';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { CompletedOrder, User } from '@webapp/sdk/types/user-types';
import { useAdminDataStore } from '@webapp/store/admin/admin-data';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import { motion } from 'framer-motion';
import { FunctionComponent, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export const HomePage: FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const theme = useTheme();
  const { setDollarValue } = useDollarValue();
  const { setProduct } = useSingleProduct();
  const { setUsers, setOrders } = useAdminDataStore();
  const { productList, setProductList } = useProductsListData();
  const productListArray = useProductListQuery(1, 500);
  const products = Object.values(productList);
  const featuredProducts = products.filter((product) => product.featured === true);
  const getDollar = useGetDollarValue();

  console.log(getDollar);

  useEffect(() => {
    setProductList(productListArray.data?.products || []);
    getAllUsers().then((users: User[]) => {
      if (users) {
        setUsers(users);
      }
    });
    getCompletedOrders().then((orders: CompletedOrder[]) => {
      if (orders) {
        setOrders(orders);
      }
    });
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
          }}
        >
          <Stack direction={'column'} gap={2} height={'45vh'}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'WordMean',
                fontSize: '65px',
              }}
            >
              {formatMessage({ id: 'WELCOME.HOME.MESSAGE' })}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                textWrap: 'wrap',
                textOverflow: 'ellipsis',
                width: '50%',
              }}
            >
              {formatMessage({ id: 'WELCOME.HOME.DESCRIPTION' })}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/productos')}
              sx={{
                width: '150px',
                marginTop: theme.spacing(4),
                marginLeft: theme.spacing(4),
                ':hover': {
                  color: theme.palette.grey[200],
                },
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
              fontSize: 36,
              fontFamily: 'WordMean',
              letterSpacing: 4,
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
            <StockWrapper key={featuredProducts.map((product) => product.id).join('')}>
              {featuredProducts.map((product, id) => (
                <ProductCard
                  key={id}
                  id={id}
                  products={[product]}
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
              ))}
            </StockWrapper>
          )}
        </Box>
      </Stack>
      <Box
        sx={{
          position: 'absolute',
          right: 10,
          zIndex: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={VapeHomeImage}
          alt="Vape Home"
          style={{ width: '100%', height: '100%', filter: 'drop-shadow(20px 10px 24px #000000)' }}
        />
      </Box>
    </ContentWrapper>
  );
};

const StockWrapper = styled(motion.ul)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(12.75rem, 100%), 1fr))',
  gridGap: theme.spacing(4),
  width: '100%',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  '& > li': {
    width: '100%',
  },
}));
