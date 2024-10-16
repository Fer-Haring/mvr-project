import { ButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@webapp/components/button';
import ContentWrapper from '@webapp/components/content-wrapper';
import CancelledOrdersPaper from '@webapp/controller/admin/admin-panel-papers/order-status-table/cancelled-orders-admin-paper';
import CompletedOrdersPaper from '@webapp/controller/admin/admin-panel-papers/order-status-table/completed-orders-admin-paper';
import PendingOrdersPaper from '@webapp/controller/admin/admin-panel-papers/order-status-table/pending-orders-admin-paper';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useGetAllOrders } from '@webapp/sdk/mutations/orders/get-all-orders-query';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { useProductsListData } from '@webapp/store/products/products-list';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const OrderManagementPage: React.FunctionComponent = () => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const isMobile = useIsMobile();
  const { data: allOrdersData = [], isLoading, error } = useGetAllOrders();
  const { setProductList } = useProductsListData();
  const productListArray = useProductListQuery(1, 500);
  const [activeTable, setActiveTable] = useState<'pending' | 'canceled' | 'completed'>('pending');

  useEffect(() => {
    setProductList(productListArray.data?.products || []);
  }, [setProductList]);

  const pendingOrders = allOrdersData.filter((order) => order.status?.toLowerCase() === 'pending');
  const completedOrders = allOrdersData.filter((order) => order.status?.toLowerCase() === 'completed');
  const cancelledOrders = allOrdersData.filter((order) => order.status?.toLowerCase() === 'canceled');

  const handleTableChange = (table: 'pending' | 'canceled' | 'completed') => {
    setActiveTable(table);
  };

  const renderOrderTable = () => {
    if (isLoading) {
      return (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          {formatMessage({ id: 'ADMIN.ORDERS.LOADING' })}
        </Typography>
      );
    }

    if (error) {
      return (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4, color: theme.palette.error.main }}>
          {formatMessage({ id: 'ADMIN.ORDERS.ERROR' })}
        </Typography>
      );
    }

    switch (activeTable) {
      case 'pending':
        return pendingOrders.length > 0 ? (
          <PendingOrdersPaper orders={pendingOrders} />
        ) : (
          <Typography
            variant="body1"
            sx={{ color: theme.palette.grey[800], fontWeight: 'bold', textAlign: 'center', mt: 4 }}
          >
            {formatMessage({ id: 'ADMIN.ORDERS.NO_PENDING_ORDERS' })}
          </Typography>
        );
      case 'completed':
        return completedOrders.length > 0 ? (
          <CompletedOrdersPaper orders={completedOrders} />
        ) : (
          <Typography
            variant="body1"
            sx={{ color: theme.palette.grey[800], fontWeight: 'bold', textAlign: 'center', mt: 4 }}
          >
            {formatMessage({ id: 'ADMIN.ORDERS.NO_COMPLETED_ORDERS' })}
          </Typography>
        );
      case 'canceled':
        return cancelledOrders.length > 0 ? (
          <CancelledOrdersPaper orders={cancelledOrders} />
        ) : (
          <Typography
            variant="body1"
            sx={{ color: theme.palette.grey[800], fontWeight: 'bold', textAlign: 'center', mt: 4 }}
          >
            {formatMessage({ id: 'ADMIN.ORDERS.NO_CANCELLED_ORDERS' })}
          </Typography>
        );
      default:
        return null;
    }
  };

  const tableOptions: { labelId: string; value: 'pending' | 'canceled' | 'completed' }[] = [
    { labelId: 'ADMIN.BUTTON.SELECTOR.TABLE.PENDING', value: 'pending' },
    { labelId: 'ADMIN.BUTTON.SELECTOR.TABLE.CANCELLED', value: 'canceled' },
    { labelId: 'ADMIN.BUTTON.SELECTOR.TABLE.COMPLETED', value: 'completed' },
  ];

  return (
    <ContentWrapper>
      <Paper sx={{ p: 2, width: '100%', mt: 2, backgroundColor: alpha(theme.palette.common.white, 0.7) }}>
        {isMobile ? (
          // Versión móvil con uno de los botones abajo
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ButtonGroup sx={{ mb: 2 }}>
              {tableOptions.slice(0, 2).map((option) => (
                <Button
                  key={option.value}
                  size="small"
                  color={activeTable === option.value ? 'primary' : 'unselected'}
                  onClick={() => handleTableChange(option.value)}
                  variant={activeTable === option.value ? 'contained' : 'outlined'}
                >
                  {formatMessage({ id: option.labelId })}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup>
              {tableOptions.slice(2).map((option) => (
                <Button
                  key={option.value}
                  size="small"
                  color={activeTable === option.value ? 'primary' : 'unselected'}
                  onClick={() => handleTableChange(option.value)}
                  variant={activeTable === option.value ? 'contained' : 'outlined'}
                >
                  {formatMessage({ id: option.labelId })}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        ) : (
          // Versión para escritorio con todos los botones en línea
          <ButtonGroup variant="contained" aria-label="order table selection">
            {tableOptions.map((option) => (
              <Button
                key={option.value}
                size="small"
                color={activeTable === option.value ? 'primary' : 'unselected'}
                onClick={() => handleTableChange(option.value)}
                variant={activeTable === option.value ? 'contained' : 'outlined'}
              >
                {formatMessage({ id: option.labelId })}
              </Button>
            ))}
          </ButtonGroup>
        )}
        <Typography
          variant="body1"
          sx={{ color: theme.palette.grey[800], fontWeight: 'bold', textAlign: 'center', mt: 4 }}
        >
          {formatMessage({ id: 'ADMIN.ORDERS.CONTROL' })}
        </Typography>
        {renderOrderTable()}
      </Paper>
    </ContentWrapper>
  );
};

export default OrderManagementPage;
