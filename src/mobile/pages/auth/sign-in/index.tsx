import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { useIsMobile } from '@webapp/hooks/is-mobile';
import FormWrapper from '@webapp/mobile/components/auth/form-wrapper';
import Button from '@webapp/mobile/components/button';
import InputField from '@webapp/mobile/components/form/input';
import AuthLayoutContainer from '@webapp/mobile/components/layout/auth-layout-variants';
import { signIn } from '@webapp/sdk/firebase/auth';
import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

interface SignInPage2Props {
  className?: string;
}

const MobileSignInPage: FunctionComponent<SignInPage2Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const theme = useTheme();
  const { formatMessage } = useIntl();

  const makeAnimationStartHandler = (
    stateSetter: (value: boolean) => void
  ): ((e: React.AnimationEvent<HTMLInputElement | HTMLTextAreaElement>) => void) => {
    return (e) => {
      const autofilled = !!(e.target as Element)?.matches('*:-webkit-autofill');
      if (e.animationName === 'mui-auto-fill') {
        stateSetter(autofilled);
      }

      if (e.animationName === 'mui-auto-fill-cancel') {
        stateSetter(autofilled);
      }
    };
  };

  const [emailHasAutoFilled, setEmailHasAutoFilled] = useState<boolean>(false);
  const [passwordHasAutoFilled, setPasswordHasAutoFilled] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const hasValue = (value: string) => value !== '';

  const isLoginLoading = false;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn(email, password, navigate);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginFailed = false;

  const goToRegister = () => {
    navigate('/sign-up');
  };

  const goToForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <section id="SignIn" className={className || ''} aria-labelledby="sign-in-title">
      <AuthLayoutContainer variant="centered">
        <FormWrapper
          title={formatMessage({ id: 'AUTH.SIGN_IN.TITLE' })}
          subtitle={formatMessage({ id: 'AUTH.SIGN_IN.SUBTITLE' })}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack direction="column" spacing={1}>
              <InputField
                required
                fullWidth
                id="email"
                label={formatMessage({ id: 'AUTH.SIGN_IN.EMAIL.LABEL' })}
                value={email}
                onBlur={() => setTouched({ ...touched, email: true })}
                onChange={(ev) => {
                  setEmail(ev.target.value);
                  setEmailHasAutoFilled(hasValue(ev.target.value));
                }}
                error={(touched.email && !email) || !!loginFailed}
                helperText={touched.email && !email ? formatMessage({ id: 'COMMON.REQUIRED' }) : ''}
                name="email"
                autoComplete="email"
                autoFocus
                aria-label="Email"
                inputProps={{
                  onAnimationStart: makeAnimationStartHandler(setEmailHasAutoFilled),
                }}
                InputLabelProps={{
                  shrink: emailHasAutoFilled,
                }}
              />
              <InputField
                required
                fullWidth
                name="password"
                label={formatMessage({ id: 'AUTH.SIGN_IN.PASSWORD.LABEL' })}
                value={password}
                onBlur={() => setTouched({ ...touched, password: true })}
                onChange={(ev) => {
                  setPassword(ev.target.value);
                  setPasswordHasAutoFilled(hasValue(ev.target.value));
                }}
                error={(touched.password && !password) || !!loginFailed}
                helperText={touched.password && !password ? formatMessage({ id: 'COMMON.REQUIRED' }) : ''}
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={handleClickShowPassword} aria-label="Toggle Password Visibility">
                        {showPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                aria-label="Password"
                inputProps={{
                  onAnimationStart: makeAnimationStartHandler(setPasswordHasAutoFilled),
                }}
                InputLabelProps={{
                  shrink: passwordHasAutoFilled,
                }}
              />
              <Link
                underline="hover"
                onClick={goToForgotPassword}
                sx={{ display: 'block', width: theme.spacing(20) }}
                aria-label="Forgot Password"
              >
                {formatMessage({ id: 'AUTH.SIGN_IN.FORGOT_PASSWORD.LINK.LABEL' })}
              </Link>
            </Stack>
            <Stack direction="column" spacing={1} sx={{ mt: { xs: 5, sm: 4 } }}>
              <Button
                type="submit"
                disabled={!email || !password || password.length < 8}
                loading={isLoginLoading}
                sx={{ width: '100%' }}
                fullWidth={isMobile}
                aria-label={formatMessage({ id: 'AUTH.SIGN_IN.BUTTON.LABEL' })}
              >
                {formatMessage({ id: 'AUTH.SIGN_IN.BUTTON.LABEL' })}
              </Button>
              <Button
                variant="text"
                onClick={goToRegister}
                fullWidth={isMobile}
                aria-label={formatMessage({ id: 'AUTH.SIGN_IN.LINK.LABEL' })}
                sx={{ textWrap: 'balance', width: '100%' }}
              >
                {formatMessage({ id: 'AUTH.SIGN_IN.LINK.LABEL' })}
              </Button>
            </Stack>
            {/* <AlternateLogin type="signin" onClick={handleGoogleSignIn} /> */}
          </Box>
        </FormWrapper>
      </AuthLayoutContainer>
    </section>
  );
};

export default MobileSignInPage;
