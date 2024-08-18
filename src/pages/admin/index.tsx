import { ButtonGroup, Typography, alpha, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@webapp/components/button';
import ContentWrapper from '@webapp/components/content-wrapper';
import AdminDataGrid from '@webapp/controller/admin/admin-data-grid';
import DollarValueInputPaper from '@webapp/controller/admin/admin-panel-papers/dollar-value-admin-paper';
import CompletedOrdersPaper from '@webapp/controller/admin/admin-panel-papers/order-status-table/completed-orders-admin-paper';
import PendingOrdersPaper from '@webapp/controller/admin/admin-panel-papers/order-status-table/pending-orders-admin-paper';
import TotalOrdersPaper from '@webapp/controller/admin/admin-panel-papers/total-orders-admin-paper';
import TotalProductsPaper from '@webapp/controller/admin/admin-panel-papers/total-products-admin-paper';
import TotalSalesPaper from '@webapp/controller/admin/admin-panel-papers/total-sales-admin-paper';
import { useGetAllOrders } from '@webapp/sdk/mutations/orders/get-all-orders-query';
import { useGetPendingOrders } from '@webapp/sdk/mutations/orders/get-pending-orders-query';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { useProductsListData } from '@webapp/store/products/products-list';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

export const AdminDashboardPage: FunctionComponent = () => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const pendingOrders = useGetPendingOrders();
  const getCompletedOrders = useGetAllOrders();
  const completedOrders = getCompletedOrders.data
    ? getCompletedOrders.data?.filter((order) => order.status === 'completed' || order.status === 'Completed')
    : [];
  const [activeTable, setActiveTable] = useState<'pending' | 'completed'>('pending');
  const { setProductList } = useProductsListData();
  const productListArray = useProductListQuery(1, 500);

  useEffect(() => {
    setProductList(productListArray.data?.products || []);
  }, [productListArray.data?.products, setProductList]);

  const handleTableChange = (table: 'pending' | 'completed') => {
    setActiveTable(table);
  };

  return (
    <ContentWrapper>
      <Stack
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 2,
          width: '100%',
        }}
      >
        <DollarValueInputPaper />
        <TotalProductsPaper />
        <TotalOrdersPaper />
        <TotalSalesPaper />
        {/* <DonutChartPaper /> */}
      </Stack>
      <Paper sx={{ p: 2, width: '100%', mt: 2, backgroundColor: alpha(theme.palette.common.white, 0.7) }}>
        <ButtonGroup variant="contained" aria-label="order table selection">
          <Button
            size="small"
            color="primary"
            onClick={() => handleTableChange('pending')}
            variant={activeTable === 'pending' ? 'contained' : 'outlined'}
          >
            {formatMessage({ id: 'ADMIN.BUTTON.SELECTOR.TABLE.PENDING' })}
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => handleTableChange('completed')}
            variant={activeTable === 'completed' ? 'contained' : 'outlined'}
          >
            {formatMessage({ id: 'ADMIN.BUTTON.SELECTOR.TABLE.COMPLETED' })}
          </Button>
        </ButtonGroup>
        <Typography variant="body1" sx={{ color: theme.palette.grey[800], fontWeight: 'bold', textAlign: 'center' }}>
          {formatMessage({ id: 'ADMIN.ORDERS.CONTROL' })}
        </Typography>
        {activeTable === 'pending' ? (
          pendingOrders.data?.length !== 0 ? (
            <PendingOrdersPaper orders={pendingOrders.data ? pendingOrders.data : []} />
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
      <Paper sx={{ p: 2, width: '100%', mt: 2, backgroundColor: alpha(theme.palette.common.white, 0.7) }}>
        <AdminDataGrid />
      </Paper>
    </ContentWrapper>
  );
};
