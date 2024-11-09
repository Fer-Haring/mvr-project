import { alpha, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ContentWrapper from '@webapp/components/content-wrapper';
import AdminDataGrid from '@webapp/controller/admin/admin-data-grid';
import DollarValueInputPaper from '@webapp/controller/admin/admin-panel-papers/dollar-value-admin-paper';
import ExtraAccesAdminPaperPaper from '@webapp/controller/admin/admin-panel-papers/extra-access-admin-panel';
import StatisticsPanelAdminPaper from '@webapp/controller/admin/admin-panel-papers/statistics-panel-admin-paper';
import TotalOrdersPaper from '@webapp/controller/admin/admin-panel-papers/total-orders-admin-paper';
import TotalProductsPaper from '@webapp/controller/admin/admin-panel-papers/total-products-admin-paper';
import TotalSalesPaper from '@webapp/controller/admin/admin-panel-papers/total-sales-admin-paper';
import { useAppDispatch } from '@webapp/hooks/redux-hooks';
import { setProducts } from '@webapp/redux/store/slices/productsSlice';
import { useProductListQuery } from '@webapp/services/mutations/products/get-product-list-query';
import React, { useEffect } from 'react';

export const AdminDashboardPage: React.FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const productListArray = useProductListQuery(1, 500);

  useEffect(() => {
    dispatch(setProducts(productListArray.data?.products || []));
  }, [productListArray.data?.products, dispatch]);

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
        <ExtraAccesAdminPaperPaper />
        <StatisticsPanelAdminPaper />
      </Stack>
      <Paper sx={{ p: 2, width: '100%', mt: 2, backgroundColor: alpha(theme.palette.common.white, 0.7) }}>
        <AdminDataGrid />
      </Paper>
    </ContentWrapper>
  );
};
