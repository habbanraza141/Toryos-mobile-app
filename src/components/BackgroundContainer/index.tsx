import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ColorPalette, colors, getColors } from '../../theme/colors';
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
  topInsetOnly = false,
  light = false,
}: BackgroundContainerProps) => {

  return (
    <SafeAreaView
      edges={topInsetOnly ? ['top'] : undefined}
      style={styles.safeAreaContainer}>
      {children}
    </SafeAreaView>
  );
};

export default BackgroundContainer;

const styles =
  StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },
  });
