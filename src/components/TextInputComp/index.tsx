import React, { useState } from 'react';
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Image,
} from 'react-native';
import { shadows } from '../../theme/shadows';
import { useTheme } from './../../hooks/useTheme';
import { ColorPalette, getColors } from './../../theme/colors';
import TextComp from '../TextComp';

interface TextInputCompProps extends TextInputProps {
  value?: string;
  showToggleImage: boolean;
  textInputStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholderText?: string;
  error?: string;
  secureText?: boolean;
  light?: boolean;
  onlyNumbers?: boolean;

}

const TextInputComp = ({
  placeholderText,
  secureText,
  showToggleImage,
  light = false,
  onlyNumbers = false,
  value,
  error,
  onChangeText,
  ...props
}: TextInputCompProps) => {
  const theme = light ? 'light' : useTheme();
  const colors = getColors(theme);
  const isDark = theme === 'dark';
  const styles = createStyleSheet(colors, isDark);
  const [showPassword, setShowPassword] = useState(false);

  const handleTextChange = (text: string) => {
    const filteredText = onlyNumbers ? text.replace(/[^0-9]/g, '') : text;
    onChangeText?.(filteredText);
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View>
      <View style={styles.input}>
        <TextInput
          keyboardType={onlyNumbers ? 'numeric' : props.keyboardType}
          onChangeText={handleTextChange}
          value={value}
          placeholder={placeholderText}
          placeholderTextColor={colors.muted}
          numberOfLines={1}
          secureTextEntry={secureText && !showPassword}
          style={styles.inputText}
          {...props}
        />
        {showToggleImage && (
          <TouchableOpacity onPress={toggleShowPassword}>
            <Image
              source={
                showPassword
                  ? require('../../assets/icons/eyeShown.png')
                  : require('../../assets/icons/eyeHidden.png')
              }
              style={styles.eyeImage}
            />
          </TouchableOpacity>
        )}
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
    input: {
      borderWidth: 1,
      borderColor: colors.bottomTabsBorder,
      flexDirection: 'row',
      width: '100%',
      height: 44,
      backgroundColor: colors.secondaryBackground,
      borderRadius: 10,
      paddingHorizontal: 16,
      fontSize: 16,
      color: colors.default,
      justifyContent: 'space-between',
      alignItems: 'center',

    },
    inputText: {
      flex: 1,
      color: colors.default,
      fontSize: 14,
    },

    eyeImage: {
      height: 18,
      width: 18,
      tintColor: colors.default,
    },
  });
};

export default TextInputComp;
