import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { ColorPalette, colors, getColors } from '../../theme/colors';
import { shadows } from '../../theme/shadows';
import { useTheme } from '../../hooks/useTheme';
import ModalComp from '../ModalComp';
import TextComp from '../TextComp';

type AlertVariant = 'success' | 'error' | 'default';

interface CustomAlertProps {
  visible: boolean;
  variant?: AlertVariant;
  message: string;
  onClose: () => void;
  onClick?: () => void;
  isButton?: boolean;
  extraStyle?: StyleProp<ViewStyle>;

}

const getVariantStyle = (variant?: AlertVariant) => {
  switch (variant) {
    case 'success':
      return {
        color: colors.green,
        backgroundColor: colors.green,
        image: require('../../assets/icons/suscribed.png'),
      };
    case 'error':
      return {
        color: colors.danger,
        backgroundColor: colors.danger,
        image: require('../../assets/icons/danger.png'),
      };
    default:
      return {
        color: colors.textPrimary,
        backgroundColor: colors.textPrimary,
        image: require('../../assets/icons/alert.png'),
      };
  }
};

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  variant = 'success',
  message,
  onClose,
  onClick,
  isButton,
  extraStyle
}) => {
  const theme = useTheme();
  const isDark = theme === 'dark';
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);
  const { color, image, backgroundColor } = getVariantStyle(variant);

  return (
    <ModalComp extraStyle={extraStyle} isVisible={visible} onClose={onClose}>
      <View style={styles.alertContainer}>
        <View style={{ alignItems: 'center', gap: 10 }}>
          <Image source={image} style={styles.imageStyle} />
          <TextComp style={[styles.explanation, isDark ? { color: colors.white } : { color }]}>{message}</TextComp>
        </View>

        {isButton && (
          <TouchableOpacity
            onPress={onClick || onClose}
            style={[styles.button, { backgroundColor }]}
          >
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        )}
      </View>
    </ModalComp>
  );
};

export default CustomAlert;

const createStyleSheet = (colors: ColorPalette) => StyleSheet.create({
  alertContainer: {
    gap: 25,
    padding: 20,
    width: '90%',
    backgroundColor: colors.secondaryBackground,
    borderRadius: 20,
    borderColor: colors.muted15,
    borderWidth: 1,
  },
  imageStyle: {
    resizeMode: 'contain',
    height: 50,
    width: 50,
  },
  explanation: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
  },
  button: {
    backgroundColor: colors.danger,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: 43,
    paddingHorizontal: 12,
    ...shadows.button,

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
