import { OptionsObject } from 'notistack';

const SHARED_CONFIG: OptionsObject = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  preventDuplicate: true,
  autoHideDuration: 5000,
};

export default SHARED_CONFIG;
