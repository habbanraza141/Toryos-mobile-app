import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
} from 'react-native';
import { ColorPalette, getColors } from '../../theme/colors';
import FONTS from '../../theme/fonts';
import { useTheme } from '../../hooks/useTheme';
import { shadows } from '../../theme/shadows';

interface MultiselectOptionProps {
  title: string;
  onPress?: () => void;
  onSelect?: (title: string, selected: boolean) => void;
  btnStyle?: StyleProp<ViewStyle>;
  btnTextStyle?: StyleProp<TextStyle>;
  primary?: boolean; // initial state
  selected?: boolean; // controlled selection state
  mode?: 'edit' | 'view'; // phase control
  isDisabled?: boolean; // explicit disable override
}

const MultiselectOption = ({
  title,
  onPress,
  onSelect,
  btnStyle,
  btnTextStyle,
  primary = false,
  selected: controlledSelected,
  mode = 'edit',
  isDisabled = false,
}: MultiselectOptionProps) => {
  const theme = useTheme();
  const isDark = theme === 'dark';
  const colors = getColors(theme);
  const styles = createStyleSheet(colors, isDark);

  const [localSelected, setLocalSelected] = useState(primary);
  const selected =
    controlledSelected !== undefined ? controlledSelected : localSelected;

  const handlePress = () => {
    if (mode === 'view' || isDisabled) return; // block when disabled
    const newSelected = !selected;
    setLocalSelected(newSelected);
    onSelect?.(title, newSelected);
    onPress?.();
  };

  let backgroundColor = colors.white;
  let textColor = colors.primary;

  if (selected) {
    backgroundColor = colors.primary;
    textColor = colors.white;
  } else if (mode === 'view' || isDisabled) {
    backgroundColor = colors.disabledBack;
    textColor = colors.disabledText;
  }

  return (
    <TouchableOpacity
      disabled={mode === 'view' || isDisabled}
      activeOpacity={1}
      style={[{ ...styles.button, backgroundColor }, btnStyle]}
      onPress={handlePress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text
          numberOfLines={1}
          style={[styles.buttonText, { color: textColor }, btnTextStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyleSheet = (colors: ColorPalette, isDark: boolean) => {
  return StyleSheet.create({
    button: {
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      width: '30%',
      padding: 8,
      ...shadows.button,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '700',
      textAlign: 'center',
      fontFamily: FONTS.primaryRegular,
      textTransform: 'capitalize',
    },
  });
};

export default MultiselectOption;
