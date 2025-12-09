import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {CustomTheme} from './types';

export const lightTheme: CustomTheme = {
  ...DefaultTheme,
  mode: 'light',
  colors: {
    ...DefaultTheme.colors, // ensures all required keys exist
    'brand-byzantine': '#3957DF',
    'brand-fair-orange': '#ED7A3A',
    'brand-papery': '#168553',
    'brand-posh-pink': '#B6244F',
    'neutral-tones-text': '#121212',
  },
  typography: {
    fontSize: {
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '100px',
    },
    fontWeight: {
      regular: '400',
      bold: '700',
    },
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
};

export const darkTheme: CustomTheme = {
  ...DarkTheme,
  mode: 'dark',
  colors: {
    ...DarkTheme.colors,
    'brand-byzantine': '#4261F0',
    'brand-fair-orange': '#FF9559',
    'brand-papery': '#21C57B',
    'brand-posh-pink': '#DD3A45',
    'neutral-tones-text': '#E9E9F0',
  },
  typography: lightTheme.typography,
  spacing: lightTheme.spacing,
};
