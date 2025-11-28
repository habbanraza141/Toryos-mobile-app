import { ViewProps } from 'react-native';

export type DatePickerVariant = 'light' | 'dark';

export interface DatePickerProps extends ViewProps {
  variant?: DatePickerVariant;
  isDate?: boolean;
  isTime?: boolean;
  value?: any;
  restrictFutureDate?: boolean;
  error?: string;
  minimumDate?: string;
  isDisable?: boolean;
  mode: 'date' | 'time' | 'datetime';
  onDateChange?: (date: string) => void;
}
