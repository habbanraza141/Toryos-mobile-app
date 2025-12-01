import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
  TextInput,
  TextInputProps,
} from 'react-native';
import { shadows } from '../../theme/shadows';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';
import TextComp from '../TextComp';

interface TextAreaCompProps extends Omit<TextInputProps, 'style'> {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  light?: boolean;
  error?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  onChangeText?: (text: string) => void;
}

const TextAreaComp = ({
  containerStyle,
  inputStyle,
  light = false,
  placeholder = 'Enter text here...',
  error,
  onChangeText,
  ...props
}: TextAreaCompProps) => {
  const theme = light ? 'light' : useTheme();
  const isDark = theme === 'dark';
  const colors = getColors(theme);
  const styles = createStyleSheet(colors, isDark);

  return (
    <View>
      <View style={[styles.container, containerStyle]}>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          style={[styles.input, inputStyle]}
          onChangeText={onChangeText}
          {...props}
        />
      </View>
      {error && (
        <TextComp bold fontSize={12} color="danger" style={{ marginTop: 8 }}>
          {error}
        </TextComp>
      )}
    </View>
  );
};

const createStyleSheet = (colors: ColorPalette, isDark: boolean) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      maxHeight: 120,
      borderRadius: 10,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.bottomTabsBorder,
      backgroundColor: colors.secondaryBackground,
    },
    input: {
      color: colors.default,
      fontSize: 14,
      height: '100%',
      textAlignVertical: 'top',
      paddingVertical: 12,
    },
  });
};

export default TextAreaComp;
