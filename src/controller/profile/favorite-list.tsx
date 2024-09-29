import { Box, Divider, Typography, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import UserFavoriteProductCard from '@webapp/components/user-favorite-product-card';
import { User } from '@webapp/sdk/types/user-types';
import { useSingleProduct } from '@webapp/store/products/product-by-id';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

interface FavoriteListProps {
  className?: string;
  userData: User;
}

const FavoriteList: React.FunctionComponent<FavoriteListProps> = ({ userData }) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const theme = useTheme();
  const { setProduct } = useSingleProduct();
  return (
    <Stack gap={4} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography
        variant="h4"
        fontWeight={600}
        fontSize={22}
        sx={{ mb: 0, color: theme.palette.grey[900], textAlign: 'center' }}
      >
        {formatMessage({ id: 'PROFILE.USER_INFO.FAVORITE.PRODUCTS' })}
      </Typography>
      <Divider sx={{ mb: 0 }} color="#000000" orientation="horizontal" />
      <Box
        sx={{
          width: '100%',
          maxHeight: 315,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {userData?.favorite_products?.map((product) => (
          <Box key={product.id} sx={{ width: '100%', padding: 2 }}>
            <UserFavoriteProductCard
              key={product.id}
              id={Number(product.id)}
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
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default FavoriteList;
