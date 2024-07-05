import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import FormWrapper from '@webapp/components/auth/form-wrapper';
import VerificationCodeCtrl from '@webapp/components/auth/verification-code';
import Button from '@webapp/components/button';
import AuthLayoutContainer from '@webapp/components/layout/auth-layout-variants';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import BackgroundVideo from '@webapp/assets/videos/video-login.mp4';
import { useSendRecoveryCodeMutation } from '@webapp/sdk/mutations/auth/password/send-password-recovery-code-mutation';
import { useVerifyRecoveryCodeMutation } from '@webapp/sdk/mutations/auth/password/verify-recovery-code-mutation';
import { useRecoveryPasswordData } from '@webapp/store/auth/recovery-password-data';
import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';

interface VerificationCodePageProps {
  className?: string;
}

const VerificationCodePage: FunctionComponent<VerificationCodePageProps> = ({ className }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const theme = useTheme();
  const params = new URLSearchParams(useLocation().search);
  const { formatMessage } = useIntl();
  const [alreadySent, setAlreadySent] = useState<boolean>(false);
  const {mutate, isPending} = useSendRecoveryCodeMutation();
  const {mutate: verifyCodeMutate, isPending: verifyCodeIsPending} = useVerifyRecoveryCodeMutation();
  const {email, setCode: setVerifycationCode} = useRecoveryPasswordData();

  const username = email || '';

  const loading = isPending || verifyCodeIsPending;
  const error = false;

  const codeLength = 6;

  const [code, setCode] = useState(params.get('code') || '');
  const [resentCode, setResentCode] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !code) {
      return;
    }
    setVerifycationCode(code);
    verifyCodeMutate({ email: username, code, navigate });
  };

  const resendCode = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!username || !!alreadySent) {
      return;
    }

    if(username) {
      mutate({ email: username, navigate });
      setAlreadySent(true);
      
    }

    setResentCode(true);
  };

  const renderResendLink = () => {
    if (resentCode && loading) {
      return (
        <Typography variant="body2" fontWeight={600}>
          {formatMessage({ id: 'AUTH.VERIFICATION_CODE.RESEND_CODE.LINK.SENDING.LABEL' })}
        </Typography>
      );
    }

    if (alreadySent) {
      return (
        <Typography variant="body2" fontWeight={600}>
          {formatMessage({ id: 'AUTH.VERIFICATION_CODE.RESEND_CODE.LINK.SENT.LABEL' })}
        </Typography>
      );
    }

    return (
      <Button
        variant="text"
        onClick={resendCode}
        fullWidth={isMobile}
        aria-label={formatMessage({ id: 'AUTH.VERIFICATION_CODE.RESEND_CODE.LINK.LABEL' })}
      >
        {formatMessage({ id: 'AUTH.VERIFICATION_CODE.RESEND_CODE.LINK.LABEL' })}
      </Button>
    );
  };

  const handleVerificationOnChange = (data: string) => {
    setCode(data);
  };

  const handleVerificationOnCompleted = (data: string) => {
    if (!username || !data) {
      return;
    }
  };

  return (
    <section id="VerificationCode" className={className || ''} aria-labelledby="verification-code-title">
       <AuthLayoutContainer
        variant="half"
        leftContent={
          <Stack direction="column" spacing={2} sx={{ display: 'flex', width: '70%', alignItems: 'center', justifyContent: 'center' }}>
            <FormWrapper
          title={formatMessage({ id: 'AUTH.VERIFICATION_CODE.TITLE' })}
          customSubtitle={
            <Stack gap={0.5} direction={{ xs: 'column', sm: 'row' }} alignItems="baseline">
              <Typography component="h6" variant="h5">
                {formatMessage({ id: 'AUTH.VERIFICATION_CODE.SUBTITLE' })}
              </Typography>
              <Typography component="h6" variant="h5" color={theme.palette.text.secondary}>
                {username || ''}
              </Typography>
            </Stack>
          }
        >
          <Box component="form" onSubmit={handleSubmit} noValidate>
          <VerificationCodeCtrl
              error={error}
              placeholder={code}
              value={code}
              success={code.length >= codeLength}
              length={codeLength}
              onChange={handleVerificationOnChange}
              onCompleted={handleVerificationOnCompleted}
            />
            <Stack
              direction={{ xs: 'column-reverse', sm: 'row' }}
              spacing={2}
              justifyContent={{
                xs: 'center',
                md: 'flex-end',
              }}
              alignItems="center"
              sx={{ mt: { xs: 5, sm: 4 } }}
              role="group"
              aria-labelledby="verification-code-button"
            >
              {renderResendLink()}
              <Button
                fullWidth={isMobile}
                type="submit"
                disabled={codeLength > code.length}
                loading={loading}
                sx={{ flexShrink: 0 }}
                aria-label={formatMessage({ id: 'AUTH.VERIFICATION_CODE.BUTTON.LABEL' })}
              >
                {formatMessage({ id: 'AUTH.VERIFICATION_CODE.BUTTON.LABEL' })}
              </Button>
            </Stack>
          </Box>
        </FormWrapper>
          </Stack>
        }
        rightContent={
          <BackgroundVideoStyle autoPlay loop muted className="bg-video">
            <source src={BackgroundVideo} type="video/mp4" />
          </BackgroundVideoStyle>
        }
      />
    </section>
  );
};

export default VerificationCodePage


const BackgroundVideoStyle = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: -1,
});

      {/* <AuthLayoutContainer variant="centered">
        <FormWrapper
          title={formatMessage({ id: 'AUTH.VERIFICATION_CODE.TITLE' })}
          customSubtitle={
            <Stack gap={0.5} direction={{ xs: 'column', sm: 'row' }} alignItems="baseline">
              <Typography component="h6" variant="h5">
                {formatMessage({ id: 'AUTH.VERIFICATION_CODE.SUBTITLE' })}
              </Typography>
              <Typography component="h6" variant="h5" color={theme.palette.text.secondary}>
                {username || ''}
              </Typography>
            </Stack>
          }
        >
          <Box component="form" onSubmit={handleSubmit} noValidate>
          <VerificationCodeCtrl
              error={error}
              placeholder={code}
              value={code}
              success={code.length >= codeLength}
              length={codeLength}
              onChange={handleVerificationOnChange}
              onCompleted={handleVerificationOnCompleted}
            />
            <Stack
              direction={{ xs: 'column-reverse', sm: 'row' }}
              spacing={2}
              justifyContent={{
                xs: 'center',
                md: 'flex-end',
              }}
              alignItems="center"
              sx={{ mt: { xs: 5, sm: 4 } }}
              role="group"
              aria-labelledby="verification-code-button"
            >
              {renderResendLink()}
              <Button
                fullWidth={isMobile}
                type="submit"
                disabled={codeLength > code.length}
                loading={loading}
                sx={{ flexShrink: 0 }}
                aria-label={formatMessage({ id: 'AUTH.VERIFICATION_CODE.BUTTON.LABEL' })}
              >
                {formatMessage({ id: 'AUTH.VERIFICATION_CODE.BUTTON.LABEL' })}
              </Button>
            </Stack>
          </Box>
        </FormWrapper>
      </AuthLayoutContainer>
    </section>
  );
};

export default VerificationCodePage; */}
