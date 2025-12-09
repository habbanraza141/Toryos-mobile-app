import React from 'react';
import { StatusBar as RNStatusBar, Platform } from 'react-native';
import { getColors } from '../../theme/colors';
import { useTheme } from '../../hooks/useTheme';

interface StatusBarProps {
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  translucent?: boolean;
  hidden?: boolean;
  animated?: boolean;
  networkActivityIndicatorVisible?: boolean;
  showHideTransition?: 'fade' | 'slide';
}

const StatusBar: React.FC<StatusBarProps> = ({
  backgroundColor,
  barStyle,
  translucent = false,
  hidden = false,
  animated = true,
  networkActivityIndicatorVisible,
  showHideTransition,
}) => {
  const theme = useTheme();
  const colors = getColors(theme);

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

  const platformProps = Platform.select({
    ios: {
      barStyle: getBarStyle(),
      hidden,
      animated,
      networkActivityIndicatorVisible,
      showHideTransition,
    },
    android: {
      backgroundColor: getBackgroundColor(),
      barStyle: getBarStyle(),
      translucent,
      hidden,
      animated,
    },
  });

  return <RNStatusBar {...platformProps} />;
};

export default StatusBar;
