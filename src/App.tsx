import { CssBaseline } from '@mui/material';
import { enUS, esES, itIT } from '@mui/material/locale';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import TagManager from 'react-gtm-module';
import { useIntl } from 'react-intl';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { CustomThemeOptions, getPaletteMode } from './configuration/material-ui/theme';
// Ensure this is correctly imported
import { ProjectRoutes } from './routes';
import AuthGuard from './routes/auth-guard';
import { firebase } from './sdk/firebase/firebase';
import { useColorMode } from './context';

const tagManagerArgs = {
  gtmId: import.meta.env.VITE_APP_GTM_ID || '',
};

import.meta.env.VITE_APP_STAGE === 'prod' && TagManager.initialize(tagManagerArgs);

const App: React.FunctionComponent = (): JSX.Element => {
  const { locale } = useIntl();
  const { mode } = useColorMode(); // Use the hook here

  const getLocale = () => {
    switch (locale) {
      case 'it':
        return itIT;
      case 'en':
        return esES;
      case 'es':
        return esES;
      default:
        return enUS;
    }
  };

  // Remove the initialMode and manual state management for mode

  // Theme is now directly dependent on the mode from useColorMode
  const theme = React.useMemo(
    () => createTheme({ ...CustomThemeOptions(mode), ...getPaletteMode(mode) }, getLocale()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, locale]
  );

  React.useEffect(() => {
    document.body.setAttribute('data-theme', mode);
    firebase;
  }, [mode]);

  return (
    <main className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Routes>
            <Route element={<AuthGuard />}>
              {ProjectRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.component} />
              ))}
              <Route path={'*'} element={<Navigate to="/" />} />
            </Route>
          </Routes>
      </ThemeProvider>
    </main>
  );
};

export default App;
