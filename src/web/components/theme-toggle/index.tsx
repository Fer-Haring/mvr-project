import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '@webapp/web/context';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import Toggle from './toggle';

/**
 * Props for the ThemeToggle component.
 * @prop {string} className Optional class name for the toggle button.
 * @prop {boolean} monochrome Determines if the icon should be monochrome.
 * @prop {boolean} showTooltip Controls the visibility of the tooltip.
 * @prop {'icon' | 'circle'} variant Defines the appearance of the toggle button.
 */
interface ThemeToggleProps {
  className?: string;
  monochrome?: boolean;
  showTooltip?: boolean;
  variant?: 'icon' | 'circle';
}

/**
 * A toggle component for switching between light and dark themes.
 *
 * This component provides a visual toggle that allows users to switch between light and dark color modes.
 * It supports customization through various props and integrates with the application's color mode context.
 */
const ThemeToggle: FunctionComponent<ThemeToggleProps> = ({
  className,
  monochrome,
  showTooltip = false,
  variant = 'circle',
}) => {
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();
  const colorMode = theme.palette.mode;
  const { formatMessage } = useIntl();

  const tooltipTitle = formatMessage({ id: colorMode === 'dark' ? 'CHANGE_MODE_LIGHT' : 'CHANGE_MODE_DARK' });
  const ariaLabel = formatMessage({ id: 'CHANGE_MODE_ARIA' });

  const handleClick = () => {
    toggleColorMode();
  };

  const ToggleButton = (
    <IconButton
      className={className}
      onClick={handleClick}
      color={colorMode === 'dark' ? 'primary' : 'secondary'}
      aria-label={ariaLabel}
      role="switch"
      aria-checked={colorMode === 'dark'}
      disableFocusRipple
      disableRipple
      sx={variant === 'circle' ? { p: 0, borderRadius: 'calc(16px + 2px)' } : {}} // Remove padding for circle variant
    >
      {variant === 'icon' ? (
        colorMode === 'dark' ? (
          <LightModeRoundedIcon
            fontSize="small"
            htmlColor={monochrome ? theme.palette.text.primary : theme.palette.primary.main}
          />
        ) : (
          <DarkModeRoundedIcon htmlColor={monochrome ? theme.palette.text.primary : theme.palette.secondary.main} />
        )
      ) : (
        <Toggle isActive={colorMode === 'dark'} />
      )}
    </IconButton>
  );

  return showTooltip ? (
    <Tooltip
      id="theme-toggle-tooltip"
      arrow
      placement="bottom-end"
      TransitionComponent={Zoom}
      title={tooltipTitle}
      aria-label={ariaLabel}
    >
      {ToggleButton}
    </Tooltip>
  ) : (
    ToggleButton
  );
};

ThemeToggle.defaultProps = {
  className: '',
  monochrome: false,
  showTooltip: true,
};

export default ThemeToggle;
