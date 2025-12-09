import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import React from 'react';
import FONTS from '../../theme/fonts';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';

type ColorVariant = 'primary' | 'default' | 'muted' | 'danger' | 'success';

interface HeaderCompProps {
  title?: string;
  colorVariant?: ColorVariant;
  style?: StyleProp<TextStyle>;
}

const HeaderComp: React.FC<HeaderCompProps> = ({
  title,
  style,
  colorVariant = 'default',
}) => {
  const theme = useTheme();
  const colors = getColors(theme);

  const styles = createStyles(colors, colorVariant);

  return <Text style={[styles.textStyle, style]}>{title}</Text>;
};

export default HeaderComp;

const createStyles = (colors: ColorPalette, colorVariant: ColorVariant) =>
  StyleSheet.create({
    textStyle: {
      fontSize: 30,
      fontWeight: '700' as TextStyle['fontWeight'],
      fontFamily: FONTS.headingSemibold,
      letterSpacing: -1.5,
      lineHeight: 36,
      textTransform: 'capitalize',
      color: colors[colorVariant] ?? colors.default,
    },
  });
