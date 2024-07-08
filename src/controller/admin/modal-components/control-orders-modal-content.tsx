// import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
// import { Accordion, AccordionDetails, AccordionSummary, Typography, alpha, styled, useTheme } from '@mui/material';
// import React from 'react';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Select from '@webapp/components/form/select';
// import SnackbarUtils from '@webapp/components/snackbar';
// import { updateOrderStatus } from '@webapp/sdk/firebase/admin';
// import { getUser } from '@webapp/sdk/firebase/user';
// import { CompletedOrder, User } from '@webapp/sdk/types/user-types';
// import { useAdminDataStore } from '@webapp/store/admin/admin-data';
// import { FunctionComponent, useEffect, useState } from 'react';
// import { useIntl } from 'react-intl';

// interface UserOrders {
//   [userId: string]: {
//     userData: User;
//     orders: CompletedOrder[];
//   };
// }

// interface ControlOrdersContentProps {
//   className?: string;
//   // orders: CompletedOrder[];
// }

// const ControlOrdersContent: FunctionComponent<ControlOrdersContentProps> = ({ className }) => {
//   const { formatMessage } = useIntl();
//   const theme = useTheme();
//   const { orders, setOrders } = useAdminDataStore();
//   const ordersArray = Object.values(orders);
//   const [userOrders, setUserOrders] = useState<UserOrders>({});
//   const [ordersStatus, setOrdersStatus] = useState<{ [orderId: string]: string }>({});

//   const handleStatusChange = (orderId: string | number | undefined, newStatus: string) => {
//     // Actualiza el estado local
//     setOrdersStatus((prevStatuses) => ({
//       ...prevStatuses,
//       [orderId!]: newStatus,
//     }));

//     // Llama a la función que actualiza la base de datos
//     updateOrderStatus(orderId as number, newStatus)
//       .then(() => {
//         SnackbarUtils.success('Estado actualizado con éxito');

//         const updatedOrders = ordersArray.map((order) => {
//           if (order.order_id === orderId) {
//             return { ...order, status: newStatus };
//           }
//           return order;
//         });

//         setOrders(updatedOrders);
//       })
//       .catch((error) => {
//         console.error('Error al actualizar el estado:', error);
//         // Opcional: Mostrar notificación de error
//       });
//   };
  
//   useEffect(() => {
//     const loadUserData = async () => {
//       const ordersByUser: UserOrders = {};

//       for (const order of ordersArray) {
//         const userId = order.user_id;
//         if (!ordersByUser[userId!]) {
//           ordersByUser[userId!] = {
//             orders: [],
//             userData: await getUser(userId!), // Asegúrate de que el tipo de dato retornado por getUser sea correcto
//           };
//         }
//         ordersByUser[userId!].orders.push(order);
//       }

//       setUserOrders(ordersByUser);
//     };

//     loadUserData();
//   }, []);

//   return (
//     <Box className={className || ''}>
//       <Stack gap={2} sx={{ width: '100%' }}>
//         <Box className={className || ''}>
//           {Object.entries(userOrders).map(([userId, { userData, orders }]) => {
//             const pendingOrders = orders.filter((order) => order.status === 'Pending');
//             return (
//               <Box key={userId} sx={{ marginBottom: theme.spacing(2) }}>
//                 <Stack gap={2}>
//                   <CustomAccordion>
//                     <AccordionSummary
//                       expandIcon={<ExpandMoreRoundedIcon />}
//                       aria-controls="panel1-content"
//                       id="panel1-header"
//                       sx={{
//                         backgroundColor: theme.palette.grey[200],
//                         borderRadius: theme.spacing(0.5),
//                         color: theme.palette.grey[800],
//                         fontWeight: 'bold',
//                         fontSize: 18,
//                       }}
//                     >
//                       {userData?.name} {userData?.last_name} ( {pendingOrders.length} Ordenes pendientes)
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       {orders.map((order) => {
//                         if (order.status === 'Pending') {
//                           return (
//                             <Box
//                               key={order.order_id}
//                               sx={{ marginBottom: theme.spacing(2), display: 'flex', justifyContent: 'space-between' }}
//                             >
//                               <Typography variant="body1" key={order.order_id} sx={{ color: theme.palette.grey[800] }}>
//                                 Orden con {order.total_products} Producto/s - Total: {order.total_order_amount}{' '}
//                                 {order.currency_used_to_pay}
//                               </Typography>
//                               <CustomSelect
//                                 key={order.order_id}
//                                 id={order.order_id + 'status'}
//                                 label={formatMessage({ id: 'ADMIN.ORDERS.STATUS' })}
//                                 value={ordersStatus[order.order_id!] || order.status}
//                                 onChange={(e) => handleStatusChange(order.order_id, e.target.value as string)}
//                                 options={[
//                                   {
//                                     value: 'Pending',
//                                     label: formatMessage({ id: 'ADMIN.MODAL.ORDERS.PENDING.STATE' }),
//                                   },
//                                   {
//                                     value: 'Completed',
//                                     label: formatMessage({ id: 'ADMIN.MODAL.ORDERS.COMPLETED.STATE' }),
//                                   },
//                                   {
//                                     value: 'Canceled',
//                                     label: formatMessage({ id: 'ADMIN.MODAL.ORDERS.CANCELLED.STATE' }),
//                                   },
//                                 ]}
//                               />
//                             </Box>
//                           );
//                         }
//                       })}
//                     </AccordionDetails>
//                   </CustomAccordion>
//                 </Stack>
//               </Box>
//             );
//           })}
//         </Box>
//       </Stack>
//     </Box>
//   );
// };

// export default ControlOrdersContent;

// const CustomSelect = styled(Select)(({ theme }) => ({
//   height: theme.spacing(4),
//   borderRadius: theme.spacing(0.5),
//   width: 200,
//   border: 'none',
//   '& .MuiOutlinedInput-root': {
//     height: theme.spacing(4),
//     paddingBlock: 0,
//     borderRadius: theme.spacing(0.5),
//     border: 'none',
//   },
//   '& .MuiOutlinedInput-notchedOutline': {
//     borderRadius: theme.spacing(0.5),
//     border: 'none',
//   },
//   '& label.MuiInputLabel-root': {
//     fontSize: 14,
//     color: theme.palette.grey[800],
//   },
//   '& .MuiSelect-input': {
//     height: theme.spacing(2),
//     paddingBlock: 0,
//     borderRadius: theme.spacing(0.5),
//     border: 'none',
//   },
//   '.MuiSelect-select': {
//     height: theme.spacing(2),
//     paddingBlock: 0,
//     borderRadius: theme.spacing(0.5),
//     border: 'none',
//     backgroundColor: alpha(theme.palette.primary.main, 0.1),
//     '&:focus': {
//       borderRadius: theme.spacing(0.5),
//       borderColor: theme.palette.grey[700],
//     },
//   },
// }));

// const CustomAccordion = styled(Accordion)(({ theme }) => ({
//   backgroundColor: theme.palette.grey[200],
//   borderRadius: theme.spacing(0.5),
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
