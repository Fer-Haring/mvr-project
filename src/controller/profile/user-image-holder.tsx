import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import ImageUploader from '@webapp/components/image-uploader';
import { uploadAvatar } from '@webapp/sdk/firebase/user';
import { useUpdateUser } from '@webapp/sdk/mutations/auth/user-update-mutation';
import { User } from '@webapp/sdk/types/user-types';
import { useUserData } from '@webapp/store/users/user-data';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

interface UserImageHolderProps {
  className?: string;
  user: User;
  sx?: SxProps<Theme>;
}

const UserImageHolder: React.FunctionComponent<UserImageHolderProps> = ({ className, user, sx }) => {
  const { formatMessage } = useIntl();
  const [avatar, setAvatar] = useState<{ file?: File; url?: string }>({});
  const { setUser } = useUserData();
  const { mutate } = useUpdateUser(user?.id);

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
      const updatedUser = { ...user, profile_picture: downloadURL };
      setUser(updatedUser);
      mutate({ payload: updatedUser, file: undefined });
    }
  };

  return (
    <Box
      className={className || ''}
      sx={{ ...sx, mt: 5 }}
      aria-label={formatMessage({ id: 'PROFILE.USER_INFO.PANEL' })}
    >
      <ImageUploader
        sx={{ width: '100%' }}
        onImageChange={onAvatarChange}
        onImageDelete={() => {
          setAvatar({ file: undefined, url: undefined });
        }}
        defaultImageUrl={user?.profile_picture || avatar.url}
        aria-label={formatMessage({ id: 'PROFILE.USER_INFO.AVATAR_UPLOAD' })}
      />
    </Box>
  );
};

export default UserImageHolder;
