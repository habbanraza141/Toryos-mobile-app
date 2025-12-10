import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { getColors } from '../../theme/colors';

type ColorVariant = 'default' | 'dark' | 'primary' | 'danger' | 'white';

interface DividerProps {
  color?: ColorVariant;
  thickness?: number;
  style?: ViewStyle;
  isVertical?: boolean;
}

const SpaceComponent: React.FC<DividerProps> = ({
  color = 'default',
  thickness = StyleSheet.hairlineWidth,
  style,
  isVertical
}) => {
  const theme = useTheme();
  const colors = getColors(theme);

  const colorMap: Record<ColorVariant, string> = {
    default: colors.muted35,
    white: colors.white,
    dark: colors.default,
    primary: colors.primaryLight,
    danger: colors.danger,
  };

  return (
    <View
      style={[

        style,
        isVertical ? {
          height: 21,
          width: thickness,
          backgroundColor: colorMap[color],

        } :
          {
            height: thickness,
            backgroundColor: colorMap[color],
            width: '100%',
          },
      ]}
    />
  );
};

export default SpaceComponent;
