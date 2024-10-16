import { useGetAllOrders } from '@webapp/sdk/mutations/orders/get-all-orders-query';
import { useProductListQuery } from '@webapp/sdk/mutations/products/get-product-list-query';
import { AgCartesianChartOptions, AgTooltipRendererResult } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-react';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

const FinancialBalanceChart: React.FunctionComponent = () => {
  const { formatMessage } = useIntl();

  // Obtener las órdenes y los productos
  const { data: allOrdersData = [] } = useGetAllOrders();
  const productListArray = useProductListQuery(1, 500);

  // Mapa de costos y precios de venta de productos
  const productPriceMap: { [productId: string]: { cost_price: number; sale_price: string } } = {};

  // Asocia cada producto con su precio de costo y precio de venta
  productListArray.data?.products?.forEach((product) => {
    if (product.price_currency === 'USD') {
      // O 'ARS' dependiendo de la moneda que estás calculando
      productPriceMap[product.id] = {
        cost_price: product.cost_price ?? 0,
        sale_price: product.sale_price ?? 0,
      };
    }
  });

  // Calcular haberes, deberes y ganancias mensuales
  const financialData: { [month: string]: { haberes: number; deberes: number; ganancias: number } } = {};

  allOrdersData.forEach((order) => {
    if (order.currency_used_to_pay === 'USD') {
      // Cambiar a 'ARS' si necesitas el cálculo para ARS
      const month = new Date(order.created_at ?? '').toISOString().slice(0, 7); // Obtener el mes en formato YYYY-MM

      if (!financialData[month]) {
        financialData[month] = { haberes: 0, deberes: 0, ganancias: 0 };
      }

      let totalOrderCost = 0;
      let totalOrderSale = 0;

      // Calcular el costo total y el precio de venta total para cada producto vendido
      order.cart_items?.forEach((item) => {
        const productPrices = productPriceMap[item.product_id];
        const quantity = item.quantity ?? 0;

        if (productPrices && quantity > 0) {
          const costPrice = productPrices.cost_price;
          const salePrice = productPrices.sale_price;

          // Multiplicar por la cantidad vendida
          totalOrderCost += costPrice * quantity;
          totalOrderSale += Number(salePrice) * quantity;
        }
      });

      const haberes = totalOrderSale; // Ingresos totales por las ventas
      const deberes = totalOrderCost; // Costos totales
      const ganancias = Math.max(haberes - deberes, 0);

      financialData[month].haberes += haberes;
      financialData[month].deberes += deberes;
      financialData[month].ganancias += ganancias;
    }
  });

  // Formatear los datos para el gráfico
  const chartData = useMemo(() => {
    return Object.keys(financialData).map((month) => ({
      month,
      haberes: financialData[month].haberes,
      deberes: financialData[month].deberes,
      ganancias: financialData[month].ganancias,
    }));
  }, [financialData]);

  // Configuración del gráfico
  const [options] = useState<AgCartesianChartOptions>({
    title: {
      text: formatMessage({ id: 'FINANCE.USD.TITLE' }), // Título del gráfico
    },
    data: chartData,
    series: [
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'haberes',
        fill: '#4caf50',
        stroke: '#000000',
        yName: formatMessage({ id: 'FINANCE.HABERES' }),
        tooltip: {
          renderer: (params): AgTooltipRendererResult => {
            const { month, haberes } = params.datum;
            return {
              content: `${formatMessage({ id: 'FINANCE.MONTH' })}: ${month}<br>${formatMessage({ id: 'FINANCE.HABERES' })}: $${haberes.toLocaleString()} USD`,
            };
          },
        },
      },
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'deberes',
        fill: '#ff9800',
        stroke: '#000000',
        yName: formatMessage({ id: 'FINANCE.DEBERES' }),
        tooltip: {
          renderer: (params): AgTooltipRendererResult => {
            const { month, deberes } = params.datum;
            return {
              content: `${formatMessage({ id: 'FINANCE.MONTH' })}: ${month}<br>${formatMessage({ id: 'FINANCE.DEBERES' })}: $${deberes.toLocaleString()} USD`,
            };
          },
        },
      },
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'ganancias',
        fill: '#2196f3',
        stroke: '#000000',
        yName: formatMessage({ id: 'FINANCE.GANANCIAS' }),
        tooltip: {
          renderer: (params): AgTooltipRendererResult => {
            const { month, ganancias } = params.datum;
            return {
              content: `${formatMessage({ id: 'FINANCE.MONTH' })}: ${month}<br>${formatMessage({ id: 'FINANCE.GANANCIAS' })}: $${ganancias.toLocaleString()} USD`,
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
          text: formatMessage({ id: 'FINANCE.MONTH' }),
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: formatMessage({ id: 'FINANCE.AMOUNT' }),
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

export default FinancialBalanceChart;
