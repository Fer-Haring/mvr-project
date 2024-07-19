import { Icon } from '@iconify/react';
import { alpha, useTheme } from '@mui/material';
import { Box, Stack, Typography } from '@mui/material';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import React, { FunctionComponent } from 'react';

interface ContactInfoProps {
  icon: string;
  title: string;
  subtitle: string;
  url?: string;
}

const ContactInfo: FunctionComponent<ContactInfoProps> = ({ icon, title, subtitle, url }) => {
  const theme = useTheme();
  const isMobile = useIsMobile();

  return (
    <Stack
      direction={'row'}
      gap={2}
      width={'100%'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      onClick={() => {
        if (url) window.open(url, '_blank');
      }}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.2),
        },
      }}
    >
      <Icon icon={icon} style={{ color: theme.palette.grey[800], width: 48, height: 48, minWidth: 48, minHeight: 48 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <Typography variant="h2" sx={{ color: theme.palette.grey[800], fontSize: isMobile ? '4vw' : 30 }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ color: theme.palette.grey[800], fontSize: isMobile ? '3vw' : 18 }}>
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  );
};

export default ContactInfo;
