import { Typography } from '@mui/material';
// Import necessary dependencies
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import { FunctionComponent } from 'react';

/**
 * `LogoHeader` is a component representing the header or banner of the application.
 *
 * @component
 * @param {Object} props - The component's properties.
 * @param {string} [props.className] - Additional CSS classes for styling.
 */

interface LogoHeaderProps {
  className?: string;
}

export const HeaderWrapperHeight = 100;

const HeaderWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: HeaderWrapperHeight,
}));

const LogoHeader: FunctionComponent<LogoHeaderProps> = ({ className }) => {
  const theme = useTheme();
  return (
    <HeaderWrapper
      className={className || ''}
      component="header"
      role="banner" // Add a role attribute to indicate that this is a banner or header
      aria-label="Header" // Provide an ARIA label to describe the header
    >
      <Typography
        sx={{
          fontFamily: 'WordMean',
          fontSize: '32px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
          color: theme.palette.text.secondary,
          letterSpacing: '0.25em',
          wordSpacing: '0.25em',
        }}
        variant="h1"
      >
        Medicine Vape Room
      </Typography>
    </HeaderWrapper>
  );
};

/**
 * Default props for the `LogoHeader` component.
 */
LogoHeader.defaultProps = {
  className: '',
};

export default LogoHeader;
