import { useIsMobile } from '@webapp/hooks/is-mobile';
import { OptionsObject } from 'notistack';

export const useSharedConfig = (): OptionsObject => {
  const isMobile = useIsMobile();

  const config: OptionsObject = {
    anchorOrigin: {
      vertical: isMobile ? 'top' : 'bottom',
      horizontal: 'center',
    },
    preventDuplicate: true,
    autoHideDuration: 5000,
    style: {
      borderRadius: 8,
      zIndex: 9999,
    },
  };

  return config;
};