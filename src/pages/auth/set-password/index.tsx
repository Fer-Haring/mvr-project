import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import BackgroundVideo from '@webapp/assets/videos/video-login.mp4';
import FormWrapper from '@webapp/components/auth/form-wrapper';
import PasswordRequirements from '@webapp/components/auth/password-requirements';
import Button from '@webapp/components/button';
import InputField from '@webapp/components/form/input';
import AuthLayoutContainer from '@webapp/components/layout/auth-layout-variants';
import SnackbarUtils from '@webapp/components/snackbar';
import { useIsMobile } from '@webapp/hooks/is-mobile';
import { setPassword } from '@webapp/sdk/actions/auth/set-password';
import { AnimatePresence } from 'framer-motion';
import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

interface SetPasswordPageProps {
  className?: string;
}

const SetPasswordPage: FunctionComponent<SetPasswordPageProps> = ({ className }) => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const email = localStorage.getItem('email') || '';

  const isSignUpLoading = false;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await setPassword({ email, new_password: newPassword });
      navigate('/sign-in');
      SnackbarUtils.success(formatMessage({ id: 'AUTH.CREATE.PASSWORD.SUCCESS' }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unexpected error');
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordError = () => {
    if (!touched.newPassword) {
      return '';
    }
    if (touched.newPassword && !newPassword) {
      return formatMessage({ id: 'COMMON.REQUIRED' });
    }
    return '';
  };

  const getConfirmPasswordError = () => {
    if (!touched.confirmPassword) {
      return '';
    }
    if (touched.confirmPassword && !confirmPassword) {
      return formatMessage({ id: 'COMMON.REQUIRED' });
    }
    if (newPassword !== confirmPassword) {
      return formatMessage({ id: 'COMMON.PASSWORD.NOT_MATCH' });
    }
    return '';
  };

  const handleDisabled =
    !/^(?=.*?[A-Z])(?=.*?[0-9])[\S]{8,}$/.test(newPassword) ||
    !confirmPassword ||
    newPassword !== confirmPassword ||
    !!getConfirmPasswordError();

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
                title={formatMessage({ id: 'AUTH.CREATE.PASSWORD.TITLE' })}
                subtitle={formatMessage({ id: 'AUTH.CREATE.PASSWORD.SUBTITLE' })}
                aria-label={formatMessage({ id: 'AUTH.CREATE.PASSWORD.TITLE' })}
              >
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Stack direction="column" spacing={{ xs: 1, md: 0.5 }} sx={{ position: 'relative' }}>
                    <Stack direction={{ sm: 'column', md: 'column' }} spacing={1} rowGap={1}>
                      <InputField
                        required
                        fullWidth
                        name="newPassword"
                        label={formatMessage({ id: 'AUTH.CREATE.PASSWORD.PASSWORD.LABEL' })}
                        value={newPassword}
                        type={showPassword ? 'text' : 'password'}
                        id="new-password"
                        autoComplete="new-password"
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => {
                          setIsPasswordFocused(false);
                          setTouched({ ...touched, newPassword: true });
                        }}
                        onChange={(ev) => setNewPassword(ev.target.value)}
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
                        aria-label={formatMessage({ id: 'AUTH.CREATE.PASSWORD.PASSWORD.LABEL' })}
                      />
                      <InputField
                        required
                        fullWidth
                        name="confirmPassword"
                        label={formatMessage({ id: 'AUTH.CREATE.PASSWORD.PASSWORD.CONFIRM.LABEL' })}
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
                        aria-label={formatMessage({ id: 'AUTH.CREATE.PASSWORD.PASSWORD.CONFIRM.LABEL' })}
                      />
                    </Stack>
                    <AnimatePresence mode="wait">
                      {newPassword && isPasswordFocused && (
                        <PasswordRequirements
                          hasAutoHide
                          password={newPassword}
                          sx={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            left: 0,
                            transform: { xs: `translateY(calc(100% + ${theme.spacing(1)}))`, md: 'translateY(100%)' },
                            zIndex: 10,
                          }}
                          aria-label={formatMessage({ id: 'AUTH.CREATE.PASSWORD.PASSWORD.LABEL' })}
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
                      aria-label={formatMessage({ id: 'AUTH.CREATE.PASSWORD.BUTTON.LABEL' })}
                    >
                      {formatMessage({ id: 'AUTH.CREATE.PASSWORD.BUTTON.LABEL' })}
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

export default SetPasswordPage;

const BackgroundVideoStyle = styled('video')({
  position: 'absolute', // Posición absoluta para cubrir todo el contenedor
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Esto asegurará que el video cubra todo el espacio disponible sin perder su proporción
  zIndex: -1, // Coloca el video detrás de todo el contenido
});
