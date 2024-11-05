import { ColorModeProvider } from '@webapp/context';
// import { Elements } from '@stripe/react-stripe-js';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { SnackbarUtilsConfigurator } from './components/snackbar';
import { StyledMaterialDesignContent } from './configuration/material-ui/theme';
import './index.scss';
import { persistor, store } from './redux/store/store';
import reportWebVitals from './reportWebVitals';
import { TranslationsProvider } from './translations';

// import { BugsnagInitializer, ELEMENTS_OPTIONS, GTMInitializer, stripePromise } from './3rd-party-initializer';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: Infinity,
//       refetchOnWindowFocus: false,
//     },
//   },
//   queryCache: new QueryCache({
//     onError: (err) => {
//       // eslint-disable-next-line no-console
//       console.error(err);
//     },
//   }),
// });

const containerRoot = document.getElementById('root');
const root = ReactDOM.createRoot(containerRoot!);

//TODO uncomment these lines to enable 3rd party services
// BugsnagInitializer();
// GTMInitializer();

root.render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
          <TranslationsProvider>
            <ColorModeProvider>
              <SnackbarProvider
                maxSnack={1}
                Components={{
                  success: StyledMaterialDesignContent,
                  error: StyledMaterialDesignContent,
                  warning: StyledMaterialDesignContent,
                }}
              >
                <SnackbarUtilsConfigurator />
                <App />
              </SnackbarProvider>
            </ColorModeProvider>
          </TranslationsProvider>
        </BrowserRouter>
      </Provider>
    </PersistGate>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
