import { Box, CircularProgress, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import ContentWrapper from '@webapp/components/content-wrapper';
import Modal from '@webapp/components/modal';
import UserCard from '@webapp/controller/admin/users-list/user-card';
import UserDetailModalContent from '@webapp/controller/admin/users-list/user-detail-modal-content';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useGetUsers } from '@webapp/sdk/mutations/auth/get-users-query';
import { User } from '@webapp/sdk/types/user-types';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

const StatisticsPage: React.FunctionComponent = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { formatMessage } = useIntl();



  return (
    <ContentWrapper>
      <StyledPaper>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '2em',
            fontWeight: 'bold',
            marginBottom: 2,
            color: theme.palette.common.black,
          }}
        >
          {formatMessage({ id: 'ADMIN.LIST.USERS.PAGE.TITLE' })}
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '1em',
            marginBottom: 2,
            color: theme.palette.common.black,
          }}
        >
          {formatMessage({ id: 'ADMIN.LIST.USERS.PAGE.SUBTITLE' })}
        </Typography>
      </StyledPaper>
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
