import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import ImageUploader from '@webapp/components/image-uploader';
import { uploadAvatar } from '@webapp/sdk/firebase/user';
import { User } from '@webapp/sdk/users-types';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface UserImageHolderProps {
  className?: string;
  user: User;
  sx?: SxProps<Theme>;
}

const UserImageHolder: FunctionComponent<UserImageHolderProps> = ({ className, user, sx }) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const [avatar, setAvatar] = React.useState<{ file?: File; url?: string }>({});
  const { setUser } = useUserData();

  const onAvatarChange = (avatarFile: File | undefined, url?: string) => {
    if (!avatarFile) {
      return;
    }
    setAvatar({
      file: avatarFile,
      url,
    });
    handleUpdateAvatar(avatarFile);
  };

  const handleUpdateAvatar = async (image: File) => {
    const downloadURL = await uploadAvatar(image);
    if (downloadURL) {
      setUser({ ...user, profilePicture: downloadURL });
    }
  };

  return (
    <Box
      className={className || ''}
      sx={{ ...sx, mt: 5 }}
      aria-label={formatMessage({ id: 'PROFILE.USER_INFO.PANEL' })}
    >
      <ImageUploader
        sx={{ width: '100%'}}
        onImageChange={onAvatarChange}
        onImageDelete={() => {
          setAvatar({ file: undefined, url: undefined });
        }}
        defaultImageUrl={user.profilePicture || avatar.url}
        aria-label={formatMessage({ id: 'PROFILE.USER_INFO.AVATAR_UPLOAD' })}
      />
      <Stack
        sx={{
          mt: 3,
          width: '100%',
          minWidth: '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" fontWeight={600} sx={{ mb: 2, color: theme.palette.grey[900] }}>
          {user.name + ' ' + user.lastName}
        </Typography>
        <Typography variant="body1" fontWeight={400} sx={{ mb: 2, color: theme.palette.grey[600] }}>
          {user.email}
        </Typography>
      </Stack>
    </Box>
  );
};

export default UserImageHolder;
