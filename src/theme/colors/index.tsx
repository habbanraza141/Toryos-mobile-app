import { Colors } from '../types.ts';

enum COLOR_SCHEME {
  LIGHT = 'light',
  DARK = 'dark',
}

export const colors = {
  primary: '#3857df',
  secondary: '#FFC107',
  btnPrimary: '#3857df',
  btnTextPrimary: '#3857df',
  btnLight: '#f8f8ff',
  background: '#F9F9F9',
  disabledBack: '#bfbfbf',
  bottomTabsBack: '#f8f8ff',
  modalBack: 'rgba(255, 255, 255, 0.50)',
  text: '#121212',
  textPrimary: '#3857df',
  textGray: '#121212',
  textOrange: '#ED7A3A',
  spaceLine: '#d9d9df',
  danger: '#B6244F',
  white: '#FFFFFF',
  blue: '#3857df',
  green: '#168553',
  yellow: '#ffc107',
  darkRed: '#B6244F',
  red: '#B6244F',
  black: '#000000',
  blackOpacity30: 'rgba(0,0,0,0.3)',
  muted: 'rgba(248, 248, 255)', // , 0.50

};

export const COLORS_DEFAULT = {
  default: '#000',
  primary: '#3957DF',
  danger: '#B6244F',
  pink: '#F2DDE3',
  success: '#168553',
  warning: '#ED7A3A',
  warningLight: '#FFC107',
  secondaryText: '#121212',
  muted: 'rgba(248, 248, 255)', // , 0.50
  muted50: 'rgba(18, 18, 18, 0.50)',
  muted35: 'rgba(18, 18, 18, 0.15)',
  muted15: 'rgba(238, 238, 238, 0.15)',

  background: '#F9F9F9',
  orange: '#ED7A3A',
  secondaryBackground: '#fff',
  bottomTabsBack: '#f8f8ff',
  bottomTabsBorder: '#FFFFFF',
  bottomTabsIcon: '#9c9ca0',

  secondary: '#FFC107',
  btnPrimary: '#3857df',
  btnTextPrimary: '#3857df',
  btnLight: '#f8f8ff',
  disabledBack: '#bfbfbf',
  modalBack: 'rgba(255, 255, 255, 0.50)',
  text: '#121212',
  textPrimary: '#3857df',
  textGray: '#121212',
  textOrange: '#ED7A3A',
  spaceLine: '#d9d9df',
  white: '#FFFFFF',
  blue: '#3857df',
  green: '#168553',
  yellow: '#ffc107',
  black: '#000000',
  tabText: '',
  priority: '#B6244F',
};

export const COLORS_LIGHT = {
  text: '#121212',
  default: '#000',
  negativeDefault: '#fff',
  primary: '#3957DF',
  danger: '#B6244F',
  success: '#168553',
  pink: '#F2DDE3',

  warning: '#ED7A3A',
  warningLight: '#FFC107',
  secondaryText: '#121212',
  muted: 'rgba(18, 18, 18, 0.50)',
  muted35: 'rgba(18, 18, 18, 0.15)',
  muted15: 'rgba(238, 238, 238, 0.15)',
  muted65: 'rgba(248, 248, 255, 0.65)',

  secondaryBackgroundWithoutOpacity: '#fff',
  bottomTabsIcon: 'rgb(77, 77, 78)',

  background: '#F9F9F9',
  orange: '#ED7A3A',
  secondaryBackground: '#fff',
  bottomTabsBack: '#f8f8ff',
  bottomTabsBorder: '#FFFFFF',

  secondary: '#FFC107',
  btnPrimary: '#3857df',
  btnTextPrimary: '#3857df',
  btnLight: '#f8f8ff',
  disabledBack: '#bfbfbf',
  modalBack: 'rgba(255, 255, 255, 0.50)',
  textPrimary: '#3857df',
  textGray: '#121212',
  textOrange: '#ED7A3A',
  spaceLine: '#d9d9df',
  white: '#FFFFFF',
  blue: '#3857df',
  green: '#168553',
  yellow: '#ffc107',
  black: '#000000',
  tabText: '',
};

export const COLORS_DARK = {
  text: '#d9d9d9',
  default: '#FFFFFF',
  negativeDefault: '#000',
  primary: '#4261F0',
  danger: '#DD3A45',
  success: '#168553',
  warning: '#FF9559',
  warningLight: '#FFC107',
  muted: 'rgba(248, 248, 255, 0.50)',

  muted15: 'rgba(238, 238, 238, 0.15)',
  muted35: 'rgba(248, 248, 255, 0.35)',
  muted65: 'rgba(248, 248, 255, 0.65)',
  bottomTabsIcon: 'rgb(174, 174, 174)',

  secondaryText: '#bfbfbf',
  background: '#0C162B',
  orange: '#FF9559',
  secondaryBackground: '#202342',
  secondaryBackgroundWithoutOpacity: '#202342',
  bottomTabsBack: '#0C162B',
  bottomTabsBorder: 'rgba(238, 238, 238, 0.15)',

  secondary: '#FFC107',
  btnPrimary: '#3857df',
  btnTextPrimary: '#3857df',
  btnLight: '#f8f8ff',
  disabledBack: '#bfbfbf',
  modalBack: 'rgba(255, 255, 255, 0.50)',
  textPrimary: '#3857df',
  textGray: '#121212',
  textOrange: '#ED7A3A',
  spaceLine: '#d9d9df',
  white: '#FFFFFF',
  blue: '#3857df',
  green: '#168553',
  yellow: '#ffc107',
  black: '#000000',
};

export interface ColorPalette {
  primary: string;
  negativeDefault: string;
  danger: string;
  success: string;
  warning: string;
  warningLight: string;
  default: string;
  muted: string;
  muted15: string;
  muted65: string;
  muted35: string;
  secondaryText: string;
  background: string;
  orange: string;
  secondaryBackground: string;
  bottomTabsBack: string;
  bottomTabsBorder: string;
  bottomTabsIcon: string;
  secondary: string;
  btnPrimary: string;
  btnTextPrimary: string;
  btnLight: string;
  disabledBack: string;
  modalBack: string;
  text: string;
  textPrimary: string;
  textGray: string;
  textOrange: string;
  spaceLine: string;
  white: string;
  blue: string;
  green: string;
  yellow: string;
  black: string;
  secondaryBackgroundWithoutOpacity: string;
  [key: string]: string;
}

export const getColors = (theme: 'light' | 'dark'): ColorPalette =>
  theme === 'dark' ? COLORS_DARK : COLORS_LIGHT;
