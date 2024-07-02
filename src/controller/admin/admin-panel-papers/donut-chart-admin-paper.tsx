import { useGetAllOrders } from '@webapp/sdk/mutations/orders/get-all-orders-query';
import React, { FunctionComponent } from 'react';
import Chart from 'react-apexcharts';



import ApexChartWrapper from './apex-chart';
import { CustomAdminPaper } from './papers-styles';


const DonutChartPaper: FunctionComponent = () => {
  // const { orders } = useAdminDataStore();
  const getAllOrders = useGetAllOrders();
  const ordersStatus = Object.values(getAllOrders.data || [])
    .map((order) => order.status?.toLowerCase())
    .filter((status): status is string => status !== undefined);

  const orderStatusCountstringOccurrences = (arr: string[]) => {
    const orderStatusCounts: { [key: string]: number } = { pending: 0, completed: 0, canceled: 0 };

    arr.forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(orderStatusCounts, item)) {
        orderStatusCounts[item as keyof typeof orderStatusCounts] += 1;
      }
    });
    return orderStatusCounts;
  };
  const [series, setSeries] = React.useState<number[]>([]);
  const orderStatusCounts = orderStatusCountstringOccurrences(ordersStatus);
  const pendiente = Object.keys(orderStatusCounts).includes('pending') ? 'Pendiente' : '';
  const entregado = Object.keys(orderStatusCounts).includes('completed') ? 'Completado' : '';
  const cancelado = Object.keys(orderStatusCounts).includes('canceled') ? 'Cancelado' : '';

  React.useEffect(() => {
    setSeries([orderStatusCounts.canceled, orderStatusCounts.pending, orderStatusCounts.completed]);
    setOptions({
      chart: {
        type: 'donut' as const,
      },
      labels: [cancelado, pendiente, entregado],
      dataLabels: {
        enabled: true,
        formatter: function (val: string | number) {
          return val + '%';
        },
      },
      fill: {
        colors: ['#F44336', '#2977a8', '#26b100'],
      },
      colors: ['#F44336', '#2977a8', '#26b100'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 150,
            },
            legend: {
              position: 'bottom' as const,
            },
          },
        },
      ],
    });
  }, []);

  const [options, setOptions] = React.useState({
    chart: {
      type: 'donut' as const,
    },
    labels: ['Cancelado', 'Pendiente', 'Entregado'],
    dataLabels: {
      enabled: true,
      formatter: function (val: string | number) {
        return val + '%';
      },
    },
    fill: {
      colors: ['#F44336', '#2977a8', '#26b100'],
    },
    colors: ['#F44336', '#2977a8', '#26b100'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 150,
          },
          legend: {
            position: 'bottom' as const,
          },
        },
      },
    ],
  });

  return (
    <CustomAdminPaper>
      <ApexChartWrapper>
        <Chart options={options} series={series} type="donut" width="350" />
      </ApexChartWrapper>
    </CustomAdminPaper>
  );
};

export default DonutChartPaper;