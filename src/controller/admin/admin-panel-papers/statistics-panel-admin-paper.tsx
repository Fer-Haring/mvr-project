import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@webapp/components/button';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { CustomAdminPaper } from './papers-styles';

const StatisticsPanelAdminPaper: React.FunctionComponent = () => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <CustomAdminPaper>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: 2,
          justifyContent: 'center',
          flexDirection: 'column',
          alignContent: 'center',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.grey[800],
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 3,
          }}
        >
          {formatMessage({ id: 'ADMIN.STATISTICS.MAIN.TITLE' })}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            color="primary"
            sx={{ width: '100%', fontSize: 14 }}
            onClick={() => navigate('/admin-dashboard/estadisticas')}
          >
            {formatMessage({ id: 'ADMIN.STATISTICS.SUBTITLE' })}
          </Button>
        </Box>
      </Box>
    </CustomAdminPaper>
  );
};

export default StatisticsPanelAdminPaper;
