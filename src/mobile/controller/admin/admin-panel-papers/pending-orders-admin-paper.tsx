import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Accordion, AccordionDetails, AccordionSummary, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import ControlOrdersContent from '@webapp/mobile/controller/admin/modal-components/control-orders-modal-content';
import { CompletedOrder } from '@webapp/sdk/users-types';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface PendingOrdersPaperProps {
  orders: CompletedOrder[];
}

const PendingOrdersPaper: FunctionComponent<PendingOrdersPaperProps> = ({ orders }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const ordersStatus = Object.values(orders)
    .map((order) => order.status)
    .filter((status): status is string => status !== undefined);

  const orderStatusCountstringOccurrences = (arr?: string[]) => {
    const orderStatusCounts: { [key: string]: number } = { Pending: 0, Completed: 0, Canceled: 0 };

    arr?.forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(orderStatusCounts, item)) {
        orderStatusCounts[item as keyof typeof orderStatusCounts] += 1;
      }
    });
    return orderStatusCounts;
  };

  const orderStatusCounts = orderStatusCountstringOccurrences(ordersStatus);

  const pendingCount = orderStatusCounts['Pending'];

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        gap: 2,
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreRoundedIcon
              sx={{
                color: theme.palette.grey[800],
              }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.grey[800],
                fontWeight: 'bold',
              }}
            >
              {formatMessage({ id: 'ADMIN.ORDERS.PENDING.MOBILE' })}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.grey[800],
                fontWeight: 'bold',
              }}
            >
              {pendingCount}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <ControlOrdersContent />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default PendingOrdersPaper;
