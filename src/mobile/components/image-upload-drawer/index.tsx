import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import Button from '../button';

interface ImageUploadDrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sendMessageToReactNative: (message: string) => void;
  entity: 'mobile-profile' | 'mobile-product';
}

export const ImageUploadDrawer: FunctionComponent<ImageUploadDrawerProps> = ({
  drawerOpen,
  setDrawerOpen,
  sendMessageToReactNative,
  entity,
}) => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  return (
    <Drawer
      anchor="bottom"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          borderRadius: '16px 16px 0 0',
          padding: theme.spacing(2),
        },
      }}
    >
      <Stack sx={{ width: '100%', gap: 4 }}>
        <Puller />
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{ mb: 2, color: theme.palette.grey[900], textAlign: 'center', pt: 4 }}
        >
          {entity === 'mobile-profile'
            ? formatMessage({ id: 'ADMIN.DRAWER.PROFILE.TITLE' })
            : formatMessage({ id: 'ADMIN.DRAWER.PRODUCT.TITLE' })}
        </Typography>
        <Button
          sx={{ width: '100%', mb: 2 }}
          onClick={() => {
            sendMessageToReactNative('open_camera');
            setDrawerOpen(false);
          }}
        >
          {formatMessage({ id: 'ADMIN.DRAWER.CAMERA.BUTTON' })}
        </Button>
        <Button
          sx={{ width: '100%', mb: 2 }}
          onClick={() => {
            sendMessageToReactNative('gallery_permission');
            setDrawerOpen(false);
          }}
        >
          {formatMessage({ id: 'ADMIN.DRAWER.GALLERY.SELECT.BUTTON' })}
        </Button>
      </Stack>
    </Drawer>
  );
};

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));
