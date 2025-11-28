import React from 'react';
import { View, ActivityIndicator, StyleSheet, ActivityIndicatorProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';
import TextComp from '../TextComp';

type LoaderInlineProps = {
  size?: ActivityIndicatorProps['size'];
  text?: string;
};

const LoaderInline: React.FC<LoaderInlineProps> = ({ size = 'small', text }) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={size} color={colors.primary} />
      {text &&
        <TextComp bold >
          {text}
        </TextComp>
      }
    </View>
  );
};

const createStyleSheet = (colors: ColorPalette) => {
  return StyleSheet.create({
    loaderContainer: {
      flexDirection: 'row',
      paddingVertical: 20,
      justifyContent: "center",
      alignItems: 'center',
      gap: 8,
    },
  });
};

export default LoaderInline;
