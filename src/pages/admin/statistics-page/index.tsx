import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Stack from '@mui/system/Stack';
import ContentWrapper from '@webapp/components/content-wrapper';
import ArsChart from '@webapp/controller/admin/admin-panel-papers/statistics-components/ars-chart';
import BestSellingProductsChart from '@webapp/controller/admin/admin-panel-papers/statistics-components/best-selling-products';
import ARSFinancialBalanceChart from '@webapp/controller/admin/admin-panel-papers/statistics-components/financial-summary-chart';
import UsdChart from '@webapp/controller/admin/admin-panel-papers/statistics-components/usd-chart';
import USDFinancialBalanceChart from '@webapp/controller/admin/admin-panel-papers/statistics-components/usd-financial-summary-chart';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import React from 'react';
import { useIntl } from 'react-intl';

const StatisticsPage: React.FunctionComponent = () => {
  const isMobile = useIsMobile();
  const theme = useTheme();
  const { formatMessage } = useIntl();

  return (
    <ContentWrapper>
      <Stack spacing={5} width={isMobile ? '100vw' : '85vw'}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '2em',
            fontWeight: 'bold',
            marginBottom: 2,
            color: theme.palette.common.white,
          }}
        >
          {formatMessage({ id: 'ADMIN.STATISTICS.MAIN.TITLE' })}
        </Typography>
        <StyledPaper>
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '1.5em',
              fontWeight: 'bold',
              marginBottom: 2,
              color: theme.palette.common.black,
            }}
          >
            {formatMessage({ id: 'ADMIN.STATISTICS.BALANCE_TITLE' })}
          </Typography>
          <Stack spacing={3} width={'100%'}>
            <ARSFinancialBalanceChart />
            <USDFinancialBalanceChart />
            <ArsChart />
            <UsdChart />
            <BestSellingProductsChart />
          </Stack>
        </StyledPaper>
      </Stack>
    </ContentWrapper>
  );
};

export default StatisticsPage;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.common.white, 0.6),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '100%',
  width: '90vw',
  margin: 'auto',
}));
