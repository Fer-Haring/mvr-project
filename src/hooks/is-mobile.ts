import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

export const useIsMobile = (): boolean => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState<boolean>(theme.breakpoints.values.sm > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(theme.breakpoints.values.sm > window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isMobile;
};
