import { ProviderContext, VariantType, useSnackbar } from 'notistack';
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { useSharedConfig } from './config';

let useSnackbarRef: ProviderContext;
let intl: IntlShape;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let sharedConfig: any;
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  intl = useIntl();
  sharedConfig = useSharedConfig();
  return null;
};

export default {
  success(msg: string) {
    this.toast(msg, 'success');
  },
  warning(msg: string) {
    this.toast(msg, 'warning');
  },
  info(msg: string) {
    this.toast(msg, 'info');
  },
  error(msg: string) {
    this.toast(msg, 'error');
  },
  toast(msg: string, variant: VariantType = 'default') {
    useSnackbarRef.enqueueSnackbar(this.formatMessage(msg), { ...sharedConfig, variant });
  },
  formatMessage(message: string) {
    return intl.formatMessage({ id: message, defaultMessage: message });
  },
};
