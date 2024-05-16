import { alpha, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ContentWrapper from '@webapp/components/content-wrapper';
import DollarValueInputPaper from '@webapp/controller/admin/admin-panel-papers/dollar-value-admin-paper';
import DonutChartPaper from '@webapp/controller/admin/admin-panel-papers/donut-chart-admin-paper';
import PendingOrdersPaper from '@webapp/controller/admin/admin-panel-papers/pending-orders-admin-paper';
import TotalOrdersPaper from '@webapp/controller/admin/admin-panel-papers/total-orders-admin-paper';
import TotalProductsPaper from '@webapp/controller/admin/admin-panel-papers/total-products-admin-paper';
import TotalSalesPaper from '@webapp/controller/admin/admin-panel-papers/total-sales-admin-paper';
import { useAdminDataStore } from '@webapp/store/admin/admin-data';
import { FunctionComponent } from 'react';

import { AdminTable } from '../../controller/admin/admin-table';

export const AdminDashboardPage: FunctionComponent = () => {
  const theme = useTheme();
  const { orders } = useAdminDataStore();

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
        <PendingOrdersPaper orders={orders} />
      </Stack>
      <Paper sx={{ p: 2, width: '100%', mt: 2, backgroundColor: alpha(theme.palette.common.white, 0.7) }}>
        <AdminTable />
      </Paper>
    </ContentWrapper>
  );
};
