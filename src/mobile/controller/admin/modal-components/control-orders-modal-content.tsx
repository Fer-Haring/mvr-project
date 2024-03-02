import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Accordion, AccordionDetails, AccordionSummary, Typography, alpha, styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Select from '@webapp/mobile/components/form/select';
import SnackbarUtils from '@webapp/mobile/components/snackbar';
import { getCompletedOrders, updateOrderStatus } from '@webapp/sdk/firebase/admin';
import { getUser } from '@webapp/sdk/firebase/user';
import { CompletedOrder, User } from '@webapp/sdk/users-types';
import { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface UserOrders {
  [userId: string]: {
    userData: User;
    orders: CompletedOrder[];
  };
}

interface ControlOrdersContentProps {
  className?: string;
  // orders: CompletedOrder[];
}

const ControlOrdersContent: FunctionComponent<ControlOrdersContentProps> = ({ className }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const [userOrders, setUserOrders] = useState<UserOrders>({});
  const [ordersStatus, setOrdersStatus] = useState<{ [orderId: string]: string }>({});
  const [ordersArray, setOrdersArray] = useState<CompletedOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getCompletedOrders();
      if (fetchedOrders) {
        const ordersList: CompletedOrder[] = Object.values(fetchedOrders);
        setOrdersArray(ordersList);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId: number, newStatus: string) => {
    setOrdersStatus((prevStatuses) => {
      const updatedStatuses = { ...prevStatuses, [orderId]: newStatus };
      return updatedStatuses as { [orderId: string]: string };
    });
    updateOrderStatus(orderId, newStatus)
      .then(() => {
        SnackbarUtils.success('Estado del Pedido actualizado exitosamente');
      })
      .catch((error) => {
        SnackbarUtils.error(`Error al actualizar el pedido: ${error}`);
      });
  };

  useEffect(() => {
    const loadUserData = async () => {
      const ordersByUser: UserOrders = {};

      for (const order of ordersArray) {
        const userId = order.userId;
        if (!ordersByUser[userId!]) {
          ordersByUser[userId!] = {
            orders: [],
            userData: await getUser(userId!, false),
          };
        }
        ordersByUser[userId!].orders.push(order);
      }

      setUserOrders(ordersByUser);
    };

    loadUserData();
  }, [ordersArray]);

  return (
    <Box className={className || ''}>
      <Stack gap={2} sx={{ width: '100%' }}>
        <Box className={className || ''}>
          {Object.entries(userOrders).map(([userId, { userData, orders }]) => {
            const pendingOrders = orders.filter((order) => order.status === 'Pending');
            return (
              <Box key={userId} sx={{ marginBottom: theme.spacing(2), border: 'none' }}>
                <Accordion
                  sx={{
                    border: 'none',
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreRoundedIcon
                        sx={{
                          color: theme.palette.grey[800],
                          width: 32,
                          height: 32,
                        }}
                      />
                    }
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                      backgroundColor: theme.palette.grey[200],
                      borderRadius: theme.spacing(0.5),
                      color: theme.palette.grey[800],
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}
                  >
                    {userData?.name} {userData?.lastName} ( {pendingOrders.length} Ordenes pendientes)
                  </AccordionSummary>
                  <AccordionDetails>
                    {orders.map((order) => {
                      if (order.status === 'Pending') {
                        return (
                          <Box
                            key={order.orderId}
                            sx={{ marginBottom: theme.spacing(2), display: 'flex', justifyContent: 'space-between' }}
                          >
                            <Typography variant="body2" key={order.orderId} sx={{ color: theme.palette.grey[800] }}>
                              {formatMessage({ id: 'ADMIN.ODERS.NUMBER' })} {order.orderId}
                            </Typography>
                            <CustomSelect
                              key={order.orderId}
                              id={order.orderId + 'status'}
                              // label={formatMessage({ id: 'ADMIN.ORDERS.STATUS' })}
                              value={ordersStatus[order.orderId!] || order.status}
                              onChange={(e) => handleStatusChange(order.orderId as number, e.target.value as string)}
                              options={[
                                {
                                  value: 'Pending',
                                  label: formatMessage({ id: 'ADMIN.MODAL.ORDERS.PENDING.STATE' }),
                                },
                                {
                                  value: 'Completed',
                                  label: formatMessage({ id: 'ADMIN.MODAL.ORDERS.COMPLETED.STATE' }),
                                },
                                {
                                  value: 'Canceled',
                                  label: formatMessage({ id: 'ADMIN.MODAL.ORDERS.CANCELLED.STATE' }),
                                },
                              ]}
                            />
                          </Box>
                        );
                      }
                    })}
                  </AccordionDetails>
                </Accordion>
              </Box>
            );
          })}
        </Box>
      </Stack>
    </Box>
  );
};

export default ControlOrdersContent;

const CustomSelect = styled(Select)(({ theme }) => ({
  height: theme.spacing(4),
  borderRadius: theme.spacing(0.5),
  width: 200,
  border: 'none',
  '& .MuiOutlinedInput-root': {
    height: theme.spacing(4),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '& label.MuiInputLabel-root': {
    fontSize: 14,
    color: theme.palette.grey[800],
  },
  '& .MuiSelect-input': {
    height: theme.spacing(2),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
  },
  '.MuiSelect-select': {
    height: theme.spacing(2),
    paddingBlock: 0,
    borderRadius: theme.spacing(0.5),
    border: 'none',
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    '&:focus': {
      borderRadius: theme.spacing(0.5),
      borderColor: theme.palette.grey[700],
    },
  },
}));

// const CustomAccordion = styled(Accordion)(({ theme }) => ({
//   backgroundColor: theme.palette.grey[200],

//   '& .MuiAccordionSummary-content': {
//     backgroundColor: theme.palette.grey[200],
//   },
//   '& .MuiAccordionSummary-root': {
//     backgroundColor: theme.palette.grey[200],
//   },
//   '& .MuiAccordionSummary-expandIcon': {
//     color: theme.palette.grey[800],
//   },
//   '& .MuiAccordionDetails-root': {
//     backgroundColor: theme.palette.grey[200],
//   },
// }));
