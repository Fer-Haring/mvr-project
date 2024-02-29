import { Box, Divider, Stack, Typography, styled, useTheme } from '@mui/material';
import DestacatedProductCard from '@webapp/mobile/components/destacated-product-card';
import { Products } from '@webapp/sdk/users-types';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { FunctionComponent, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SimilarProductsProps {
  productList: Products[];
  selectedProduct: Products;
}

const SimilarProducts: FunctionComponent<SimilarProductsProps> = ({ productList, selectedProduct }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { setProduct } = useSingleProduct();

  const similarProducts = useMemo(() => {
    // Filtra productos por la misma categoría, excluyendo el producto actual
    const filteredProducts = Object.values(productList).filter(
      (product) =>
        product.mainProductCategory === selectedProduct.mainProductCategory &&
        product.productId !== selectedProduct.productId
    );
    const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, 4);
  }, [productList, selectedProduct]);

  return (
    <Stack direction="column" spacing={3} width={'100%'}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3, mt: 6, fontSize: 28, fontWeight: 600 }}>
        {formatMessage({ id: 'PRODUCT.DETAIL.SIMILAR.PRODUCTS' })}
      </Typography>
      <Divider sx={{ backgroundColor: theme.palette.common.white, height: 2 }} component={Box} />
      <Wrapper>
        <Swiper
          // navigation
          spaceBetween={30}
          centeredSlides={true}
          slidesPerView={1.5}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {similarProducts.map((product, id) => (
            <SwiperSlide key={id} virtualIndex={id}>
              <DestacatedProductCard
                key={id}
                id={id}
                image={''}
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
      </Wrapper>
    </Stack>
  );
};

export default SimilarProducts;

const Wrapper = styled(Box)(() => ({
  width: '100%',
  overflow: 'hidden',
  '&. swiper-wrapper': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    padding: 0,
    margin: 1,
  },
}));
