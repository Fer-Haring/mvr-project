import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import { CompletedOrder } from '@webapp/sdk/types/user-types';
import statisticsAnimation from '@webapp/assets/images/animations/statistics.json';
import { useAdminDataStore } from '@webapp/store/admin/admin-data';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import Lottie from 'react-lottie';

import { CustomAdminPaper } from './papers-styles';

type TotalsByCurrency = {
  [key: string]: number;
};

const TotalSalesPaper: FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { orders } = useAdminDataStore();
  const totalsByCurrency: TotalsByCurrency = {};

  Object.values(orders).forEach((order) => {
    order.cartItems?.forEach((item) => {
      const currency = item.priceCurrency;
      const subTotal = Number(item.subTotal);
      if (totalsByCurrency[currency]) {
        totalsByCurrency[currency] += subTotal;
      } else {
        totalsByCurrency[currency] = subTotal;
      }
    });
  });

  Object.keys(totalsByCurrency).forEach((currency) => {
    const value = totalsByCurrency[currency];
    const formattedValue = value.toFixed(2);
    totalsByCurrency[currency] = parseFloat(formattedValue);
  });

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
          {formatMessage({ id: 'ADMIN.TOTAL.SALES.AMOUNT' })}
        </Typography>

        <Paper
          sx={{
            display: 'flex',
            border: 0,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
          }}
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: statisticsAnimation,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={50}
            width={40}
            style={{ margin: '0' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="h3"
              sx={{
                color: theme.palette.grey[800],
                fontWeight: 'bold',
                textAlign: 'right',
                fontSize: 16,
                paddingLeft: theme.spacing(3),
              }}
            >
              {totalsByCurrency.USD ? `$ ${totalsByCurrency.USD} USD` : '$ 0 USD'}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: theme.palette.grey[800],
                fontWeight: 'bold',
                textAlign: 'right',
                fontSize: 16,
                paddingLeft: theme.spacing(3),
              }}
            >
              {totalsByCurrency.ARS ? `$ ${totalsByCurrency.ARS} ARS` : '$ 0 ARS'}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </CustomAdminPaper>
  );
};

export default TotalSalesPaper;
