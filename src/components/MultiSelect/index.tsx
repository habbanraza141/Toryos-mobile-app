import React, { useState } from 'react';
import { StyleProp, StyleSheet, View, ViewProps } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import FONTS from '../../theme/fonts';
import { shadows } from '../../theme/shadows';
import { ColorPalette, getColors } from './../../theme/colors';
import { useTheme } from './../../hooks/useTheme';
import TextComp from '../TextComp';

interface Props {
  data?: { label: string; value: string }[];
  value?: string[];
  light?: boolean;
  placeholder?: string;
  error?: string;
  label?: string;
  customContainerStyle?: StyleProp<ViewProps>;
  onValueChange: (value: string[]) => void;
}

const MultiSelectDropdown = ({
  data,
  value = [],
  onValueChange,
  error,
  light = false,
  placeholder = 'Select items',
  customContainerStyle,
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);

  const theme = light ? 'light' : useTheme();
  const colors = getColors(theme);
  const isDark = theme === 'dark';
  const styles = createStyleSheet(colors, isDark, isFocus);

  return (
    <View>
      <View style={[styles.container, customContainerStyle]}>
        <MultiSelect
          style={[styles.dropdown, isFocus && { borderColor: colors.primary }]}
          containerStyle={styles.dropdownContainer}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data || []}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(items) => onValueChange(items)}
          renderItem={(item, selected) => (
            <View style={styles.item}>
              <TextComp fontSize={14} color={selected ? 'primary' : 'default'} style={{ textTransform: "capitalize" }}>
                {item.label}
              </TextComp>
            </View>
          )}
          renderSelectedItem={(item, unSelect: any) => (
            <View style={styles.selectedItem}>
              <TextComp fontSize={12} color="primary" style={{ textTransform: "capitalize" }}>
                {item.label}
              </TextComp>
              <TextComp onPress={unSelect} style={styles.selectedItemClose}>
                ×
              </TextComp>
            </View>
          )}
          itemContainerStyle={styles.itemContainer}
          selectedStyle={styles.selectedItemsContainer}
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

export default MultiSelectDropdown;

const createStyleSheet = (
  colors: ColorPalette,
  isDark: boolean,
  isFocus: boolean,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.secondaryBackground,
      borderRadius: 12,
      padding: 4,
      borderWidth: 1,
      borderColor: isFocus ? colors.primary : colors.muted15,
      ...(isDark ? {} : shadows.textInput),
    },
    dropdown: {
      height: 40,
      paddingHorizontal: 12,
      minWidth: 120,
      color: colors.default,
    },
    dropdownContainer: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.muted15,
      backgroundColor: colors.secondaryBackgroundWithoutOpacity,
      overflow: 'hidden',
      marginTop: 8,
    },
    itemContainer: {
      borderRadius: 12,
    },
    placeholderStyle: {
      fontSize: 14,
      color: colors.muted,
      fontFamily: FONTS.primaryRegular,
    },
    selectedTextStyle: {
      fontSize: 14,
      color: colors.default,
      fontFamily: FONTS.primaryRegular,
    },
    iconStyle: {
      width: 24,
      height: 24,
      tintColor: colors.default,
    },
    item: {
      backgroundColor: colors.secondaryBackground,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.muted15,
    },
    selectedItemsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingVertical: 8,
      gap: 8,
    },
    selectedItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 8,
      backgroundColor: colors.primaryWithOpacity,
      borderWidth: 1,
      borderColor: colors.primary,
      marginVertical: 2,
      marginHorizontal: 8
    },
    selectedItemClose: {
      marginLeft: 4,
      fontSize: 14,
      color: colors.primary,
    },
  });