import { StyleSheet, Text, TextStyle, StyleProp } from 'react-native';
import React from 'react';
import FONTS from '../../theme/fonts';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';
import { ColorVariant } from '../../types/generalInterface';
interface TextInputCompProps {
  title?: string;
  numberOfLines?: number | undefined;
  otherStyles?: StyleProp<TextStyle>;
  color?: ColorVariant;
  onPress?: () => void;
}

const HeadingComp = ({
  title,
  onPress,
  otherStyles,
  numberOfLines,
  color = 'default',
}: TextInputCompProps) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);

  const colorMap: Record<ColorVariant, string> = {
    muted: colors.muted,
    warning: colors.warning,
    text: colors.secondaryText,
    muted35: colors.muted35,
    danger: colors.danger,
    primary: colors.primaryLight,
    default: colors.default,
    warningLight: colors.warningLight,
    success: colors.success,
  };

  return <Text onPress={onPress} style={[
    styles.textStyle,
    { color: colorMap[color] },
    otherStyles,
  ]}
    numberOfLines={numberOfLines}>
    {title}
  </Text>;
};

export default HeadingComp;

const createStyleSheet = (colors: ColorPalette) => {
  return StyleSheet.create({
    textStyle: {
      fontSize: 28,
      fontWeight: 600,
      color: colors.default,
      fontFamily: FONTS.headingSemibold,
      letterSpacing: -1.4,
      textTransform: 'capitalize',
    },
  });
};
