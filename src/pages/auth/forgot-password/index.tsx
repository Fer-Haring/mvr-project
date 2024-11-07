import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import BackgroundVideo from '@webapp/assets/videos/video-login.mp4';
import FormWrapper from '@webapp/components/auth/form-wrapper';
import Button from '@webapp/components/button';
import InputField from '@webapp/components/form/input';
import AuthLayoutContainer from '@webapp/components/layout/auth-layout-variants';
import { EMAIL_REGEX } from '@webapp/configuration/regex';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useAppDispatch, useAppSelector } from '@webapp/hooks/redux-hooks';
import { useSendCode } from '@webapp/hooks/userHooks/userHooks';
import { setEmail } from '@webapp/redux/store/slices/userSlices';
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
  const { sendCode, loading } = useSendCode();

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const dispatch = useAppDispatch();

  const { email } = useAppSelector((state) => state.user.userData) || '';

  const handleChangeEmail = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = ev.target.value;
    dispatch(setEmail(newEmail));
  };

  // useEffect(() => {
  //   console.log('Valor de email en el selector:', email);
  // }, [email]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = normalizeUserData(data.get('email'));

    if (!email || !EMAIL_REGEX.test(email)) {
      return;
    }
    console.log(email);
    sendCode({ email, navigate });
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

  console.log(!EMAIL_REGEX.test(email), email);

  return (
    <section id="forgotPassword" className={className || ''} aria-labelledby="forgot-password-title">
      <AuthLayoutContainer
        variant="half"
        leftContent={
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: 'flex', width: '70%', alignItems: 'center', justifyContent: 'center' }}
          >
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
                  onChange={handleChangeEmail}
                  error={touched.email && !!getError(email)}
                  helperText={getError(email)}
                  aria-invalid={!!getError(email)}
                />
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={1}
                  justifyContent={{
                    sm: 'center',
                    md: 'flex-end',
                  }}
                  sx={{ mt: { xs: 5, sm: 4 } }}
                >
                  <Button
                    loading={loading}
                    disabled={!EMAIL_REGEX.test(email)}
                    type="submit"
                    sx={{ flexShrink: 1 }}
                    fullWidth={isMobile}
                  >
                    {formatMessage({ id: 'AUTH.FORGOT_PASSWORD.BUTTON.LABEL' })}
                  </Button>
                  <Button variant="text" onClick={goToLogin} fullWidth={isMobile}>
                    {formatMessage({ id: 'AUTH.FORGOT_PASSWORD.BUTTON.BACK' })}
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
