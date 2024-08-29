import { ButtonGroup } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@webapp/components/button';
import ContentWrapper from '@webapp/components/content-wrapper';
import CompletedOrdersPaper from '@webapp/controller/admin/admin-panel-papers/order-status-table/completed-orders-admin-paper';
import PendingOrdersPaper from '@webapp/controller/admin/admin-panel-papers/order-status-table/pending-orders-admin-paper';
import { useGetAllOrders } from '@webapp/sdk/mutations/orders/get-all-orders-query';
import { useGetPendingOrders } from '@webapp/sdk/mutations/orders/get-pending-orders-query';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { OrderResponse } from '@webapp/sdk/types/orders-types';
import { useProductsListData } from '@webapp/store/products/products-list';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const OrderManagementPage: React.FunctionComponent = () => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const pendingOrders = useGetPendingOrders();
  const getCompletedOrders = useGetAllOrders();
  const completedOrders = getCompletedOrders.data
    ? getCompletedOrders.data?.filter((order) => order.status === 'completed' || order.status === 'Completed')
    : [];
  const { setProductList } = useProductsListData();
  const productListArray = useProductListQuery(1, 500);
  const [activeTable, setActiveTable] = useState<'pending' | 'completed'>('pending');
  const [pendingOrdersData, setPendingOrdersData] = useState<OrderResponse[]>([]);

  useEffect(() => {
    setProductList(productListArray.data?.products || []);
    setPendingOrdersData(pendingOrders.data || []);
  }, [productListArray.data?.products, setProductList, pendingOrders.data]);

  const handleTableChange = (table: 'pending' | 'completed') => {
    setActiveTable(table);
  };

  return (
    <ContentWrapper>
      <Paper sx={{ p: 2, width: '100%', mt: 2, backgroundColor: alpha(theme.palette.common.white, 0.7) }}>
        <ButtonGroup variant="contained" aria-label="order table selection">
          <Button
            size="small"
            color={activeTable === 'pending' ? 'primary' : 'unselected'}
            onClick={() => handleTableChange('pending')}
            variant={activeTable === 'pending' ? 'contained' : 'outlined'}
          >
            {formatMessage({ id: 'ADMIN.BUTTON.SELECTOR.TABLE.PENDING' })}
          </Button>
          <Button
            size="small"
            color={activeTable === 'completed' ? 'primary' : 'unselected'}
            onClick={() => handleTableChange('completed')}
            variant={activeTable === 'completed' ? 'contained' : 'outlined'}
          >
            {formatMessage({ id: 'ADMIN.BUTTON.SELECTOR.TABLE.COMPLETED' })}
          </Button>
        </ButtonGroup>
        <Typography
          variant="body1"
          sx={{ color: theme.palette.grey[800], fontWeight: 'bold', textAlign: 'center', mt: 4 }}
        >
          {formatMessage({ id: 'ADMIN.ORDERS.CONTROL' })}
        </Typography>
        {activeTable === 'pending' ? (
          pendingOrdersData.length !== 0 ? (
            <PendingOrdersPaper orders={pendingOrdersData ? pendingOrdersData : []} />
          ) : (
            <Typography
              variant="body1"
              sx={{ color: theme.palette.grey[800], fontWeight: 'bold', textAlign: 'center', mt: 4 }}
            >
              {formatMessage({ id: 'ADMIN.ORDERS.NO_PENDING_ORDERS' })}
            </Typography>
          )
        ) : (
          <CompletedOrdersPaper orders={completedOrders} />
        )}
      </Paper>
    </ContentWrapper>
  );
};

export default OrderManagementPage;
