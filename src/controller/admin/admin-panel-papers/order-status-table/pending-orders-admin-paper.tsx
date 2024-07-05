import { ISelectCellEditorParams } from '@ag-grid-community/core';
import { alpha, styled } from '@mui/material';
import { useGetPendingOrders } from '@webapp/sdk/mutations/orders/get-pending-orders-query';
import { useUpdateOrderStatus } from '@webapp/sdk/mutations/orders/update-order-status-mutation';
import { OrderResponse } from '@webapp/sdk/types/orders-types';
import { CellEditingStoppedEvent, ColDef, GetRowIdParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { format } from 'date-fns';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

interface PendingOrdersPaperProps {
  orders: OrderResponse[];
}
const PendingOrdersPaper: FunctionComponent<PendingOrdersPaperProps> = ({ orders }) => {
  const { formatMessage } = useIntl();
  const [rowData, setRowData] = useState<OrderResponse[]>([]);
  const { mutateAsync } = useUpdateOrderStatus();
  const getPendingOrders = useGetPendingOrders();
  const getRowId = (params: GetRowIdParams) => {
    return (params.data as OrderResponse).order_id || '';
  };

  const languages = [
    formatMessage({ id: 'ADMIN.ORDER.STATUS.PENDING' }),
    formatMessage({ id: 'ADMIN.ORDER.STATUS.COMPLETED' }),
    formatMessage({ id: 'ADMIN.ORDER.STATUS.CANCELLED' }),
  ];

  useEffect(() => {
    setRowData(orders);
  }, [orders]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const columnDefs: ColDef[] = [
    { headerName: 'Order ID', field: 'order_id', sort: 'desc' },
    { headerName: 'User ID', field: 'user_id', hide: true },
    { headerName: 'User Name', field: 'user.name' },
    { headerName: 'Total Productos', field: 'total_products' },
    { headerName: 'Total USD', field: 'total_order_amount_usd' },
    { headerName: 'Total ARS', field: 'total_order_amount_ars' },
    {
      headerName: 'Select Editor',
      field: 'status',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: languages,
      } as ISelectCellEditorParams,
    },
    { headerName: 'Moneda de Pago', field: 'currency_used_to_pay' },
    { headerName: 'Metodo de Pago', field: 'payment_method' },
    { headerName: 'Tipo de Entrega', field: 'delivery_type' },
    { headerName: 'Fecha de Pedido', field: 'created_at', valueFormatter: (params) => formatDate(params.value) },
    { headerName: 'Updated At', field: 'updated_at', hide: true, cellDataType: 'date' },
  ];

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
    };
  }, []);

  const onCellEditingStopped = useCallback(
    async (event: CellEditingStoppedEvent) => {
      const updatedData = event.data;
      const id = updatedData.order_id;

      // Mapear los valores visualizados a los valores esperados por el backend
      let status = updatedData.status.toLowerCase();
      switch (status) {
        case 'pendiente':
        case 'Pendiente':
        case 'pending':
          status = 'pending';
          break;
        case 'completado':
        case 'Completado':
        case 'completed':
          status = 'completed';
          break;
        case 'cancelado':
        case 'Cancelado':
        case 'cancelled':
          status = 'cancelled';
          break;
        default:
          break;
      }

      if (id) {
        mutateAsync({ id: id, status: status }).then(() => {
          getPendingOrders.refetch();
        });
      }
    },
    [mutateAsync]
  );

  return (
    <div className="ag-theme-quartz" style={{ height: 300, width: '100%', marginTop: 25 }}>
      <StyledAgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={false}
        defaultColDef={defaultColDef}
        getRowId={getRowId}
        onCellEditingStopped={onCellEditingStopped}
        enterNavigatesVertically={true}
        enterNavigatesVerticallyAfterEdit={true}
        suppressServerSideFullWidthLoadingRow={true}
        gridOptions={{
          rowSelection: 'multiple',
          rowMultiSelectWithClick: true,
        }}
      />
    </div>
  );
};
export default PendingOrdersPaper;
const StyledAgGridReact = styled(AgGridReact)(({ theme }) => ({
  height: theme.spacing(5),
  borderRadius: theme.spacing(0.5),
  width: '100%',
  border: 'none',
  textAlign: 'center',
  '& .ag-header-cell': {
    paddingLeft: 0,
  },
  '& .ag-header-cell-text': {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: 14,
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  '& .ag-row-even': {
    fontSize: 16,
    backgroundColor: alpha(theme.palette.primary.main, 0.5),
    borderRadius: theme.spacing(2),
  },
  '& .ag-row-odd': {
    fontSize: 16,
    borderRadius: theme.spacing(2),
  },
  '& .ag-header': {
    marginBottom: theme.spacing(2),
    border: 0,
  },
  '& .ag-pinned-left-header': {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: theme.spacing(2),
  },
  '& .ag-cell-last-left-pinned:not': {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
    borderRadius: theme.spacing(2),
    border: 'none',
  },
  '& .ag-header-container': {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: theme.spacing(2),
    '& .ag-header-cell': {
      border: 0,
    },
  },
}));
