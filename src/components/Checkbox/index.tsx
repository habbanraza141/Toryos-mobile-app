import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
} from 'react-native';
import TextComp from '../TextComp';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';

interface CustomCheckboxProps {
  title?: string;
  value?: boolean;
  onChange?: (newValue: boolean) => void;
  checkboxStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  checkedColor?: string;
  uncheckedColor?: string;
  size?: number;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  title,
  value = false,
  onChange,
  checkboxStyle,
  containerStyle,
  size = 18,
}) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);

  const [isChecked, setIsChecked] = useState<boolean>(value);

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  const toggleCheckbox = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={toggleCheckbox}
      activeOpacity={0.7}>
      <View
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            borderRadius: size / 4,
            borderColor: isChecked ? colors.primary : colors.default,
            backgroundColor: isChecked ? colors.primary : 'transparent',
          },
          checkboxStyle,
        ]}>
        {isChecked && (
          <View style={styles.checkmark}>
            <Image
              style={{ height: 15, width: 15 }}
              source={require('../../assets/icons/tick.png')}
            />
          </View>
        )}
      </View>
      {title && <TextComp style={{ fontSize: 13 }}>{title}</TextComp>}
    </TouchableOpacity>
  );
};

const createStyleSheet = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      marginRight: 10,
    },
    text: {
      fontSize: 16,
    },
    checkmark: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default CustomCheckbox;
