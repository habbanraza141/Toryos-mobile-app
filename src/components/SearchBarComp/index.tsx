import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
  TextInput,
  Image,
} from 'react-native';
import { shadows } from '../../theme/shadows';
import { useTheme } from './../../hooks/useTheme';
import { ColorPalette, getColors } from './../../theme/colors';

interface SearchBarCompProps {
  textInputStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholderText?: string;
  secureText?: boolean;
  value: string;
  onChange: (text: string) => void;
}

const SearchBarComp = ({
  placeholderText = 'Search',
  onChange,
  value = '',
}: SearchBarCompProps) => {
  const theme = useTheme();
  const isDark = theme === 'dark';
  const colors = getColors(theme);
  const styles = createStyleSheet(colors, isDark);

  return (
    <View style={styles.input}>
      <Image
        source={require('../../assets/icons/searchIcon.png')}
        style={styles.eyeImage}
      />
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor={colors.muted}
        numberOfLines={1}
        style={styles.inputText}
        value={value}
        onChangeText={(e) => onChange(e)}
      />
    </View>
  );
};

const createStyleSheet = (colors: ColorPalette, isDark: boolean) => {
  return StyleSheet.create({
    input: {
      flexDirection: 'row',
      width: '100%',
      height: 44,
      backgroundColor: colors.secondaryBackground,
      borderRadius: 10,
      paddingHorizontal: 16,
      fontSize: 16,
      color: colors.default,
      borderColor: colors.bottomTabsBorder,
      borderWidth: 0.6,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inputText: {
      flex: 1,
      color: colors.default,
      fontSize: 16,
    },

    eyeImage: {
      height: 18,
      width: 18,
      tintColor: colors.default,
      marginRight: 10,
    },
  });
};

export default SearchBarComp;
