import { createTheme } from '@mui/material';

export const primaryMainColor = '#03a9f4';
export const primaryLightColor = 'rgb(234, 27, 37, 0.5)';
export const secondaryMainColor = '#222222';
export const secondaryDarkColor = '#1d1d1d';
export const textColor1 = '#222222';
export const textColor2 = '#ffffff';
export const textColor3 = '#777';
export const textColor4 = '#999';
export const confirmButtonColor = '#7cd1f8';
export const cancelButtonColor = '#999';

export const globalTheme = createTheme({
  palette: {
    text: {
      primary: textColor1,
      // secondary: textColor2,
    },
    primary: {
      light: primaryLightColor,
      main: primaryMainColor,
    },
    secondary: {
      main: secondaryMainColor,
      dark: secondaryDarkColor,
    },
    action: {
      hover: primaryMainColor,
    },
    background: {
      default: '#f7f7f7',
    },
  },
  typography: {
    h2: {
      fontSize: 24,
      fontWeight: 600,
    },
    h3: {
      fontSize: 16,
      fontWeight: 600,
    },
    h4: {
      fontSize: 18,
      fontWeight: 600,
    },
    h5: {
      fontSize: 14,
      color: textColor1,
      fontWeight: 600,
    },
    h6: {
      color: textColor4,
      fontSize: 14,
    },
    caption: {
      fontSize: 13,
      fontWeight: 200,
      color: textColor3,
    },
    body1: {
      fontSize: 13,
    },
    body2: {
      fontSize: 14,
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: 16,
      color: primaryMainColor,
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: 16,
      color: textColor4,
      fontWeight: 600,
    },
  },
});
