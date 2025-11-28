import React, {memo, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewProps} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import FONTS from '../../theme/fonts';
import {shadows} from '../../theme/shadows';
import {ColorPalette, getColors} from './../../theme/colors';
import {useTheme} from './../../hooks/useTheme';
import TextComp from '../TextComp';

interface Props {
  data?: {label: string; value: string}[];
  value?: string;
  light?: boolean;
  search?: boolean;
  isWithoutBackground?: boolean;
  isSelectedOfPrimaryColor?: boolean;
  placeholder?: string;
  error?: string;
  label?: string;
  customContainerStyle?: any;
  moreMinWidth?: any;
  onValueChange: (value: string) => void;
}

const DropdownComponent = ({
  data,
  value,
  onValueChange,
  error,
  light = false,
  search = false,
  isWithoutBackground,
  isSelectedOfPrimaryColor,
  placeholder,
  customContainerStyle,
  moreMinWidth,
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  const theme = light ? 'light' : useTheme();
  const colors = getColors(theme);
  const isDark = theme === 'dark';
  const styles = createStyleSheet(colors, isDark, isFocus);

  return (
    <View>
      <View
        style={[
          isWithoutBackground ? styles.container2 : styles.container,
          customContainerStyle,
        ]}>
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && {borderColor: colors.primary},
            isWithoutBackground && {paddingHorizontal: 6, minWidth: 72},
            moreMinWidth,
          ]}
          containerStyle={[
            styles.dropdownContainer,
            isWithoutBackground && {marginTop: 0},
          ]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            isSelectedOfPrimaryColor && {color: colors.primary},
          ]}
          placeholderStyle={styles.placeholderStyle}
          iconStyle={styles.iconStyle}
          data={data || []}
          maxHeight={250}
          labelField="label"
          valueField="value"
          search={search}
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => onValueChange(item.value)}
          renderItem={(item, selected) => (
            <View
              style={[
                styles.item,
                isWithoutBackground && {paddingHorizontal: 10},
              ]}>
              <TextComp
                style={[isWithoutBackground && {textAlign: 'center'}]}
                fontSize={14}
                color={selected ? 'primary' : 'default'}>
                {item.label}
              </TextComp>
            </View>
          )}
          itemContainerStyle={styles.itemContainer}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        />
      </View>
      {error && (
        <TextComp bold fontSize={12} color="danger" style={{marginTop: 8}}>
          {error}
        </TextComp>
      )}
    </View>
  );
};

export default memo(DropdownComponent);

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
    container2: {
      padding: 4,
    },
    dropdown: {
      height: 40,
      paddingHorizontal: 12,
      minWidth: 90,
      color: colors.default,
    },
    dropdownContainer: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.muted15,
      backgroundColor: colors.secondaryBackgroundWithoutOpacity,
      overflow: 'hidden',
      marginTop: 8,
      zIndex: 1000,
      elevation: 10,
    },
    itemContainer: {
      borderRadius: 12,
    },
    label: {
      position: 'absolute',
      top: -10,
      left: 12,
      paddingHorizontal: 4,
      fontSize: 12,
      fontFamily: FONTS.primaryRegular,
      color: colors.muted,
      zIndex: 1,
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
    selectedTextStyle2: {
      fontSize: 14,
      color: colors.primary,
      fontFamily: FONTS.primaryRegular,
    },
    iconStyle: {
      width: 24,
      height: 24,
      tintColor: colors.muted,
    },
    item: {
      backgroundColor: colors.secondaryBackground,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.muted15,
      minHeight: 44,
    },
  });
