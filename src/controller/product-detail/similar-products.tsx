import { Box, Divider, Stack, Typography, styled, useTheme } from '@mui/material';
import ProductCard from '@webapp/components/product-card';
import { Products } from '@webapp/sdk/users-types';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { motion } from 'framer-motion';
import { FunctionComponent, useMemo } from 'react';
import { useIntl } from 'react-intl';

interface SimilarProductsProps {
  productList: Products[];
  selectedProduct: Products;
}

const SimilarProducts: FunctionComponent<SimilarProductsProps> = ({ productList, selectedProduct }) => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const { setProduct } = useSingleProduct();

  const similarProducts = useMemo(() => {
    // Filtra productos por la misma categoría, excluyendo el producto actual
    const filteredProducts = Object.values(productList).filter(
      (product) =>
        product.productCategory === selectedProduct.productCategory && product.productId !== selectedProduct.productId
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
        {similarProducts.map((product) => (
          <ProductCard
            id={product.productId}
            image={''}
            name={product.productName}
            description={product.description}
            price={product.salePrice}
            currency={product.priceCurrency}
            onClick={() => {
              setProduct(product);
            }}
          />
        ))}
      </Wrapper>
    </Stack>
  );
};

export default SimilarProducts;

const Wrapper = styled(motion.ul)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(19.75rem, 100%), 1fr))',
  gridGap: theme.spacing(4),
  width: '100%',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  '& > li': {
    width: '100%',
  },
}));
