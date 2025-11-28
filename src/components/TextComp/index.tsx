import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { getColors } from '../../theme/colors';
import { useTheme } from './../../hooks/useTheme';

type FontSize = number;
type LineHeight = 16.8 | 19.2 | 21.6 | number;
interface TextCompProps {
  children: React.ReactNode;
  fontSize?: FontSize;
  lineHeight?: LineHeight;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  style?: StyleProp<TextStyle>;
  light?: boolean;
  zero?: boolean;
  capitalize?: boolean;
  numberOfLines?: number;
  onPress?: () => void;
}

const TextComp: React.FC<TextCompProps> = ({
  children,
  fontSize = 14,
  lineHeight = 16.8,
  bold = false,
  zero = false,
  italic = false,
  underline = false,
  capitalize = false,
  style,
  light = false,
  onPress,
  ...props
}) => {
  const fontWeight = bold ? '700' : '400';
  const paddingBottom = zero ? 0 : 4;
  const fontStyle = italic ? 'italic' : 'normal';
  const textDecorationLine = underline ? 'underline' : 'none';
  const textTransform = capitalize ? 'capitalize' : 'none';
  const theme = light ? 'light' : useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet();



  return (
    <Text
      {...props}
      onPress={onPress}
      style={[
        styles.baseText,
        {
          fontSize,
          lineHeight,
          fontWeight,
          fontStyle,
          textTransform,
          textDecorationLine,

          paddingBottom,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default TextComp;

const createStyleSheet = () =>
  StyleSheet.create({
    baseText: {
      letterSpacing: -0.12,
      paddingBottom: 4,
      flexShrink: 1,
    },
  });
