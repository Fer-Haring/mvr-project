import { Divider, alpha, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ContentWrapper from '@webapp/mobile/components/content-wrapper';
import { ProfileOrdersAccordions } from '@webapp/mobile/controller/profile/profile-table';
import UserData from '@webapp/mobile/controller/profile/user-data';
import UserImageHolder from '@webapp/mobile/controller/profile/user-image-holder';
import { useUserData } from '@webapp/store/users/user-data';
import { FunctionComponent } from 'react';

export const MobileProfilePage: FunctionComponent = () => {
  const { user } = useUserData();
  const theme = useTheme();

  return (
    <ContentWrapper>
      <Paper sx={{ p: 2, backgroundColor: alpha(theme.palette.common.white, 0.6) }}>
        <Stack
          spacing={2}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
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
      </Paper>
      <ProfileOrdersAccordions />
    </ContentWrapper>
  );
};
