import { PaletteColor, PaletteColorOptions, PaletteMode } from '@mui/material';
import '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import { MaterialDesignContent } from 'notistack';

// Custom theme configuration
import { button } from './button';
import { colors } from './colors';
import { sizes } from './sizes';
import { typography } from './typography';

// Extend the Material-UI palette to include custom colors
declare module '@mui/material/styles' {
  interface CustomPalette {
    white: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/styles' {
  interface Palette {
    customBackground: PaletteColor;
  }
  interface PaletteOptions {
    customBackground?: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

// Define color palettes for dark and light modes
const darkModePalette = [
  // Define dark mode color palette
  {
    background: colors.common.contrastBackgroundDark,
    primaryText: colors.common.white,
    primaryAltText: colors.common.black,
    secondaryText: colors.text.secondary,
    textDisabled: colors.text.disabled,
    grey100: colors.common.grey100,
    grey200: colors.common.grey200,
    grey300: colors.common.grey300,
    paper: colors.text.primary,
    contrastBackground: colors.common.black,
    divider: colors.common.dividerDark,
  },
];

const lightModePalette = [
  // Define light mode color palette
  {
    background: colors.common.white,
    primaryText: colors.text.primary,
    secondaryText: colors.text.secondaryLight,
    textDisabled: colors.text.disabled,
    grey100: colors.common.grey100Light,
    grey200: colors.common.grey200Light,
    grey300: colors.common.grey300Light,
    paper: colors.common.greyPaper,
    contrastBackground: colors.common.contrastBackgroundLight,
    divider: colors.common.divider,
  },
];

export const darkModePaletteColors = {
  // Custom dark mode palette
  primary: {
    main: colors.primary.main,
    dark: colors.primary.dark,
    light: colors.primary.light,
    contrastText: colors.primary.contrastText,
  },
  secondary: {
    main: colors.secondary.main,
    dark: colors.secondary.dark,
    light: colors.secondary.light,
  },
  white: {
    main: colors.common.white,
  },
  divider: darkModePalette[0].divider,
  text: {
    primary: darkModePalette[0].primaryText,
    secondary: darkModePalette[0].secondaryText,
    disabled: darkModePalette[0].textDisabled,
  },
  grey: {
    100: darkModePalette[0].grey100,
    300: darkModePalette[0].grey300,
  },
  success: {
    main: colors.success.main,
    dark: colors.success.dark,
    light: colors.success.light,
  },
  error: {
    main: colors.error.main,
    dark: colors.error.dark,
    light: colors.error.light,
  },
  warning: {
    main: colors.warning.main,
    dark: colors.warning.dark,
    light: colors.warning.light,
  },
  background: {
    default: darkModePalette[0].background,
    paper: darkModePalette[0].paper,
  },
  customBackground: {
    main: darkModePalette[0].contrastBackground,
  },
  originalBackground: {
    default: darkModePalette[0].background,
  },
  action: {
    hover: lightModePalette[0].grey300,
  },
};
export const lightModePaletteColors = {
  // Custom light mode palette
  primary: {
    main: colors.primary.main,
    dark: colors.primary.dark,
    light: colors.primary.light,
    contrastText: colors.primary.contrastText,
  },
  secondary: {
    main: colors.secondary.main,
    dark: colors.secondary.dark,
    light: colors.secondary.light,
  },
  white: {
    main: colors.common.white,
  },
  divider: lightModePalette[0].divider,
  text: {
    primary: lightModePalette[0].primaryText,
    secondary: lightModePalette[0].secondaryText,
    disabled: darkModePalette[0].textDisabled,
  },
  grey: {
    100: lightModePalette[0].grey100,
    300: lightModePalette[0].grey300,
  },
  success: {
    main: colors.success.main,
    dark: colors.success.dark,
    light: colors.success.light,
  },
  error: {
    main: colors.error.main,
    dark: colors.error.dark,
    light: colors.error.light,
  },
  warning: {
    main: colors.warning.main,
    dark: colors.warning.dark,
    light: colors.warning.light,
  },
  background: {
    default: lightModePalette[0].background,
    paper: lightModePalette[0].paper,
  },
  customBackground: {
    main: lightModePalette[0].contrastBackground,
  },
  originalBackground: {
    default: lightModePalette[0].background,
  },
  action: {
    hover: lightModePalette[0].grey300,
  },
};

/**
 * Function to get the palette mode configuration based on the selected mode.
 *
 * @param mode The selected palette mode (either 'light' or 'dark').
 * @returns Partial ThemeOptions for the selected mode.
 */
export const getPaletteMode = (mode: PaletteMode): Partial<ThemeOptions> => ({
  palette: {
    mode,
    ...(mode === 'dark' ? darkModePaletteColors : lightModePaletteColors),
  },
});

/**
 * Function to create custom theme options based on the selected palette mode.
 *
 * @param mode The selected palette mode (either 'light' or 'dark').
 * @returns Partial ThemeOptions for the selected mode.
 */
export const CustomThemeOptions = (mode: PaletteMode): Partial<ThemeOptions> => ({
  typography: {
    fontFamily: typography.fontFamily,
    h1: {
      fontSize: typography.h1.fontSize,
      fontWeight: typography.h1.fontWeight,
    },
    h2: {
      fontSize: typography.h2.fontSize,
      fontWeight: typography.h2.fontWeight,
    },
    h3: {
      fontSize: typography.h3.fontSize,
      fontWeight: typography.h3.fontWeight,
    },
    h4: {
      fontSize: typography.h4.fontSize,
      fontWeight: typography.h4.fontWeight,
    },
    h5: {
      fontSize: typography.h5.fontSize,
      fontWeight: typography.h5.fontWeight,
      lineHeight: typography.h5.lineHeight,
    },
    body1: {
      fontSize: typography.body1.fontSize,
      fontWeight: typography.body1.fontWeight,
    },
    body2: {
      fontSize: typography.body2.fontSize,
      fontWeight: typography.body2.fontWeight,
    },
    caption: {
      fontSize: typography.caption.fontSize,
      fontWeight: typography.caption.fontWeight,
      lineHeight: typography.caption.lineHeight,
    },
  },
  shape: {
    borderRadius: sizes.borderRadius, // Define the default border radius for components
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: `1px solid ${mode === 'dark' ? darkModePalette[0].divider : lightModePalette[0].divider}`,
          borderRadius: sizes.borderRadius,
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? 'rgba(255,255,255, 1)' : 'rgba(0,0,0, 1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: sizes.borderRadius,
          padding: button.large.padding,
          fontSize: button.large.fontSize,
          fontWeight: '700',
          textTransform: 'none',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: colors.primary.contrastText,
          },
        },
        {
          props: { variant: 'text' },
          style: {
            color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,

            backgroundColor: alpha(
              mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
              0
            ),
            '&:hover': {
              backgroundColor: alpha(
                mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
                0.1
              ),
            },
            '&.border': {
              border: '1px solid',
              borderColor: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
            },
          },
        },
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            '&:hover': {
              backgroundColor: colors.primary.dark,
            },
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            color: colors.common.white,
            '&:hover': {
              backgroundColor: colors.secondary.dark,
            },
          },
        },
        {
          props: { variant: 'contained', color: 'error' },
          style: {
            color: colors.common.white,
            backgroundColor: colors.error.main,
            '&:hover': {
              color: colors.text.primary,
              backgroundColor: colors.error.light,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderWidth: 1,
            borderColor: colors.primary.dark,
            color: colors.primary.dark,
            '&:hover': {
              backgroundColor: alpha(colors.primary.light, 0.15),
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'info' },
          style: {
            borderWidth: 1,
            borderColor: alpha(
              mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
              0.75
            ),
            color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
            '&:hover': {
              backgroundColor: alpha(
                mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
                0.15
              ),
              borderColor: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
            },
          },
        },
        {
          props: { size: 'small' },
          style: {
            padding: button.small.padding,
            fontSize: button.small.fontSize,
            lineHeight: button.small.lineHeight,
            maxHeight: button.small.maxHeight,
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          outline: 'none',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? darkModePalette[0].primaryAltText : lightModePalette[0].primaryText,
          background: 'transparent',
          borderRadius: sizes.borderRadius,
          transition: 'border 250ms ease-in',
          '& :-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 1000px ${
              mode === 'dark' ? alpha(darkModePalette[0].background, 0.5) : alpha(lightModePalette[0].background, 0.5)
            } inset !important`,
            WebkitTextFillColor: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '&:not(.MuiInputAdornment-hiddenLabel)': {
            marginTop: '0 !important',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          background:
            mode === 'dark' ? alpha(darkModePalette[0].background, 0.5) : alpha(lightModePalette[0].background, 0.5),
          '&:before': {
            borderBottomColor: 'transparent !important',
          },
          '& :-internal-autofill-selected': {
            backgroundColor: `${
              mode === 'dark' ? alpha(darkModePalette[0].background, 0.5) : alpha(lightModePalette[0].background, 0.5)
            } !important`,
          },
          '& :-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 1000px ${
              mode === 'dark' ? alpha(darkModePalette[0].background, 0.5) : alpha(lightModePalette[0].background, 0.5)
            } inset !important`,
            WebkitTextFillColor: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
            // This crazy transition is needed to prevent Chrome from animating the background color
            transition: 'background-color 50000s ease-in-out 0s !important',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          height: '48px',
          background:
            mode === 'dark' ? alpha(darkModePalette[0].background, 0.5) : alpha(lightModePalette[0].background, 0.5),
          borderRadius: sizes.borderRadius,
          transition: 'border 250ms ease-in',
          '& :-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 1000px ${
              mode === 'dark' ? alpha(darkModePalette[0].background, 0) : alpha(lightModePalette[0].background, 0)
            } inset !important`,
            WebkitTextFillColor: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
            // This crazy transition is needed to prevent Chrome from animating the background color
            transition: 'background-color 50000s ease-in-out 0s !important',
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(
                mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
                0.25
              ),
            },
          },
        },
        notchedOutline: {
          borderRadius: sizes.borderRadius,
          borderWidth: '2px',
          transition: 'border 250ms ease-in',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          background: 'transparent',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? darkModePalette[0].primaryAltText : lightModePalette[0].primaryText,
          fontWeight: 500,
          '.MuiFormLabel-asterisk, .MuiInputLabel-asterisk': {
            color: `${colors.error.main} !important`,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? darkModePalette[0].secondaryText : lightModePalette[0].secondaryText,
        },
        colorPrimary: {
          '&.Mui-checked': {
            color: colors.primary.dark,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: sizes.borderRadius,
          outline: 'none',
          background: 'transparent',
        },
        input: {
          borderRadius: sizes.borderRadius,
          color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          background: 'transparent',
          '& label': {
            color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          borderRadius: sizes.borderRadius,
          outline: 'none',
          background: 'transparent',
          '& label': {
            color: mode === 'dark' ? darkModePalette[0].primaryAltText : lightModePalette[0].primaryText,
          },
          '& :-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 1000px ${
              mode === 'dark' ? darkModePalette[0].background : lightModePalette[0].background
            } inset !important`,
            WebkitTextFillColor: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
            // This crazy transition is needed to prevent Chrome from animating the background color
            transition: 'background-color 50000s ease-in-out 0s !important',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          borderRadius: sizes.borderRadius,
          outline: 'none',
          background: 'transparent',
          '& label': {
            color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: typography.tooltip.fontSize,
          fontWeight: typography.tooltip.fontWeight,
          backdropFilter: 'blur(8px)',
          color: mode !== 'dark' ? colors.common.white : colors.common.white,
          backgroundColor: alpha(
            mode === 'dark' ? darkModePalette[0].contrastBackground : lightModePalette[0].contrastBackground,
            0.5
          ),
          borderRadius: sizes.borderRadius,
        },
        arrow: {
          color: alpha(mode === 'dark' ? darkModePalette[0].contrastBackground : lightModePalette[0].contrastBackground, 0.5),
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: typography.h1.fontSize,
        },
        h2: {
          fontSize: typography.h2.fontSize,
          fontWeight: typography.h2.fontWeight,
        },
        h3: {
          fontSize: typography.h3.fontSize,
          fontWeight: typography.h3.fontWeight,
        },
        h4: {
          fontSize: typography.h4.fontSize,
        },
        h5: {
          fontSize: typography.h5.fontSize,
          fontWeight: typography.h5.fontWeight,
        },
        body1: {
          fontSize: typography.body1.fontSize,
        },
        caption: {
          fontSize: typography.caption.fontSize,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover:not(&.Mui-selected)': {
            color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
            backgroundColor:
              mode === 'dark'
                ? alpha(darkModePalette[0].grey300, 1)
                : alpha(lightModePalette[0].grey300, 1),
          },
          '&.Mui-selected': {
            backgroundColor: mode === 'dark' ? darkModePalette[0].grey300 : lightModePalette[0].grey300,
            '&:hover': {
              backgroundColor: mode === 'dark' ? darkModePalette[0].grey300 : lightModePalette[0].grey300,
            },
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          span: {
            fontWeight: 500,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: sizes.borderRadius,
        },
        action: {
          padding: '4px 0',
        },
        standardSuccess: {
          color: colors.success.main,
          backgroundColor: colors.success.main,
          borderRadius: sizes.borderRadius,
        },
        standardError: {
          backgroundColor: colors.error.main,
          borderRadius: sizes.borderRadius,
        },
        outlinedSuccess: {
          borderColor: colors.error.main,
          backgroundColor: alpha(colors.success.main, 0.1),
        },
        outlinedError: {
          borderRadius: sizes.borderRadius,
          backgroundColor: alpha(colors.error.main, 0.1),
          borderColor: colors.error.main,
        },
        outlinedInfo: {
          color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          borderColor: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          backgroundColor: alpha(
            mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
            0.1
          ),
        },
        filledSuccess: {
          borderColor: colors.success.main,
          backgroundColor: alpha(colors.success.main, 0.1),
        },
        filledError: {
          backgroundColor: alpha(colors.error.main, 0.1),
        },
        filledInfo: {
          color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          backgroundColor: alpha(
            mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
            0.1
          ),
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: sizes.borderRadius,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontSize: typography.link.fontSize,
          fontWeight: typography.link.fontWeight,
          color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          cursor: 'pointer',
          transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            color: colors.primary.main,
          },
        },
      },
      variants: [
        {
          props: { variant: 'caption' },
          style: {
            fontSize: typography.caption.fontSize,
          },
        },
        {
          props: { color: 'secondary' },
          style: {
            color: colors.secondary.main,
            '&:hover': {
              color: colors.secondary.dark,
            },
          },
        },
      ],
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '.MuiAutocomplete-option': {
            '&.Mui.focused': {
              backgroundColor: `${
                mode === 'dark' ? darkModePalette[0].grey300 : lightModePalette[0].grey300
              } !important`,
            },
          },
        },
        listbox: {
          position: 'relative',
          zIndex: 999,
          '.MuiAutocomplete-option': {
            '&.Mui-focused': {
              backgroundColor: `${
                mode === 'dark' ? darkModePalette[0].grey300 : lightModePalette[0].grey300
              } !important`,
              color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
            },
            '&[aria-selected="true"]': {
              backgroundColor: `${colors.primary.main} !important`,
              color: colors.primary.contrastText,
              fontWeight: 500,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
      variants: [
        {
          props: { variant: 'filled', color: 'default' },
          style: {
            color: mode === 'dark' ? darkModePalette[0].background : lightModePalette[0].background,
            backgroundColor: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          },
        },
        {
          props: { variant: 'filled', color: 'primary' },
          style: {
            color: 'white',
            backgroundColor: colors.primary.dark,
          },
        },
        {
          props: { variant: 'filled', color: 'warning' },
          style: {
            color: 'white',
            backgroundColor: colors.warning.main,
          },
        },
        {
          props: { variant: 'filled', color: 'error' },
          style: {
            color: 'white',
            backgroundColor: colors.error.main,
          },
        },
        {
          props: { variant: 'outlined', color: 'default' },
          style: {
            borderColor: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
            color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
            backgroundColor: alpha(
              mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
              0.05
            ),
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderColor: colors.primary.dark,
            color: colors.primary.dark,
            backgroundColor: alpha(colors.primary.light, 0.15),
          },
        },
        {
          props: { variant: 'outlined', color: 'warning' },
          style: {
            borderColor: colors.warning.main,
            color: colors.warning.main,
            backgroundColor: alpha(colors.warning.main, 0.15),
          },
        },
        {
          props: { variant: 'outlined', color: 'error' },
          style: {
            borderColor: colors.error.main,
            color: colors.error.main,
            backgroundColor: alpha(colors.error.main, 0.15),
          },
        },
      ],
    },
    MuiBadge: {
      styleOverrides: {
        root: {
          ':has(.MuiBadge-colorPrimary)': {
            '.MuiBadge-badge': {
              color: 'white',
              fontWeight: 600,
            },
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          background: 'transparent',
          border: 'none',
          color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          '& .MuiDataGrid-withBorderColor': {
            borderColor: 'transparent',
          },
          '& .MuiDataGrid-main': {
            border: `1px solid ${mode === 'dark' ? darkModePalette[0].divider : lightModePalette[0].grey300}`,
            borderRadius: sizes.borderRadius,
          },
          '& .MuiDataGrid-detailPanel': {
            borderBottom: `1px solid ${mode === 'dark' ? darkModePalette[0].divider : lightModePalette[0].grey300}`,
          },
          '& .MuiDataGrid-pinnedColumns': {
            backgroundImage: 'none',
          },
          '& .MuiDataGrid-columnHeader, .MuiDataGrid-columnHeader--alignCenter': {
            textAlign: 'center',
            minHeight: '50px !important',
            height: '50px',
          },
          '& .MuiDataGrid-columnHeaders, .MuiDataGrid-pinnedColumnHeaders': {
            minHeight: '50px !important',
            height: '50px',
            backgroundColor: mode === 'dark' ? colors.common.black : lightModePalette[0].grey200,
            backgroundImage: 'none',
            textTransform: 'uppercase',
          },
          '& .MuiDataGrid-columnHeader': {
            '&:focus': {
              outlineColor: `${colors.secondary.main} !important`,
            },
          },
          '& .MuiDataGrid-columnHeaders': {
            fontSize: typography.caption.fontSize,
            borderRadius: sizes.borderRadius,
            minHeight: '50px !important',
            height: '50px',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
          },
          '& .MuiDataGrid-columnsContainer': {
            backgroundColor: mode === 'dark' ? darkModePalette[0].background : lightModePalette[0].background,
          },
          '& .MuiDataGrid-iconSeparator': {
            display: 'flex',
          },
          '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
            // borderRight: 'none'
            borderRight: `1px solid ${mode === 'dark' ? darkModePalette[0].divider : lightModePalette[0].divider}`,
          },
          '.MuiDataGrid-cell.actions': {
            // borderRight: 'none',
          },
          '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
            borderBottom: `1px solid ${mode === 'dark' ? darkModePalette[0].divider : lightModePalette[0].grey300}`,
          },
          '& .MuiDataGrid-cell': {
            color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
            '&:focus': {
              outlineColor: `${
                mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText
              } !important`,
            },
          },
          '& .MuiDataGrid-row': {
            '&:hover, &.Mui-hovered': {
              backgroundColor: `${alpha(
                mode === 'dark' ? darkModePalette[0].secondaryText : lightModePalette[0].secondaryText,
                0.05
              )} !important`,
            },
            '&.Mui-selected': {
              backgroundColor: `${alpha(colors.secondary.light, 0.25)} !important`,
            },
            '&:nth-of-type(even)': {
              backgroundColor: alpha(
                mode === 'dark' ? darkModePalette[0].contrastBackground : lightModePalette[0].contrastBackground,
                0.5
              ),
            },
            '&--lastVisible': {
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
              },
            },
          },
          '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
            '&[data-field="actions"]': {
              borderRight: 'none !important',
            },
          },
          '& .MuiDataGrid-cell--withRenderer': {
            '&:focus-within': {
              outline: 'none',
            },
          },
          '& .MuiDataGrid-cell--editing': {
            '& .MuiAutocomplete-root': {
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '.MuiTextField-root': {
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              },
              '.MuiInputBase-root': {
                height: '80%',
                maxWidth: '90%',
                margin: '0 auto',
                paddingBlock: 0,
                '.MuiInputBase-input': {
                  height: '100%',
                  paddingBlock: 0,
                },
                input: {
                  paddingBlock: 0,
                },
              },
            },
            '& .MuiInputBase-root': {
              '&:has(.MuiSelect-select)': {
                height: '80%',
                maxWidth: '90%',
                margin: '0 auto',
              },
              '&:has(.MuiInputBase-input[type=date])': {
                maxWidth: '90%',
                margin: '0 auto',
              },
            },
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: sizes.borderRadius,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: mode === 'dark' ? darkModePalette[0].grey300 : lightModePalette[0].grey300,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': {
            backgroundColor: colors.primary.main,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          color: mode === 'dark' ? darkModePalette[0].primaryText : lightModePalette[0].primaryText,
          borderRadius: '4px 4px 0 0',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.05),
          },
          '&.Mui-selected': {
            color: colors.primary.main,
          },
          '&.Mui-disabled': {
            color: mode === 'dark' ? darkModePalette[0].grey300 : lightModePalette[0].grey300,
          },
        },
      },
    },
  },
});

// Create a styled version of the MaterialDesignContent component
export const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '.notistack-Snackbar': {
    borderRadius: sizes.borderRadius,
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: colors.success.main,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: colors.error.main,
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: colors.warning.main,
  },
}));
