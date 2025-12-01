import React from 'react';
import { View, StyleSheet, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { getColors } from '../../theme/colors';
import { ColorPalette } from '../../theme/colors';
import { useTheme } from '../../hooks/useTheme';
import { shadows } from './../../theme/shadows';

interface CardSectionProps extends ViewProps {
  children: React.ReactNode;
  otherStyle?: StyleProp<ViewStyle>;
}

export const Card: React.FC<{ children: React.ReactNode; otherStyle?: StyleProp<ViewStyle> }> & {
  Header: React.FC<CardSectionProps>;
  Content: React.FC<CardSectionProps>;
  Footer: React.FC<CardSectionProps>;
} = ({ children, otherStyle }) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const isDark = theme === 'dark';
  const styles = createStyleSheet(colors, isDark);

  return <View style={[styles.card, otherStyle]}>{children}</View>;
};

Card.Header = ({ children, style, ...props }) => {
  return (
    <View style={style} {...props}>
      {children}
    </View>
  );
};

Card.Content = ({ children, style, ...props }) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const isDark = theme === 'dark';
  const styles = createStyleSheet(colors, isDark);

  return (
    <View style={[styles.cardContent, style]} {...props}>
      {children}
    </View>
  );
};

Card.Footer = ({ children, style, ...props }) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const isDark = theme === 'dark';
  const styles = createStyleSheet(colors, isDark);

  return (
    <View style={[styles.cardFooter, style]} {...props}>
      {children}
    </View>
  );
};

const createStyleSheet = (colors: ColorPalette, isDark: boolean) =>
  StyleSheet.create({
    card: {
      borderRadius: 12,
      padding: 15,
      backgroundColor: colors.secondaryBackground,
      borderColor: colors.bottomTabsBorder,
      borderWidth: 1,
      gap: 15,
    },
    cardContent: {
      gap: 15,
    },
    cardFooter: {
      paddingBottom: 10,
    },
  });

export default Card;