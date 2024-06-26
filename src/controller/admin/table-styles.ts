import styled from '@emotion/styled';
import { ButtonGroup, Paper, Typography, alpha, useTheme } from '@mui/material';

export const TableBox = styled(Paper)(() => {
  const theme = useTheme();
  return {
    backgroundColor: alpha(theme.palette.common.white, 0.8),
    padding: theme.spacing(2),
   
    marginTop: theme.spacing(2),
    boxShadow: theme.shadows[6],
    marginLeft: 'auto',
    marginRight: 'auto',
    border: 'none',
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    '& table': {
      '& th': {
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.common.black,
        fontWeight: theme.typography.fontWeightBold,
        padding: theme.spacing(2),
        textAlign: 'center',
        // borderRight: `1px solid`,
        border: 0,
        '&:first-of-type': {
          borderTopLeftRadius: theme.spacing(2),
          borderBottomLeftRadius: theme.spacing(2),
        },
        '&:last-child': {
          borderTopRightRadius: theme.spacing(2),
          borderBottomRightRadius: theme.spacing(2),
        },
      },
      '& tr': {
        '&:nth-of-type(odd)': {
          backgroundColor: alpha(theme.palette.primary.main, 0.5),
        },
      },
      '& td': {
        padding: theme.spacing(1),
        borderBottom: 0,
        color: theme.palette.common.black,
        fontSize: 12,
        '&:first-of-type': {
          borderTopLeftRadius: theme.spacing(2),
          borderBottomLeftRadius: theme.spacing(2),
        },
        '&:last-child': {
          borderTopRightRadius: theme.spacing(2),
          borderBottomRightRadius: theme.spacing(2),
          borderRight: 0,
        },
      },
    },
  };
});

export const HeadersTypos = styled(Typography)(() => {
  const theme = useTheme();
  return {
    color: theme.palette.common.black,
    fontSize: 14,
    fontWeight: 500,
    textAlign: 'center',
  };
});

export const CustomButtonGroup = styled(ButtonGroup)(() => {
  return {
    '& .MuiButtonGroup-firstButton': {
      borderTopLeftRadius: 0,
    },
    '& .MuiButtonGroup-lastButton': {
      borderBottomRightRadius: 0,
    },
  };
});
