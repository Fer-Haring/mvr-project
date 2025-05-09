import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

export const useIsMobile = (): boolean => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState<boolean>(theme.breakpoints.values.md > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(theme.breakpoints.values.md > window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};
