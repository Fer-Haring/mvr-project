import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import VapeHomeImage from '@webapp/assets/images/home/liquid-home.png';
import Button from '@webapp/components/button';
import ContentWrapper from '@webapp/components/content-wrapper';
import ProductCard from '@webapp/components/product-card';
import { getCompletedOrders, getDollarValue } from '@webapp/sdk/firebase/admin';
import { getProducts } from '@webapp/sdk/firebase/products';
import { getAllUsers } from '@webapp/sdk/firebase/user';
import { CompletedOrder, Products, User } from '@webapp/sdk/users-types';
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
  const { setUsers, setProducts, setOrders } = useAdminDataStore();
  const { productList, setProductList } = useProductsListData();
  const products = Object.values(productList);
  const destacatedProducts = products.filter((product) => product.destacated === 'Si');

  useEffect(() => {
    getProducts().then((products: Products[]) => {
      if (products) {
        setProductList(products);
        setProducts(products);
      }
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const dollarVal = await getDollarValue();
      setDollarValue(dollarVal?.value);
    };

    fetchProduct();
  }, [setDollarValue]);

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
            {formatMessage({ id: 'WELCOME.HOME.DESTACATED.PRODUCTS.TITLE' })}
          </Typography>
          <StockWrapper key={destacatedProducts.map((product) => product.productId).join('')}>
            {destacatedProducts.map((product, id) => (
              <ProductCard
                key={id}
                id={id}
                products={[product]}
                image={product.productImage || ''}
                name={product.productName}
                description={product.description}
                price={product.salePrice}
                currency={product.priceCurrency}
                onClick={() => {
                  setProduct(product);
                  navigate(`/productos/${product.productId}`);
                }}
              />
            ))}
          </StockWrapper>
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
