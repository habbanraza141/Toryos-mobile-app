import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ColorPalette, getColors } from '../../theme/colors';
import { useTheme } from '../../hooks/useTheme';

interface BackgroundContainerProps {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  topInsetOnly?: boolean;
  light?: boolean;
}

const BackgroundContainer = ({
  children,
  containerStyle,
  topInsetOnly = true,
  light = false,
}: BackgroundContainerProps) => {
  const theme = light ? 'light' : useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);

  return (
    <SafeAreaView
      edges={topInsetOnly ? ['top'] : undefined}
      style={[styles.safeAreaContainer, containerStyle]}>
      {children}
    </SafeAreaView>
  );
};

export default BackgroundContainer;

const createStyleSheet = (colors: ColorPalette) =>
  StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
    },
  });
