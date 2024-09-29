import { ISelectCellEditorParams } from '@ag-grid-community/core';
import { alpha, styled } from '@mui/material';
import { useGetAllOrders } from '@webapp/sdk/mutations/orders/get-all-orders-query';
import { useGetPendingOrders } from '@webapp/sdk/mutations/orders/get-pending-orders-query';
import { useUpdateOrderStatus } from '@webapp/sdk/mutations/orders/update-order-status-mutation';
import { OrderResponse } from '@webapp/sdk/types/orders-types';
import { useEditingOrderStore } from '@webapp/store/orders/editing-order-store';
import { CellEditingStoppedEvent, ColDef, GetRowIdParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { format } from 'date-fns';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

interface CancelledOrdersPaperProps {
  orders: OrderResponse[];
}
const CancelledOrdersPaper: FunctionComponent<CancelledOrdersPaperProps> = ({ orders }) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState<OrderResponse[]>([]);
  const { setOrders } = useEditingOrderStore();
  const { mutateAsync } = useUpdateOrderStatus();
  const getPendingOrders = useGetPendingOrders();
  const getCompletedOrders = useGetAllOrders();
  const getRowId = (params: GetRowIdParams) => {
    return (params.data as OrderResponse).order_id || '';
  };

  const languages = [
    formatMessage({ id: 'ADMIN.ORDER.STATUS.PENDING' }),
    formatMessage({ id: 'ADMIN.ORDER.STATUS.COMPLETED' }),
    formatMessage({ id: 'ADMIN.ORDER.STATUS.CANCELED' }),
  ];

  useEffect(() => {
    setRowData(orders);
  }, [orders]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const formatNumber = (number: number) => {
    return `$ ${number.toFixed(2)}`;
  };

  const columnDefs = (navigate: (path: string) => void): ColDef[] => [
    {
      headerName: 'Order ID',
      field: 'order_id',
      sort: 'desc',
      onCellClicked(event) {
        navigate(`/admin-dashboard/pedidos-pendientes/${event.data.order_id}`);
        setOrders([event.data]);
      },
      cellClass: 'order-id-cell',
    },
    { headerName: 'User ID', field: 'user_id', hide: true },
    { headerName: 'User Name', field: 'user.name' },
    { headerName: 'Total Productos', field: 'total_products' },
    {
      headerName: 'Total USD',
      field: 'total_order_amount_usd',
      valueFormatter: (params) => formatNumber(params.value),
    },
    {
      headerName: 'Total ARS',
      field: 'total_order_amount_ars',
      valueFormatter: (params) => formatNumber(params.value),
    },
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

  const columns = React.useMemo(() => columnDefs(navigate), [navigate]);

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
        case 'canceled':
          status = 'canceled';
          break;
        default:
          break;
      }

      if (id) {
        mutateAsync({ id: id, status: status }).then(() => {
          getPendingOrders.refetch();
          getCompletedOrders.refetch();
        });
      }
    },
    [mutateAsync]
  );

  return (
    <div className="ag-theme-quartz" style={{ height: 300, width: '100%', marginTop: 25 }}>
      <StyledAgGridReact
        rowData={rowData}
        columnDefs={columns}
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
export default CancelledOrdersPaper;
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
  '& .order-id-cell': {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: 18,
    },
  },
}));
