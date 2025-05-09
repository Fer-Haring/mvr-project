import { Paper, alpha, styled } from '@mui/material';

export const CustomAdminPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.common.white, 0.7),
  maxHeight: 200,
  height: 'auto',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  boxShadow: theme.shadows[6],
}));
