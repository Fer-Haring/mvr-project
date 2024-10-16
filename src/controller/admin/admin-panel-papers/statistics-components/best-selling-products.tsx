import { useGetAllOrders } from '@webapp/sdk/mutations/orders/get-all-orders-query';
import { AgCartesianChartOptions, AgTooltipRendererResult } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-react';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

const BestSellingProductsChart: React.FunctionComponent = () => {
  const { formatMessage } = useIntl();

  // Función para obtener los productos más vendidos
  const useBestSellingProductsData = () => {
    const { data: allOrdersData = [] } = useGetAllOrders();

    const productSales: { [productName: string]: number } = {};

    allOrdersData.forEach((order) => {
      order.cart_items?.forEach((item) => {
        const productName = item.product_name;
        const quantitySold = item.quantity;

        if (!productSales[productName]) {
          productSales[productName] = 0;
        }

        productSales[productName] += quantitySold;
      });
    });

    return productSales;
  };

  // Obtener y formatear los datos para AG Charts
  const productSales = useBestSellingProductsData();
  const chartData = useMemo(() => {
    return Object.keys(productSales).map((productName) => ({
      product: productName, // El nombre del producto
      sales: productSales[productName], // La cantidad total vendida
    }));
  }, [productSales]);

  // Opciones del gráfico
  const [options] = useState<AgCartesianChartOptions>({
    title: {
      text: formatMessage({ id: 'ADMIN.STATISTICS.BEST_SELLER.TITLE' }),
    },
    data: chartData,
    series: [
      {
        type: 'bar', // Tipo de gráfico: barras
        xKey: 'product', // Eje X: el nombre del producto
        yKey: 'sales', // Eje Y: la cantidad total vendida
        fill: '#4caf50', // Color de las barras
        stroke: '#000000', // Borde de las barras
        tooltip: {
          renderer: (params): AgTooltipRendererResult => {
            const { product, sales } = params.datum;
            return {
              content: `${formatMessage({ id: 'ADMIN.STATISTICS.PRODUCT' })}: ${product}<br>${formatMessage({ id: 'ADMIN.STATISTICS.QUANTITY' })}: ${sales}`,
            };
          },
        },
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: {
          text: formatMessage({ id: 'ADMIN.STATISTICS.PRODUCT' }),
        },
        label: {
          rotation: 45, // Rotar las etiquetas en el eje X para que los nombres no se amontonen
          formatter: (params) => {
            return params.value;
          },
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: formatMessage({ id: 'ADMIN.STATISTICS.QUANTITY' }),
        },
      },
    ],
  });

  return (
    <AgCharts
      options={options}
      style={{
        width: '100%',
        height: '500px',
        overflowX: 'auto',
      }}
    />
  );
};

export default BestSellingProductsChart;
