import React from 'react';

import { ProviderContext, VariantType, useSnackbar } from 'notistack';
import { IntlShape, useIntl } from 'react-intl';

import SHARED_CONFIG from './config';

let useSnackbarRef: ProviderContext;
let intl: IntlShape;
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  intl = useIntl();
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
    useSnackbarRef.enqueueSnackbar(this.formatMessage(msg), { ...SHARED_CONFIG, variant });
  },
  formatMessage(message: string) {
    return intl.formatMessage({ id: message, defaultMessage: message });
  },
};
