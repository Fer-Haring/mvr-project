import { FunctionComponent } from 'react';

import { useTheme } from '@mui/material/styles';

interface GoogleLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  isPlain?: boolean;
}

const GoogleLogo: FunctionComponent<GoogleLogoProps> = ({ className, isPlain, ...props }) => {
  const theme = useTheme();
  return (
    <svg
      className={className || ''}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      {...props}
    >
      <path
        strokeWidth={0}
        fill={isPlain ? theme.palette.text.primary : '#4285f4'}
        d="M23.52,12.27c0-.85-.08-1.67-.22-2.45h-11.3v4.65h6.46c-.28,1.49-1.13,2.76-2.41,3.61v3.02h3.89c2.27-2.09,3.58-5.17,3.58-8.83Z"
      />
      <path
        strokeWidth={0}
        fill={isPlain ? theme.palette.text.primary : '#34a853'}
        d="M12,24c3.24,0,5.96-1.07,7.94-2.9l-3.89-3.02c-1.07.72-2.43,1.16-4.05,1.16-3.12,0-5.77-2.11-6.72-4.94H1.29v3.1c1.97,3.92,6.02,6.61,10.71,6.61Z"
      />
      <path
        strokeWidth={0}
        fill={isPlain ? theme.palette.text.primary : '#fbbc05'}
        d="M5.28,14.28c-.24-.72-.38-1.48-.38-2.28s.14-1.56.38-2.28v-3.1H1.29c-.82,1.61-1.29,3.44-1.29,5.38s.47,3.76,1.29,5.38l3.11-2.42s.88-.68.88-.68Z"
      />
      <path
        strokeWidth={0}
        fill={isPlain ? theme.palette.text.primary : '#ea4335'}
        d="M12,4.78c1.77,0,3.34.61,4.59,1.79l3.44-3.44c-2.08-1.94-4.79-3.13-8.03-3.13C7.31,0,3.26,2.69,1.29,6.62l3.99,3.1c.95-2.84,3.6-4.94,6.72-4.94Z"
      />
      <path strokeWidth={0} fill="none" d="M0,0h24v24H0V0Z" />
    </svg>
  );
};

export default GoogleLogo;
