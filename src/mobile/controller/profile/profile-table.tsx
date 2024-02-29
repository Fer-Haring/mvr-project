import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import {
  Accordion,
  AccordionSummary,
  Box,
  AccordionDetails as MuiAccordionDetails,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { CompletedOrder } from '@webapp/sdk/users-types';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: '12px', // Establece tu padding deseado aquí
  // Intenta no usar !important a menos que sea absolutamente necesario
});

export const ProfileOrdersAccordions: FunctionComponent = () => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const { user } = useUserData();

  return (
    <Stack spacing={2} sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h4" fontWeight={600} fontSize={38} sx={{ mb: 5, color: theme.palette.grey[200] }}>
        {formatMessage({ id: 'COMMON.PROFILE.TABLE.TITLE' })}
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreRoundedIcon sx={{ color: theme.palette.grey[800] }} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {user.completedOrders ? (
            <Typography
              variant="h6"
              fontWeight={600}
              fontSize={'4vw'}
              sx={{ mb: 0, pr: 5, color: theme.palette.grey[900] }}
            >
              {formatMessage({ id: 'PROFILE.USER.ACCORDIONS.TITLE' })}
            </Typography>
          ) : (
            <Typography
              variant="h6"
              fontWeight={600}
              fontSize={'4vw'}
              sx={{ mb: 0, pr: 5, color: theme.palette.grey[900] }}
            >
              {formatMessage({ id: 'PROFILE.USER.ACCORDIONS.NO_ORDERS' })}
            </Typography>
          )}
        </AccordionSummary>
        {user.completedOrders
          ?.map((order: CompletedOrder) => {
            const formattedDate = new Date(order.createdAt!).toLocaleDateString();
            return (
              <Stack key={order.orderId} sx={{ width: '100%', p: 2 }}>
                <Accordion key={order.orderId}>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreRoundedIcon sx={{ color: theme.palette.grey[800], width: 32, height: 32 }} />
                    }
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      fontSize={22}
                      sx={{ mb: 0, color: theme.palette.grey[900] }}
                    >
                      {formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.ORDER.NUMBER' })} {order.orderId}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack gap={2} sx={{ width: '100%' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          fontSize={18}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.DATE' })}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={400}
                          fontSize={16}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {formattedDate}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          fontSize={18}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.TOTAL' })}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={400}
                          fontSize={16}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {order.totalOrderAmountARS}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          fontSize={18}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {formatMessage({ id: 'PROFILE.USER.ACCORDIONS.PRODUCTS.NAMES' })}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={400}
                          fontSize={16}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {order.cartItems?.map((item) => item.productName).join(', ')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          fontSize={18}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {formatMessage({ id: 'PROFILE.USER.ACCORDIONS.PRODUCTS.QUANTITY' })}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={400}
                          fontSize={16}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {order.totalProducts}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          fontSize={18}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.DELIVERY.TYPE' })}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={400}
                          fontSize={16}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {order.deliveryType}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          fontSize={18}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.PAYMENT.METHOD' })}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={400}
                          fontSize={16}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {order.paymentMethod}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          fontSize={18}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {formatMessage({ id: 'PROFILE.USER.TABLE.HEADER.STATUS' })}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={400}
                          fontSize={16}
                          sx={{ mb: 0, color: theme.palette.grey[900] }}
                        >
                          {order.status}
                        </Typography>
                      </Box>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Stack>
            );
          })
          .reverse()}
      </Accordion>
    </Stack>
  );
};
