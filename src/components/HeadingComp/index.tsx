import { StyleSheet, Text, TextStyle, StyleProp } from 'react-native';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';
interface TextInputCompProps {
  title?: string;
  numberOfLines?: number | undefined;
  otherStyles?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const HeadingComp = ({
  title,
  onPress,
  otherStyles,
  numberOfLines,
}: TextInputCompProps) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);



  return <Text onPress={onPress} style={[
    styles.textStyle,
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
      letterSpacing: -1.4,
      textTransform: 'capitalize',
    },
  });
};
