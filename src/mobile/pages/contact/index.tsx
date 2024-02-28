import { Icon } from '@iconify/react';
import { Box, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import mapImage from '@webapp/assets/images/map.png';
import ContentWrapper from '@webapp/components/content-wrapper';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import MailForm from './mail-form';

export const MobileContactPage: FunctionComponent = () => {
  const theme = useTheme();
  const { formatMessage } = useIntl();

  return (
    <ContentWrapper>
      <Paper
        sx={{
          p: 2,
          backgroundColor: alpha(theme.palette.common.white, 0.6),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{ fontFamily: 'WordMean', textAlign: 'center', color: theme.palette.grey[800], p: 4 }}
        >
          {formatMessage({ id: 'CONTACT.PAGE.WHERE.WE.ARE' })}
        </Typography>
        <img
          src={mapImage}
          alt="Map"
          style={{
            width: '90%',
            height: 'auto',
            borderRadius: '10px',
            boxShadow: theme.shadows[2],
          }}
        />
        <StyledDivider orientation="horizontal" flexItem />
        <Stack spacing={2} sx={{ mt: 0, width: '100%' }}>
          {/* TITULO */}
          <Typography
            variant="h1"
            gutterBottom
            sx={{ fontFamily: 'WordMean', textAlign: 'center', color: theme.palette.grey[800] }}
          >
            {formatMessage({ id: 'CONTACT.PAGE.TITLE' })}
          </Typography>

          {/* CONTAINER */}
          <Stack
            direction={'row'}
            gap={2}
            width={'100%'}
            justifyContent={'space-evenly'}
            alignItems={'flex-start'}
            p={3}
          >
            {/* INFO CONTACTO */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Stack direction={'row'} gap={2} width={'100%'} justifyContent={'flex-start'} alignItems={'center'}>
                <Icon icon="mdi:cellphone" style={{ color: theme.palette.grey[800], width: 48, height: 48 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <Typography variant="h2" sx={{ color: theme.palette.grey[800] }}>
                    {formatMessage({ id: 'CONTACT.PAGE.PHONE.NUMBER' })}
                  </Typography>
                  <Typography variant="h5" sx={{ color: theme.palette.grey[800] }}>
                    {formatMessage({ id: 'CONTACT.PAGE.ATTENTION.HRS' })}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction={'row'} gap={2} width={'100%'} justifyContent={'flex-start'} alignItems={'center'}>
                <Icon
                  icon="mdi:alternate-email"
                  style={{ color: theme.palette.grey[800], width: 48, height: 48, maxWidth: 'none' }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <Typography variant="h2" sx={{ color: theme.palette.grey[800] }}>
                    {formatMessage({ id: 'CONTACT.PAGE.EMAIL' })}
                  </Typography>
                  <Typography variant="h5" sx={{ color: theme.palette.grey[800] }}>
                    {formatMessage({ id: 'CONTACT.PAGE.SAND.DOUBTS' })}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction={'row'} gap={2} width={'100%'} justifyContent={'flex-start'} alignItems={'center'}>
                <Icon icon="mdi:instagram" style={{ color: theme.palette.grey[800], width: 48, height: 48 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <Typography variant="h2" sx={{ color: theme.palette.grey[800] }}>
                    {formatMessage({ id: 'CONTACT.PAGE.INSTAGRAM' })}
                  </Typography>
                  <Typography variant="h5" sx={{ color: theme.palette.grey[800] }}>
                    {formatMessage({ id: 'CONTACT.PAGE.VISIT' })}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* FORMULARIO */}

            <MailForm />
          </Stack>
        </Stack>
      </Paper>
    </ContentWrapper>
  );
};

const StyledDivider = styled(Divider)({
  flexGrow: 1,
  margin: '10px 10px',
  marginTop: '60px',
});
