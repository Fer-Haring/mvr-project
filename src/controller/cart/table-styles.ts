import styled from '@emotion/styled';
import { ButtonGroup, Stack, Typography, alpha, useTheme } from '@mui/material';

export const TableBox = styled(Stack)(() => {
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
      overflowX: 'hidden',
      '& th': {
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.common.black,
        fontWeight: theme.typography.fontWeightBold,
        padding: theme.spacing(3),
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
        padding: theme.spacing(2),
        borderBottom: 0,
        // borderRight: `1px solid`,
        // borderColor: alpha(theme.palette.grey[800], 0.5),
        color: theme.palette.grey[800],
        fontSize: 14,
        textAlign: 'center',
        '&:first-of-type': {
          borderTopLeftRadius: theme.spacing(2),
          borderBottomLeftRadius: theme.spacing(2),
          textAlign: 'left',
        },
        '&:last-child': {
          borderTopRightRadius: theme.spacing(2),
          borderBottomRightRadius: theme.spacing(2),
          borderRight: 0,
          width: 'auto',
          textWrap: 'nowrap',
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
