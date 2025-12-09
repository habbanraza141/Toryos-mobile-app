import {Theme} from '@react-navigation/native';

export interface CustomTheme extends Theme {
  mode: 'light' | 'dark';
  colors: Theme['colors'] & {
    [key: string]: string;
  };
  typography: {
    fontSize: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      regular: string;
      bold: string;
    };
  };
  spacing: {
    sm: string;
    md: string;
    lg: string;
  };
}

export type Colors = {
  primary: string;
  secondary: string;
};
