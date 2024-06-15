import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import BackgroundVideo from '@webapp/assets/videos/video-login.mp4';
import AlternateLogin from '@webapp/components/auth/alternate-login';
import FormWrapper from '@webapp/components/auth/form-wrapper';
import PasswordRequirements from '@webapp/components/auth/password-requirements';
import Button from '@webapp/components/button';
import InputField from '@webapp/components/form/input';
import AuthLayoutContainer from '@webapp/components/layout/auth-layout-variants';
import SnackbarUtils from '@webapp/components/snackbar';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { saveUserInDb, signUp } from '@webapp/sdk/firebase/auth';
import { auth } from '@webapp/sdk/firebase/firebase';
import { validateEmail } from '@webapp/utils/input-validations';
import { AnimatePresence } from 'framer-motion';
import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

interface SignUpPage2Props {
  className?: string;
}

const SignUpPage2: FunctionComponent<SignUpPage2Props> = ({ className }) => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const isSignUpLoading = false;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signUp(email, password);
      const user = auth.currentUser?.uid;
      saveUserInDb(firstName, lastName, email, '', user);
      navigate('/sign-in');
    } catch (error) {
      SnackbarUtils.error('An unexpected error occurred');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordError = () => {
    if (!touched.password) {
      return '';
    }
    if (touched.password && !password) {
      return formatMessage({ id: 'COMMON.REQUIRED' });
    }
  };

  const getConfirmPasswordError = () => {
    if (!touched.confirmPassword) {
      return '';
    }
    if (touched.confirmPassword && !confirmPassword) {
      return formatMessage({ id: 'COMMON.REQUIRED' });
    }
    if (password !== confirmPassword) {
      return formatMessage({ id: 'COMMON.PASSWORD.NOT_MATCH' });
    }
  };

  const goToLogin = () => {
    navigate('/sign-in');
  };

  async function loginWithGoogle() {
    window.location.href = "http://127.0.0.1:8000/login/google";
  }

  const handleGoogleSignUp = async () => {
   await loginWithGoogle();
  };

  const handleDisabled =
    !validateEmail(email) ||
    !/^(?=.*?[A-Z])(?=.*?[0-9])[\S]{8,}$/.test(password) ||
    !confirmPassword ||
    password !== confirmPassword ||
    !!getConfirmPasswordError() ||
    !firstName ||
    !lastName;

  return (
    <section id="SignUp" className={className || ''} aria-labelledby="sign-up-title">
      <AuthLayoutContainer
        variant="half"
        leftContent={
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: 'flex', width: '70%', alignItems: 'center', justifyContent: 'center' }}
          >
            <FormWrapper
              title={formatMessage({ id: 'AUTH.SIGN_UP.TITLE' })}
              subtitle={formatMessage({ id: 'AUTH.SIGN_UP.SUBTITLE' })}
              aria-label={formatMessage({ id: 'AUTH.SIGN_UP.TITLE' })}
            >
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack direction="column" spacing={{ xs: 1, md: 0.5 }} sx={{ position: 'relative' }}>
                  <Stack direction="row" spacing={1}>
                    <InputField
                      name="firstName"
                      required
                      fullWidth
                      variant="standard"
                      id="firstName"
                      autoComplete="given-name"
                      label={formatMessage({ id: 'AUTH.SIGN_UP.FIRST_NAME.LABEL' })}
                      value={firstName}
                      onBlur={() => setTouched({ ...touched, firstName: true })}
                      onChange={(ev) => firstName.length < 30 && setFirstName(ev.target.value)}
                      error={touched.firstName && !firstName}
                      helperText={touched.firstName && !firstName ? formatMessage({ id: 'COMMON.REQUIRED' }) : ''}
                      autoFocus
                      aria-label={formatMessage({ id: 'AUTH.SIGN_UP.FIRST_NAME.LABEL' })}
                    />
                    <InputField
                      name="lastName"
                      required
                      fullWidth
                      variant="standard"
                      id="lastName"
                      autoComplete="family-name"
                      label={formatMessage({ id: 'AUTH.SIGN_UP.LAST_NAME.LABEL' })}
                      value={lastName}
                      onBlur={() => setTouched({ ...touched, lastName: true })}
                      onChange={(ev) => lastName.length < 30 && setLastName(ev.target.value)}
                      error={touched.lastName && !lastName}
                      helperText={touched.lastName && !lastName ? formatMessage({ id: 'COMMON.REQUIRED' }) : ''}
                      aria-label={formatMessage({ id: 'AUTH.SIGN_UP.LAST_NAME.LABEL' })}
                    />
                  </Stack>
                  <Stack direction={{ sm: 'column', md: 'row' }} spacing={1} rowGap={1}>
                    <InputField
                      required
                      fullWidth
                      variant="standard"
                      id="email"
                      autoComplete="email"
                      label={formatMessage({ id: 'AUTH.SIGN_UP.EMAIL.LABEL' })}
                      value={email}
                      onBlur={() => setTouched({ ...touched, email: true })}
                      onChange={(ev) => setEmail(ev.target.value)}
                      error={touched.email && !validateEmail(email)}
                      helperText={touched.email && !email ? formatMessage({ id: 'COMMON.REQUIRED' }) : ''}
                      aria-label={formatMessage({ id: 'AUTH.SIGN_UP.EMAIL.LABEL' })}
                    />
                  </Stack>
                  <Stack direction={{ sm: 'column', md: 'row' }} spacing={1} rowGap={1}>
                    <InputField
                      required
                      fullWidth
                      name="password"
                      label={formatMessage({ id: 'AUTH.SIGN_UP.PASSWORD.LABEL' })}
                      value={password}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="new-password"
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => {
                        setIsPasswordFocused(false);
                        setTouched({ ...touched, password: true });
                      }}
                      onChange={(ev) => setPassword(ev.target.value)}
                      error={!!getPasswordError()}
                      helperText={getPasswordError()}
                      inputProps={{
                        pattern: '^(?=.*?[A-Z])(?=.*?[0-9])[\\S]{8,}$',
                        autoComplete: 'new-password',
                        form: {
                          autoComplete: 'off',
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton onClick={handleClickShowPassword}>
                              {showPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      aria-label={formatMessage({ id: 'AUTH.SIGN_UP.PASSWORD.LABEL' })}
                    />
                    <InputField
                      required
                      fullWidth
                      name="confirm-password"
                      label={formatMessage({ id: 'AUTH.SIGN_UP.PASSWORD.CONFIRM.LABEL' })}
                      value={confirmPassword}
                      type={showPassword ? 'text' : 'password'}
                      id="confirm-password"
                      autoComplete="new-password"
                      onBlur={() => setTouched({ ...touched, confirmPassword: true })}
                      onChange={(ev) => setConfirmPassword(ev.target.value)}
                      error={!!getConfirmPasswordError()}
                      helperText={getConfirmPasswordError()}
                      inputProps={{
                        pattern: '^(?=.*?[A-Z])(?=.*?[0-9])[\\S]{8,}$',
                        autoComplete: 'new-password',
                        form: {
                          autoComplete: 'off',
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton onClick={handleClickShowPassword}>
                              {showPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      aria-label={formatMessage({ id: 'AUTH.SIGN_UP.PASSWORD.CONFIRM.LABEL' })}
                    />
                  </Stack>
                  <AnimatePresence mode="wait">
                    {password && isPasswordFocused && (
                      <PasswordRequirements
                        hasAutoHide
                        password={password}
                        sx={{
                          position: 'absolute',
                          right: 0,
                          bottom: 0,
                          left: 0,
                          transform: { xs: `translateY(calc(100% + ${theme.spacing(1)}))`, md: 'translateY(100%)' },
                          zIndex: 10,
                        }}
                        aria-label={formatMessage({ id: 'AUTH.SIGN_UP.PASSWORD.LABEL' })}
                      />
                    )}
                  </AnimatePresence>
                </Stack>
                <Stack direction="column" spacing={1} sx={{ mt: 4 }} role="group" aria-labelledby="sign-up-button">
                  <Button
                    type="submit"
                    id="sign-up-button"
                    disabled={handleDisabled}
                    loading={isSignUpLoading}
                    sx={{ width: '100%' }}
                    fullWidth={isMobile}
                    aria-label={formatMessage({ id: 'AUTH.SIGN_UP.BUTTON.LABEL' })}
                  >
                    {formatMessage({ id: 'AUTH.SIGN_UP.BUTTON.LABEL' })}
                  </Button>
                  <Button
                    variant="text"
                    onClick={goToLogin}
                    fullWidth={isMobile}
                    sx={{ flexShrink: 0 }}
                    aria-label={formatMessage({ id: 'AUTH.SIGN_UP.LINK.LABEL' })}
                  >
                    {formatMessage({ id: 'AUTH.SIGN_UP.LINK.LABEL' })}
                  </Button>
                </Stack>
                <AlternateLogin
              type="signup"
              onClick={handleGoogleSignUp}
            />
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

export default SignUpPage2;

const BackgroundVideoStyle = styled('video')({
  position: 'absolute', // Posición absoluta para cubrir todo el contenedor
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Esto asegurará que el video cubra todo el espacio disponible sin perder su proporción
  zIndex: -1, // Coloca el video detrás de todo el contenido
});
