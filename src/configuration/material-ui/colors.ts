// This file contains the colors configuration for the Material UI theme.
const primaryMain = '#306FB7';
const primaryDark = '#083870';
const primaryLight = '#083870';
const contrastText = '#16181d';

const secondaryMain = '#273343';
const secondaryDark = '#090C0F';
const secondaryLight = '#090C0F';

const success = '#1dac64';
const successLight = '#58d681';
const successDark = '#0e6d3c';

const error = '#dc2a2a';
const errorLight = '#f05959';
const errorDark = '#9e0000';

const warning = '#ff9a00';
const warningLight = '#ffc149';
const warningDark = '#c66c00';

const textPrimary = '#0e0e0e';
const textSecondary = '#e9e9e9';
const textSecondaryLight = '#ffffff';
const textDisabled = '#B4BDBD';
const commonWhite = '#FFFFFF';
const commonBlack = '#121212';
const grey100 = '#202124';
const grey200 = '#2f2f2f';
const grey300 = '#42525e';
const greyPaper = '#F0F0F2';
const greyPaperDark = '#2F2F2F';
const grey100Light = '#F9FBFC';
const grey200Light = '#F4F4F4';
const grey300Light = '#E6E6E6';
const contrastBackgroundDark = '#373737';
const contrastBackgroundLight = '#b1b1b1';
const divider = '#E6EBF1';
const dividerDark = '#292929';

export const colors = {
  primary: {
    main: primaryMain,
    dark: primaryDark,
    light: primaryLight,
    contrastText,
  },
  secondary: {
    main: secondaryMain,
    dark: secondaryDark,
    light: secondaryLight,
    contrastText,
  },
  success: {
    main: success,
    dark: successDark,
    light: successLight,
    contrastText: commonWhite,
  },
  error: {
    main: error,
    dark: errorDark,
    light: errorLight,
    contrastText: commonWhite,
  },
  warning: {
    main: warning,
    dark: warningDark,
    light: warningLight,
    contrastText,
  },
  text: {
    primary: textPrimary,
    secondary: textSecondary,
    secondaryLight: textSecondaryLight,
    disabled: textDisabled,
  },
  common: {
    white: commonWhite,
    black: commonBlack,
    grey100,
    grey200,
    grey300,
    greyPaper,
    greyPaperDark,
    grey100Light,
    grey200Light,
    grey300Light,
    contrastBackgroundDark,
    contrastBackgroundLight,
    divider,
    dividerDark,
  },
};
