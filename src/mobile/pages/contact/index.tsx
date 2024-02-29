import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import ContentWrapper from '@webapp/mobile/components/content-wrapper';
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
        <Stack spacing={2} sx={{ mt: 0, width: '100%' }}>
          {/* TITULO */}
          <Typography
            variant="h2"
            gutterBottom
            sx={{ fontFamily: 'WordMean', textAlign: 'center', color: theme.palette.grey[800] }}
          >
            {formatMessage({ id: 'CONTACT.PAGE.TITLE' })}
          </Typography>

          {/* CONTAINER */}
          <Stack direction={'column'} gap={2} width={'100%'} justifyContent={'center'} alignItems={'center'} p={3}>
            {/* INFO CONTACTO */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 10,
              }}
            >
              <Stack direction={'row'} gap={2} width={'100%'} justifyContent={'flex-start'} alignItems={'center'}>
                <Icon icon="mdi:cellphone" style={{ color: theme.palette.grey[800], width: 48, height: 48 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                    {formatMessage({ id: 'CONTACT.PAGE.PHONE.NUMBER' })}
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.palette.grey[800] }}>
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
                  <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                    {formatMessage({ id: 'CONTACT.PAGE.EMAIL' })}
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.palette.grey[800] }}>
                    {formatMessage({ id: 'CONTACT.PAGE.SAND.DOUBTS' })}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction={'row'} gap={2} width={'100%'} justifyContent={'flex-start'} alignItems={'center'}>
                <Icon icon="mdi:instagram" style={{ color: theme.palette.grey[800], width: 48, height: 48 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                    {formatMessage({ id: 'CONTACT.PAGE.INSTAGRAM' })}
                  </Typography>
                  <Typography variant="h6" sx={{ color: theme.palette.grey[800] }}>
                    {formatMessage({ id: 'CONTACT.PAGE.VISIT' })}
                  </Typography>
                </Box>
              </Stack>
            </Box>
            {/* FORMULARIO */}
            <Typography variant="h3" sx={{ color: theme.palette.grey[800] }}>
              {formatMessage({ id: 'CONTACT.PAGE.FORM.TITLE' })}
            </Typography>
            <MailForm />
          </Stack>
        </Stack>
      </Paper>
    </ContentWrapper>
  );
};
