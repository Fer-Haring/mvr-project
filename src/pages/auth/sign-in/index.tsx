import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Snackbar, styled, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import BackgroundVideo from '@webapp/assets/videos/video-login.mp4';
import AlternateLogin from '@webapp/components/auth/alternate-login';
import FormWrapper from '@webapp/components/auth/form-wrapper';
import Button from '@webapp/components/button';
import InputField from '@webapp/components/form/input';
import AuthLayoutContainer from '@webapp/components/layout/auth-layout-variants';
import SnackbarUtils from '@webapp/components/snackbar';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { useUserSignInMutation } from '@webapp/sdk/mutations/auth/user-sign-in-mutation';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

interface SignInPage2Props {
  className?: string;
}

const SignInPage2: FunctionComponent<SignInPage2Props> = ({ className }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const login = useUserSignInMutation(navigate);

  const [emailHasAutoFilled, setEmailHasAutoFilled] = useState<boolean>(false);
  const [passwordHasAutoFilled, setPasswordHasAutoFilled] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

  const hasValue = (value: string) => value !== '';

  useEffect(() => {
    if (login.error) {
      setError(login.error.message);
    }
  }, [login.error]);

  useEffect(() => {
    if (login.isPending) {
      setIsLoginLoading(true);
    }
  }, [login.isPending]);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // signIn(email, password, navigate);
    try {
      await login.mutateAsync({ email, password });
      // Redirigir a la página principal
      navigate('/home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Login failed:', error.message);
        if (error.message === 'El usuario registrado con Google no tiene contraseña establecida') {
          localStorage.setItem('email', email);
          SnackbarUtils.warning(
            'El usuario fue registrado con Google y no tiene contraseña establecida, establezca una contraseña para continuar.'
          );
          navigate('/set-password');
        }
        if (error.message === 'La contraseña no es correcta') {
          SnackbarUtils.error('La contraseña no es correcta');
          setIsLoginLoading(false);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
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

  async function loginWithGoogle() {
    window.location.href = 'https://mvr-prod.onrender.com/login/google';
  }

  const handleGoogleSignIn = async () => {
    await loginWithGoogle();
  };

  return (
    <section id="SignIn" className={className || ''} aria-labelledby="sign-in-title">
      <AuthLayoutContainer
        variant="half"
        leftContent={
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: 'flex', width: '70%', alignItems: 'center', justifyContent: 'center' }}
          >
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
                      shrink: emailHasAutoFilled || !!email,
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
                      shrink: passwordHasAutoFilled || !!password,
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
                    color='text'
                    onClick={goToRegister}
                    fullWidth={isMobile}
                    aria-label={formatMessage({ id: 'AUTH.SIGN_IN.LINK.LABEL' })}
                    sx={{ textWrap: 'balance', width: '100%' }}
                  >
                    {formatMessage({ id: 'AUTH.SIGN_IN.LINK.LABEL' })}
                  </Button>
                </Stack>
                {<AlternateLogin type="signin" onClick={handleGoogleSignIn} />}
              </Box>
            </FormWrapper>
            {error && <Snackbar open={true} autoHideDuration={6000} message={error} onClose={() => setError(null)} />}
            {success && (
              <Snackbar open={true} autoHideDuration={6000} message={success} onClose={() => setSuccess(null)} />
            )}
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

export default SignInPage2;

const BackgroundVideoStyle = styled('video')({
  position: 'absolute', // Posición absoluta para cubrir todo el contenedor
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Esto asegurará que el video cubra todo el espacio disponible sin perder su proporción
  zIndex: -1, // Coloca el video detrás de todo el contenido
});
