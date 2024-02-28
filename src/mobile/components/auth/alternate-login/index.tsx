import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { SxProps, Theme, alpha, styled } from '@mui/material/styles';
import Button from '@webapp/mobile/components/button';
import GoogleLogo from '@webapp/mobile/components/icons/google';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface AlternateLoginProps {
  className?: string;
  type?: 'signin' | 'signup';
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

const AlternateLogin: FunctionComponent<AlternateLoginProps> = ({ className, type, sx, onClick }) => {
  const { formatMessage } = useIntl();
  return (
    <Wrapper className={className || ''} sx={{ ...sx }}>
      <div className="or-divider">
        <Divider />
        <Typography className="text" variant="body2">
          {formatMessage({ id: 'COMMON.OR' })}
        </Typography>
        <Divider />
      </div>
      <Button className="or-button" variant="outlined" fullWidth color="info" onClick={onClick}>
        <GoogleLogo className="or-google-logo" isPlain={false} />
        {formatMessage({ id: type === 'signin' ? 'AUTH.SIGN_IN.GOOGLE.TITLE' : 'AUTH.SIGN_UP.GOOGLE.TITLE' })}
      </Button>
    </Wrapper>
  );
};

export default AlternateLogin;

const Wrapper = styled(Box)(({ theme }) => ({
  '.or-divider': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    marginBlock: theme.spacing(2, 3),
    '& > hr': {
      flex: 1,
      borderColor: alpha(theme.palette.text.primary, 0.25),
    },
    '.text': {
      margin: 0,
      textTransform: 'uppercase',
      color: alpha(theme.palette.text.primary, 0.5),
    },
  },
  '.or-button': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),

    '.or-google-logo': {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
  },
}));
