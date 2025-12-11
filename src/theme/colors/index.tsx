export const COLORS_LIGHT = {
  primaryLight: '#D8E7FE',
  primaryDark: '#4285F4',
  btnTextPrimary: '#3B84F6',
  textPrimary: '#3B84F6',
  text: '#121212',
  default: '#000',
  negativeDefault: '#fff',
  danger: '#cd3966ff',
  success: '#168553',
  pink: '#F2DDE3',

  warning: '#ED7A3A',
  warningLight: '#FFC107',
  secondaryText: '#121212',
  muted: 'rgba(18, 18, 18, 0.50)',
  muted35: 'rgba(18, 18, 18, 0.15)',
  muted15: 'rgba(238, 238, 238, 0.15)',
  muted65: 'rgba(248, 248, 255, 0.65)',
  reaction: '#25D9D8',
  secondaryBackgroundWithoutOpacity: '#fff',
  bottomTabsIcon: 'rgb(77, 77, 78)',

  background: '#fbfbfc',
  backgroundTwo: '#c6c6c9',
  backgroundThree: '#dcdcdfff',
  iconBackground: '#0C162B',

  orange: '#ED7A3A',
  secondaryBackground: '#fff',
  bottomTabsBack: '#ffffff',
  bottomTabsBorder: '#e0e5ea',
  blue: "#3857df",

  secondary: '#FFC107',
  btnLight: '#f8f8ff',
  disabledBack: '#bfbfbf',
  modalBack: 'rgba(255, 255, 255, 0.50)',
  textGray: '#121212',
  textOrange: '#ED7A3A',
  spaceLine: '#d9d9df',
  white: '#FFFFFF',
  green: '#168553',
  yellow: '#ffc107',
  black: '#000000',
  tabText: '',
};

export const COLORS_DARK = {
  primaryLight: '#1B2B57',
  primaryDark: '#3B84F6',
  btnTextPrimary: '#3B84F6',
  textPrimary: '#3B84F6',
  text: '#d9d9d9',
  default: '#FFFFFF',
  negativeDefault: '#000',
  danger: '#DD3A45',
  success: '#168553',
  warning: '#FF9559',
  warningLight: '#FFC107',
  muted: 'rgba(248, 248, 255, 0.50)',
  reaction: '#25D9D8',
  muted15: 'rgba(238, 238, 238, 0.15)',
  muted35: 'rgba(248, 248, 255, 0.35)',
  muted65: 'rgba(248, 248, 255, 0.65)',
  bottomTabsIcon: 'rgba(211, 209, 209, 1)',

  secondaryText: '#bfbfbf',
  background: '#11142B',
  backgroundTwo: '#1A1D3D',
  backgroundThree: '#1A1D3D',
  orange: '#FF9559',
  secondaryBackground: '#121630',
  secondaryBackgroundWithoutOpacity: '#121630',
  bottomTabsBack: '#121630',
  bottomTabsBorder: '#272b49',
  iconBackground: '#F9F9F9',

  secondary: '#FFC107',
  btnLight: '#f8f8ff',
  disabledBack: '#bfbfbf',
  modalBack: 'rgba(255, 255, 255, 0.50)',
  textGray: '#121212',
  textOrange: '#ED7A3A',
  spaceLine: '#d9d9df',
  blue: "#3857df",
  white: '#FFFFFF',
  green: '#139f44ff',
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
  backgroundTwo: string;
  backgroundThree: string;
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
  reaction: string;
  green: string;
  yellow: string;
  black: string;
  secondaryBackgroundWithoutOpacity: string;
  [key: string]: string;
}

export const getColors = (theme: 'light' | 'dark'): ColorPalette => theme === 'dark' ? COLORS_DARK : COLORS_LIGHT;
