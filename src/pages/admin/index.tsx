import { alpha, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ContentWrapper from '@webapp/components/content-wrapper';
import AdminDataGrid from '@webapp/controller/admin/admin-data-grid';
import DollarValueInputPaper from '@webapp/controller/admin/admin-panel-papers/dollar-value-admin-paper';
import DonutChartPaper from '@webapp/controller/admin/admin-panel-papers/donut-chart-admin-paper';
import PendingOrdersPaper from '@webapp/controller/admin/admin-panel-papers/order-status-table/pending-orders-admin-paper';
import TotalOrdersPaper from '@webapp/controller/admin/admin-panel-papers/total-orders-admin-paper';
import TotalProductsPaper from '@webapp/controller/admin/admin-panel-papers/total-products-admin-paper';
import TotalSalesPaper from '@webapp/controller/admin/admin-panel-papers/total-sales-admin-paper';
import { useGetPendingOrders } from '@webapp/sdk/mutations/orders/get-pending-orders-query';
import React, { FunctionComponent } from 'react';

export const AdminDashboardPage: FunctionComponent = () => {
  const theme = useTheme();
  const orders = useGetPendingOrders();
  console.log(orders.data);
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
        <DonutChartPaper />
      </Stack>
      <Paper sx={{ p: 2, width: '100%', mt: 2, backgroundColor: alpha(theme.palette.common.white, 0.7) }}>
        <PendingOrdersPaper orders={orders.data ? orders.data : []} />
      </Paper>
      <Paper sx={{ p: 2, width: '100%', mt: 2, backgroundColor: alpha(theme.palette.common.white, 0.7) }}>
        <AdminDataGrid />
      </Paper>
    </ContentWrapper>
  );
};
