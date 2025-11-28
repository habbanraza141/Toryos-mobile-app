import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
  Image,
  ImageSourcePropType,
  ImageStyle,
  ActivityIndicator,
} from 'react-native';
import { ColorPalette, getColors } from '../../theme/colors';
import FONTS from '../../theme/fonts';
import { shadows } from '../../theme/shadows';
import { useTheme } from './../../hooks/useTheme';
import { ButtonVariant } from '../../types/generalInterface';

interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  leftImage?: ImageSourcePropType;
  rightImage?: ImageSourcePropType;
  onPress?: () => void;
  btnStyle?: StyleProp<ViewStyle>;
  btnTextStyle?: StyleProp<TextStyle>;
  leftImageStyle?: StyleProp<ImageStyle>;
  rightImageStyle?: StyleProp<ImageStyle>;
  isDisabled?: boolean;
  loading?: boolean;
  isleftImage?: boolean;
  outlined?: boolean;
  isRightImage?: boolean;
  isCapital?: boolean;
}

const Button = ({
  title,
  isCapital,
  variant = 'primary',
  onPress,
  btnStyle,
  btnTextStyle,
  outlined = false,
  rightImage,
  leftImage,
  leftImageStyle,
  rightImageStyle,
  loading = false,
  isDisabled,
}: ButtonProps) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);

  let btnVariant = 'primary';
  let backgroundColor = colors.primary;
  let color = colors.white;

  switch (variant) {
    case 'danger':
      btnVariant = 'danger';
      backgroundColor = colors.danger;
      break;
    case 'warning':
      btnVariant = 'warning';
      backgroundColor = colors.warning;
      break;
    case 'success':
      btnVariant = 'success';
      backgroundColor = colors.success;
      break;
    case 'link':
      btnVariant = 'link';
      backgroundColor = 'transparent';
      break;
    default:
      btnVariant = 'primary';
      backgroundColor = colors.primary;
      break;
  }

  let textColor = color;

  if (outlined) {
    textColor = backgroundColor;
    backgroundColor = colors.white;
  }

  if (variant === 'link') {
    backgroundColor = 'transparent';
    textColor = colors.primary;
  }

  if (isDisabled) {
    textColor = "#5f5f5f";
  }

  const linkStyle = btnVariant === 'link'
    ? {}
    : { ...shadows.button, paddingVertical: 12 };

  const linkTextStyle = btnVariant === 'link'
    ? { color: colors.primary }
    : {};


  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        { ...styles.button, backgroundColor, ...linkStyle },
        btnStyle,
        (isDisabled && variant != 'link') && styles.disabledBackground,
      ]}
      onPress={onPress}>

      {!loading && leftImage && (
        <Image
          source={leftImage}
          style={[
            styles.imageStyle,
            { tintColor: textColor },
            { ...(outlined ? { tintColor: textColor } : {}) },
            leftImageStyle
          ]}
        />
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {
          loading && <ActivityIndicator size="small" color={textColor} />
        }
        <Text
          numberOfLines={1}
          style={[
            styles.buttonText,
            linkTextStyle,
            { color: textColor },
            btnTextStyle,
            isCapital && { textTransform: 'uppercase' }
          ]}>
          {title}
        </Text>
      </View>

      {!loading && rightImage && (
        <Image
          source={rightImage}
          style={[
            styles.imageStyle,
            { tintColor: textColor },
            { ...(outlined ? { tintColor: textColor } : {}) },
            rightImageStyle
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const createStyleSheet = (colors: ColorPalette) => {
  return StyleSheet.create({
    button: {
      flexDirection: 'row',
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingHorizontal: 8,
      gap: 10,
    },
    disabledBackground: {
      backgroundColor: colors.disabledBack,
    },
    disabledText: {
      color: colors.text,
      opacity: 0.5,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '700',
      textAlign: 'center',
      fontFamily: FONTS.primaryRegular,
      textTransform: 'capitalize',
    },
    imageStyle: {
      height: 20,
      width: 20,
      resizeMode: 'contain',
    },
    loaderStyle: {
      width: 20,
      height: 20,
    },
  });
};

export default Button;
