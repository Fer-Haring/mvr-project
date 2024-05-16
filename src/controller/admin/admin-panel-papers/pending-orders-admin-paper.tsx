import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Modal from '@webapp/components/modal';
import { CompletedOrder } from '@webapp/sdk/users-types';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import ControlOrdersContent from '../modal-components/control-orders-modal-content';
import { CustomAdminPaper } from './papers-styles';

interface PendingOrdersPaperProps {
  orders: CompletedOrder[];
}

const PendingOrdersPaper: FunctionComponent<PendingOrdersPaperProps> = ({ orders }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const ordersStatus = Object.values(orders)
    .map((order) => order.status)
    .filter((status): status is string => status !== undefined);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

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
          {formatMessage({ id: 'ADMIN.ORDERS.CONTROL' })}
        </Typography>

        <Paper
          sx={{
            display: 'flex',
            border: 0,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.grey[800],
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {formatMessage({ id: 'ADMIN.ORDERS.PENDING' })}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.grey[800],
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {pendingCount}
              </Typography>
            </Box>
            <Tooltip title={formatMessage({ id: 'ADMIN.ORDERS.VIEW' })}>
              <Box>
                <IconButton onClick={handleOpen}>
                  <VisibilityRoundedIcon
                    sx={{
                      color: theme.palette.grey[800],
                      fontSize: 24,
                    }}
                  />
                </IconButton>
              </Box>
            </Tooltip>
          </Box>
          {openModal && (
            <Modal
              open={openModal}
              title={formatMessage({ id: 'ADMIN.ORDERS.CONTROL' })}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              customContent={<ControlOrdersContent />}
              secondaryButtonColor="secondary"
              secondaryButtonText={formatMessage({ id: 'COMMON.CLOSE' })}
              secondaryButtonOnClick={handleClose}
              secondaryButtonDisabled={false}
            />
          )}
        </Paper>
      </Box>
    </CustomAdminPaper>
  );
};

export default PendingOrdersPaper;
