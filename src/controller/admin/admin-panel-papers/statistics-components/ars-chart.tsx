import { useGetAllOrders } from '@webapp/sdk/mutations/orders/get-all-orders-query';
import { AgCartesianChartOptions, AgTooltipRendererResult } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-react';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

const ArsChart: React.FunctionComponent = () => {
  const { formatMessage } = useIntl();

  const useMonthlySalesData = () => {
    const { data: allOrdersData = [] } = useGetAllOrders();

    const monthlySalesARS: { [month: string]: number } = {};

    allOrdersData.forEach((order) => {
      if (order.currency_used_to_pay === 'ARS') {
        const orderDate = dayjs(order.created_at);
        const month = orderDate.format('YYYY-MM'); // Agrupamos por año y mes

        if (!monthlySalesARS[month]) {
          monthlySalesARS[month] = 0;
        }

        monthlySalesARS[month] += order.total_order_amount_ars || 0;
      }
    });

    return monthlySalesARS;
  };

  // Formatear los datos para AG Charts
  const monthlySalesARS = useMonthlySalesData();
  const chartData = useMemo(() => {
    return Object.keys(monthlySalesARS).map((month) => ({
      month, // El mes en formato 'YYYY-MM'
      sales: monthlySalesARS[month], // El total de ventas en ARS
    }));
  }, [monthlySalesARS]);

  const [options] = useState<AgCartesianChartOptions>({
    title: {
      text: formatMessage({ id: 'ADMIN.STATISTICS.ARS.CHART.TITLE' }),
    },
    data: chartData,
    series: [
      {
        type: 'bar', // Tipo de gráfico: barras
        xKey: 'month', // Eje X: el mes
        yKey: 'sales', // Eje Y: total de ventas en ARS
        fill: 'rgba(13,76,158,0.78)',
        stroke: '#000000', // Borde de las barras
        tooltip: {
          renderer: (params): AgTooltipRendererResult => {
            const { month, sales } = params.datum;
            return {
              content: `${formatMessage({ id: 'ADMIN.STATISTICS.MONTH' })}: ${month}<br>${formatMessage({ id: 'ADMIN.STATISTICS.ARS_SALES' })}: $${sales.toLocaleString()} ARS`,
            };
          },
        },
      },
    ],
    axes: [
      {
        type: 'category', // Asegúrate de que es un eje de categorías
        position: 'bottom',
        title: {
          text: formatMessage({ id: 'ADMIN.STATISTICS.MONTH' }),
        },
        label: {
          formatter: (params) => {
            // Puedes aplicar un formato adicional si quieres ajustar cómo se ven las fechas
            return params.value;
          },
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: formatMessage({ id: 'ADMIN.STATISTICS.ARS_SALES' }),
        },
      },
    ],
  });

  return <AgCharts options={options} />;
};

export default ArsChart;
