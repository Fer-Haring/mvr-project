import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import Button from '@webapp/mobile/components/button';
import ContentWrapper from '@webapp/mobile/components/content-wrapper';
import DestacatedProductCard from '@webapp/mobile/components/destacated-product-card';
import { getCompletedOrders, getDollarValue } from '@webapp/sdk/firebase/admin';
import { getProducts } from '@webapp/sdk/firebase/products';
import { getAllUsers } from '@webapp/sdk/firebase/user';
import { CompletedOrder, Products, User } from '@webapp/sdk/users-types';
import { useAdminDataStore } from '@webapp/store/admin/admin-data';
import { useDollarValue } from '@webapp/store/admin/dolar-value';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { useProductsListData } from '@webapp/store/products/products-list';
import { FunctionComponent, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

export const MobileHomePage: FunctionComponent = () => {
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
          <Stack direction={'column'} gap={2}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'WordMean',
                fontSize: '35px',
              }}
            >
              {formatMessage({ id: 'WELCOME.HOME.MESSAGE' })}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textWrap: 'wrap',
                textOverflow: 'ellipsis',
                width: '100%',
                textShadow: ` 2px 3px 2px ${theme.palette.grey[800]}, 0 1em 1em #306FB7, 0.2em 0.2em 0.2em #306FB7`,
              }}
            >
              {formatMessage({ id: 'WELCOME.HOME.DESCRIPTION' })}
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', p: 4 }}>
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
            </Box>
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
              fontSize: 22,
              fontFamily: 'WordMean',
              letterSpacing: 4,
            }}
          >
            {formatMessage({ id: 'WELCOME.HOME.DESTACATED.PRODUCTS.TITLE' })}
          </Typography>
          <Box
            sx={{
              width: '100%',
              overflow: 'hidden',
              '&. swiper-wrapper': {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                padding: 2,
                margin: 2,
              },
            }}
          >
            <Swiper
              // navigation
              spaceBetween={30}
              centeredSlides={true}
              slidesPerView={1.5}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {destacatedProducts.map((product, index) => (
                <SwiperSlide key={index} virtualIndex={index}>
                  <DestacatedProductCard
                    key={index}
                    id={index}
                    products={[product]}
                    image={product.productImage}
                    name={product.productName}
                    description={product.description}
                    price={product.salePrice}
                    currency={product.priceCurrency}
                    onClick={() => {
                      setProduct(product);
                      navigate(`/productos/${product.productId}`);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Stack>
    </ContentWrapper>
  );
};
