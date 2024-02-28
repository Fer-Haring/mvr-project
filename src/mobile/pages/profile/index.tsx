import { Divider, alpha, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ContentWrapper from '@webapp/mobile/components/content-wrapper';
import { ProfileTable } from '@webapp/mobile/controller/profile/profile-table';
import UserData from '@webapp/mobile/controller/profile/user-data';
import UserImageHolder from '@webapp/mobile/controller/profile/user-image-holder';
import { useUserData } from '@webapp/store/users/user-data';
import { FunctionComponent } from 'react';

export const MobileProfilePage: FunctionComponent = () => {
  const { user } = useUserData();
  const theme = useTheme();

  return (
    <ContentWrapper>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          padding: 4,
          width: '100%',
          '& > *': {
            flexGrow: 1,
          },
        }}
      >
        <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.common.white, 0.6) }}>
          <Stack
            spacing={2}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}
          >
            <Box sx={{ width: '100%', maxWidth: 700 }}>
              <UserImageHolder user={user} />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ width: '100%' }}>
              <UserData userData={user} />
            </Box>
          </Stack>
          <ProfileTable />
        </Paper>
      </Box>
    </ContentWrapper>
  );
};
