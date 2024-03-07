// ** MUI imports
import { styled } from '@mui/material/styles'

const ApexChartWrapper = styled('div')(({ theme }) => ({
  '& .apexcharts-canvas': {
    '& .apexcharts-legend-series': {
      margin: `${theme.spacing(0.75, 2)} !important`,
      '& .apexcharts-legend-text': {
        marginLeft: theme.spacing(0.75),
        color: `${theme.palette.grey[900]} !important`
      }
    },
  }
}))

export default ApexChartWrapper
