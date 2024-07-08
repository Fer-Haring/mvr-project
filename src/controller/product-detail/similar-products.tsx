import { Box, Divider, Stack, Typography, styled, useTheme } from '@mui/material';
import ProductCard from '@webapp/components/product-card';
import { Product } from '@webapp/sdk/types/products-types';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import { motion } from 'framer-motion';
import React, { FunctionComponent, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

interface SimilarProductsProps {
  productList: Product[];
  selectedProduct: Product;
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
        product.main_product_category === selectedProduct.main_product_category && product.id !== selectedProduct.id
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
        {similarProducts.map((product, id) => (
          <ProductCard
            key={id}
            id={id}
            image={''}
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
