import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { useAdminDataStore } from '@webapp/store/admin/admin-data';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import UseAnimations from 'react-useanimations';
import activity from 'react-useanimations/lib/activity';

import { CustomAdminPaper } from './papers-styles';

const TotalProductsPaper: FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { products } = useAdminDataStore();

  const totalProductsInStock = Object.values(products).reduce((sum, product) => {
    // Asegúrate de que actualStock es un número. Si no es un número o es undefined, usa 0.
    const stock = Number(product.actualStock);
    return sum + (isNaN(stock) ? 0 : stock);
  }, 0);

  return (
    <CustomAdminPaper>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
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
          {formatMessage({ id: 'ADMIN.TOTAL.PRODUCTS.INSTOCK.MOBILE' })}
        </Typography>

        <UseAnimations autoPlay={true} animation={activity} size={40} pathCss="stroke: #306FB7; stroke-width: 12%;" />
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.grey[800],
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 1,
          }}
        >
          {totalProductsInStock}
        </Typography>
      </Box>
    </CustomAdminPaper>
  );
};

export default TotalProductsPaper;
