import { alpha, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ContentWrapper from '@webapp/components/content-wrapper';
import FavoriteList from '@webapp/controller/profile/favorite-list';
import { ProfileTable } from '@webapp/controller/profile/profile-table';
import UserData from '@webapp/controller/profile/user-data';
import UserImageHolder from '@webapp/controller/profile/user-image-holder';
import UserInfoPersonal from '@webapp/controller/profile/user-info-personal';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useGetUserByIdMutation } from '@webapp/sdk/mutations/auth/get-user-by-id-mutation';
import { User } from '@webapp/sdk/types/user-types';
import { useUserStore } from '@webapp/store/auth/session';
import { useUserData } from '@webapp/store/users/user-data';
import React, { FunctionComponent, useEffect } from 'react';

export const ProfilePage: FunctionComponent = () => {
  const { user, setUser } = useUserData();
  const theme = useTheme();
  const isMobile = useIsMobile();
  const userData = useGetUserByIdMutation(useUserStore((state) => state.userInfo?.userId) || '');

  useEffect(() => {
    userData.refetch();
    setUser(userData.data as User);
  }, [setUser]);

  return (
    <ContentWrapper>
      <Stack
        sx={{ width: '100%' }}
        direction={isMobile ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Box sx={{ width: isMobile ? '100%' : '50%' }}>
          <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.common.white, 0.6) }}>
            <UserImageHolder user={user} />
            <UserInfoPersonal userData={user} setUser={setUser} />
          </Paper>
        </Box>
        <Box sx={{ width: isMobile ? '100%' : '50%', gap: 2, display: 'flex', flexDirection: 'column' }}>
          <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.common.white, 0.6) }}>
            <UserData userData={user} />
          </Paper>
          <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.common.white, 0.6) }}>
            <FavoriteList userData={user} />
          </Paper>
        </Box>
      </Stack>
      <Box sx={{ width: '100%', pt: 2 }}>
        <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.common.white, 0.6) }}>
          <ProfileTable />
        </Paper>
      </Box>
    </ContentWrapper>
  );
};
