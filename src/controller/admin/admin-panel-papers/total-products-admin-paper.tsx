import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useAdminDataStore } from '@webapp/store/admin/admin-data';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import UseAnimations from 'react-useanimations';
import activity from 'react-useanimations/lib/activity';

import { CustomAdminPaper } from './papers-styles';
import { Product } from '@webapp/sdk/mutations/products/types';

const TotalProductsPaper: FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { products } = useAdminDataStore();

  const totalProductsInStock = Object.values(products).reduce((sum, product: Product) => {
    return sum + Number(product.actual_stock);
  }, 0);

  return (
    <CustomAdminPaper>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: 2,
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.grey[800],
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {formatMessage({ id: 'ADMIN.TOTAL.PRODUCTS.INSTOCK' })}
        </Typography>

        <Paper
          sx={{
            display: 'flex',
            border: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <UseAnimations autoPlay={true} animation={activity} size={40} pathCss="stroke: #306FB7; stroke-width: 12%;" />
          <Typography
            variant="h2"
            sx={{
              color: theme.palette.grey[800],
              fontWeight: 'bold',
              textAlign: 'center',
              padding: 4,
            }}
          >
            {totalProductsInStock}
          </Typography>
        </Paper>
      </Box>
    </CustomAdminPaper>
  );
};

export default TotalProductsPaper;
