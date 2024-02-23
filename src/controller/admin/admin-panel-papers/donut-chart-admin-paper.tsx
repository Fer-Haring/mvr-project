import { useAdminDataStore } from '@webapp/store/admin/admin-data';
import React, { FunctionComponent } from 'react';
import Chart from 'react-apexcharts';

import { CustomAdminPaper } from './papers-styles';
import ApexChartWrapper from './apex-chart';

const DonutChartPaper: FunctionComponent = () => {
  const { orders } = useAdminDataStore();
  const ordersStatus = Object.values(orders).map((order) => order.status);

  const orderStatusCountstringOccurrences = (arr: string[]) => {
    const orderStatusCounts: { [key: string]: number } = { Pending: 0, Completed: 0, Canceled: 0 };

    arr.forEach((item) => {
      if (Object.prototype.hasOwnProperty.call(orderStatusCounts, item)) {
        orderStatusCounts[item as keyof typeof orderStatusCounts] += 1;
      }
    });
    return orderStatusCounts;
  };
  const [series, setSeries] = React.useState<number[]>([]);
  const orderStatusCounts = orderStatusCountstringOccurrences(ordersStatus);
	const pendiente = Object.keys(orderStatusCounts).includes('Pending') ? 'Pendiente' : '';
	const entregado = Object.keys(orderStatusCounts).includes('Completed') ? 'Completado' : '';
	const cancelado = Object.keys(orderStatusCounts).includes('Canceled') ? 'Cancelado' : '';



  React.useEffect(() => {
    setSeries([orderStatusCounts.Canceled, orderStatusCounts.Pending, orderStatusCounts.Completed]);
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
		})
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
