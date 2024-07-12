import { LoadingButtonProps, default as MuiLoadingButton } from '@mui/lab/LoadingButton';
import { styled } from '@mui/material';
import { buttonVariant } from '@webapp/configuration/material-ui/button';
import React, { FunctionComponent } from 'react';


export type ButtonColors = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

interface ButtonProps extends LoadingButtonProps {
  className?: string;
  children?: React.ReactNode;
  hasBorder?: boolean;
  color?: ButtonColors;
}

const Button: FunctionComponent<ButtonProps> = ({ className, children, hasBorder, color = 'primary', ...props }) => {
  return (
    <CustomButtonStyled
      className={`${className || ''} ${hasBorder ? 'border' : ''}`}
      variant={props.variant ? props.variant : buttonVariant}
      color={color}
      {...props}
      onKeyDown={(e) => {
        // This is to allow the user to press the space bar or enter key to click the button.
        if (e.key === 'Enter' || e.key === ' ') {
          props.onClick && props.onClick;
        }
      }}
      sx={{
        maxHeight: props.size === 'small' ? '40px' : '50px',
        ...props.sx,
      }}
      aria-label={props['aria-label']} // ARIA attribute to provide a label for the button
    >
      {children}
    </CustomButtonStyled>
  );
};

export default Button;

const CustomButtonStyled = styled(MuiLoadingButton)<{ color: ButtonColors }>(({ theme, color }) => {
const colorMap: Record<ButtonColors, string> = {
  primary: 'linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed)',
  secondary: 'linear-gradient(to right, #fbc2eb, #a6c1ee, #fbc2eb, #a6c1ee)',
  success: 'linear-gradient(to right, #28a745, #85d996, #28a745, #85d996)',
  error: 'linear-gradient(to right, #dc3545, #ff6f61, #dc3545, #ff6f61)',
  info: 'linear-gradient(to right, #17a2b8, #77d6f5, #17a2b8, #77d6f5)',
  warning: 'linear-gradient(to right, #ffc107, #ffca85, #ffc107, #ffca85)',
};

  const boxShadowMap: Record<ButtonColors, string> = {
    primary: '0 4px 15px 0 rgba(65, 132, 234, 0.75)',
    secondary: '0 4px 15px 0 rgba(251, 194, 235, 0.75)',
    success: '0 4px 15px 0 rgba(40, 167, 69, 0.75)',
    error: '0 4px 15px 0 rgba(220, 53, 69, 0.75)',
    info: '0 4px 15px 0 rgba(23, 162, 184, 0.75)',
    warning: '0 4px 15px 0 rgba(255, 193, 7, 0.75)',
  };

  return {
    width: '100%',
    maxWidth: '350px',
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.common.white,
    cursor: 'pointer',
    textAlign: 'center',
    border: 'none',
    backgroundSize: '300% 100%',
    borderRadius: '50px',
    textWrap: 'nowrap',
    transition: 'all .4s ease-in-out',

    '&:hover': {
      backgroundPosition: '100% 0',
      transition: 'all .4s ease-in-out',
    },

    '&:hover:focus': {
      outline: 'none',
    },

    backgroundImage: colorMap[color],
    boxShadow: boxShadowMap[color],
  };
});