import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import deliverAnimation from '@webapp/assets/images/animations/deliver.json';
import { useAdminDataStore } from '@webapp/store/admin/admin-data';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import Lottie from 'react-lottie';

import { CustomAdminPaper } from './papers-styles';

const TotalOrdersPaper: FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { orders } = useAdminDataStore();
  const totalOrders = Object.values(orders).length;

  return (
    <CustomAdminPaper>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: 1,
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
          {formatMessage({ id: 'ADMIN.TOTAL.ORDERS' })}
        </Typography>
          <Lottie
            style={{ margin: 0 }}
            options={{
              loop: true,
              autoplay: true,
              animationData: deliverAnimation,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={35}
            width={35}
          />
          <Typography
            variant="h2"
            sx={{
              color: theme.palette.grey[800],
              fontWeight: 'bold',
              textAlign: 'center',
              padding: theme.spacing(1),
            }}
          >
            {totalOrders}
          </Typography>
      </Box>
    </CustomAdminPaper>
  );
};

export default TotalOrdersPaper;
