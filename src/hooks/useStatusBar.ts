import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from './useTheme';
import { getColors } from '../theme/colors';
import { Platform } from 'react-native';

interface UseStatusBarOptions {
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  translucent?: boolean;
  hidden?: boolean;
  animated?: boolean;
}

export const useStatusBar = (options: UseStatusBarOptions = {}) => {
  const theme = useTheme();
  const colors = getColors(theme);

  useEffect(() => {
    const {
      backgroundColor,
      barStyle,
      translucent = false,
      hidden = false,
      animated = true,
    } = options;

    const getBarStyle = (): 'light-content' | 'dark-content' => {
      if (barStyle && barStyle !== 'default') {
        return barStyle;
      }

      return theme === 'light' ? 'dark-content' : 'light-content';
    };

    const getBackgroundColor = (): string => {
      if (backgroundColor) {
        return backgroundColor;
      }

      return colors.background;
    };

    StatusBar.setBarStyle(getBarStyle(), animated);

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(getBackgroundColor());
      StatusBar.setTranslucent(translucent);
      StatusBar.setHidden(hidden);
    }
  }, [theme, colors, options]);

  return {
    setStatusBar: (newOptions: UseStatusBarOptions) => {
      const mergedOptions = { ...options, ...newOptions };
    },
  };
};
