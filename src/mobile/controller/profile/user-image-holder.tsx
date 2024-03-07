import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import { ImageUploadDrawer } from '@webapp/mobile/components/image-upload-drawer';
import ImageUploader from '@webapp/mobile/components/image-uploader';
import { uploadAvatar } from '@webapp/sdk/firebase/user';
import { User } from '@webapp/sdk/users-types';
import { useUserData } from '@webapp/store/users/user-data';
import SnackbarUtils from '@webapp/web/components/snackbar';
import { convertBase64ImageToFile } from '@webapp/web/utils/convert-base64-to-file';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

interface UserImageHolderProps {
  className?: string;
  user: User;
  sx?: SxProps<Theme>;
}

const UserImageHolder: FunctionComponent<UserImageHolderProps> = ({ user }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const [avatar, setAvatar] = React.useState<{ file?: File; url?: string }>({});
  const { setUser } = useUserData();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const onAvatarChange = useCallback(
    (avatarFile: File | undefined, url?: string) => {
      if (!avatarFile) {
        return;
      }
      const handleUpdateAvatar = async (image: File) => {
        const downloadURL = await uploadAvatar(image);
        if (downloadURL) {
          setUser({ ...user, profilePicture: downloadURL });
        }
      };
      setAvatar({
        file: avatarFile,
        url,
      });
      try {
        handleUpdateAvatar(avatarFile);
        SnackbarUtils.success(formatMessage({ id: 'PROFILE.USER_INFO.AVATAR_UPDATED' }));
      } catch (error) {
        SnackbarUtils.error(formatMessage({ id: 'PROFILE.USER_INFO.AVATAR_ERROR' }));
      }
    },
    [formatMessage, setUser, user]
  );

  function sendMessageToReactNative(message: string) {
    if (window.nativeAppHandler) {
      window.nativeAppHandler.postMessage(message);
    }
  }

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleMessage(event: any) {
      const data = event.data;
      if (data.type === 'selected_image') {
        setSelectedImage(data.base64Image);
        onAvatarChange(convertBase64ImageToFile(data.base64Image), data.base64Image);
      }
      if (data.type === 'camera_error') {
        SnackbarUtils.error(data.message);
      }
      if (data.type === 'gallery_error') {
        SnackbarUtils.error(data.message);
      }
    }

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [formatMessage, onAvatarChange, selectedImage]);

  return (
    <Stack
      sx={{
        mt: 3,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <ImageUploader
        sx={{ width: '100%' }}
        onImageChange={onAvatarChange}
        onImageDelete={() => {
          setAvatar({ file: undefined, url: undefined });
        }}
        defaultImageUrl={user.profilePicture || avatar.url}
        aria-label={formatMessage({ id: 'PROFILE.USER_INFO.AVATAR_UPLOAD' })}
        onClick={handleOpenDrawer}
        entity="mobile-profile"
      />
      <Stack
        sx={{
          mt: 3,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" fontWeight={600} sx={{ mb: 2, color: theme.palette.grey[900], textWrap: 'nowrap' }}>
          {user.name + ' ' + user.lastName}
        </Typography>
        <Typography variant="body2" fontWeight={400} sx={{ mb: 2, color: theme.palette.grey[600] }}>
          {user.email}
        </Typography>
      </Stack>
      {drawerOpen && (
        <ImageUploadDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          sendMessageToReactNative={sendMessageToReactNative}
          entity="mobile-profile"
        />
      )}
    </Stack>
  );
};

export default UserImageHolder;
