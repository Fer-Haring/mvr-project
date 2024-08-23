import { Box, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';
import ContentWrapper from '@webapp/components/content-wrapper';
import Modal from '@webapp/components/modal';
import UserCard from '@webapp/controller/admin/users-list/user-card';
import UserDetailModalContent from '@webapp/controller/admin/users-list/user-detail-modal-content';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useGetUsers } from '@webapp/sdk/mutations/auth/get-users-query';
import { User } from '@webapp/sdk/types/user-types';
import React from 'react';
import { useIntl } from 'react-intl';

const UserListPage: React.FunctionComponent = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { formatMessage } = useIntl();
  const { data, isFetching } = useGetUsers();
  const [userModalOpen, setUserModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  return (
    <ContentWrapper>
      <StyledPaper>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '2em',
            fontWeight: 'bold',
            marginBottom: 2,
            color: theme.palette.common.black,
          }}
        >
          {formatMessage({ id: 'ADMIN.LIST.USERS.PAGE.TITLE' })}
        </Typography>

        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '1em',
            marginBottom: 2,
            color: theme.palette.common.black,
          }}
        >
          {formatMessage({ id: 'ADMIN.LIST.USERS.PAGE.SUBTITLE' })} {data?.length}
        </Typography>

        {isFetching && <CircularProgress sx={{ mt: 3, mb: 3 }} />}
        <Box
          sx={{
            display: isMobile ? 'flex' : 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(1, 1fr)',
            gridGap: theme.spacing(4),
            flexDirection: isMobile ? 'column' : 'row',
            width: '100%',
            padding: 0,
            margin: 0,
          }}
        >
          {data?.map((user: User) => <UserCard key={user.id} user={user} onClick={() => handleUserClick(user)} />)}
        </Box>
      </StyledPaper>
      {userModalOpen && (
        <Modal
          open={userModalOpen}
          title={formatMessage({ id: 'ADMIN.LIST.USERS.MODAL.TITLE' })}
          onClose={() => setUserModalOpen(false)}
          customContent={<UserDetailModalContent user={selectedUser} />}
        />
      )}
    </ContentWrapper>
  );
};

export default UserListPage;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.common.white, 0.6),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '100%',
  width: '90vw',
  margin: 'auto',
}));
