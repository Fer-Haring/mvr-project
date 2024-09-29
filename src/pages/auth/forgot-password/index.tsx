import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormWrapper from '@webapp/components/auth/form-wrapper';
import Button from '@webapp/components/button';
import InputField from '@webapp/components/form/input';
import AuthLayoutContainer from '@webapp/components/layout/auth-layout-variants';
import { EMAIL_REGEX } from '@webapp/configuration/regex';
import BackgroundVideo from '@webapp/assets/videos/video-login.mp4';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useSendRecoveryCodeMutation } from '@webapp/sdk/mutations/auth/password/send-password-recovery-code-mutation';
import { useRecoveryPasswordData } from '@webapp/store/auth/recovery-password-data';

import { normalizeUserData } from '@webapp/utils/normalize-user-data';
import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

interface ForgotPasswordPage2Props {
  className?: string;
}

const ForgotPasswordPage2: FunctionComponent<ForgotPasswordPage2Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { mutate, isPending } = useSendRecoveryCodeMutation();

  const loading = isPending;
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  // const [email, setEmail] = useState(username || '');
  const { email, setEmail } = useRecoveryPasswordData();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = normalizeUserData(data.get('email'));

    if (email) {
      mutate({ email, navigate });
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return;
    }
  };

  const getError = (email: string) => {
    if (!touched.email) {
      return '';
    }
    if (!email) {
      return formatMessage({ id: 'COMMON.REQUIRED' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return formatMessage({ id: 'AUTH.FORGOT_PASSWORD.EMAIL.ERROR' });
    }
    return '';
  };

  const goToLogin = () => navigate('/sign-in');

  return (
    <section id="forgotPassword" className={className || ''} aria-labelledby="forgot-password-title">
      <AuthLayoutContainer
        variant="half"
        leftContent={
          <Stack direction="column" spacing={2} sx={{ display: 'flex', width: '70%', alignItems: 'center', justifyContent: 'center' }}>
            <FormWrapper
              title={formatMessage({ id: 'AUTH.FORGOT_PASSWORD.TITLE' })}
              subtitle={formatMessage({ id: 'AUTH.FORGOT_PASSWORD.SUBTITLE' })}
            >
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <InputField
                  required
                  fullWidth
                  id="email"
                  label={formatMessage({ id: 'AUTH.FORGOT_PASSWORD.EMAIL.LABEL' })}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  type="email"
                  value={email}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  onChange={(ev) => setEmail(ev.target.value)}
                  error={touched.email && !!getError(email)}
                  helperText={getError(email)}
                  aria-invalid={!!getError(email)} // Indicate invalid input
                />
                <Stack
                  direction={{ xs: 'column-reverse', md: 'row' }}
                  spacing={1}
                  justifyContent={{
                    sm: 'center',
                    md: 'flex-end',
                  }}
                  sx={{ mt: { xs: 5, sm: 4 } }}
                >
                  <Button variant="text" onClick={goToLogin} fullWidth={isMobile} aria-label="Back to Login">
                    {formatMessage({ id: 'AUTH.FORGOT_PASSWORD.BUTTON.BACK' })}
                  </Button>
                  <Button
                    loading={loading}
                    disabled={!EMAIL_REGEX.test(email)}
                    type="submit"
                    sx={{ flexShrink: 0 }}
                    fullWidth={isMobile}
                    aria-label="Submit"
                  >
                    {formatMessage({ id: 'AUTH.FORGOT_PASSWORD.BUTTON.LABEL' })}
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

export default ForgotPasswordPage2;


const BackgroundVideoStyle = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: -1,
});
