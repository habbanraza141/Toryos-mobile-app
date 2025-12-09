import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import Modal from 'react-native-modal';

import { ColorPalette, COLORS_DEFAULT, getColors } from '../../theme/colors';
import { shadows } from '../../theme/shadows';
import FONTS from '../../theme/fonts';
import { ButtonVariant, ColorVariant } from '../../types/generalInterface';
import TextComp from '../TextComp';
import Button from '../Button';
import HeadingComp from '../HeadingComp';
import { useTheme } from '../../hooks/useTheme';

interface CustomModalProps {
  visible: boolean;
  onClose?: () => void;
  onPressNavigate: () => void;
  title?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  isColumnButton?: boolean;
  disable?: boolean;
  isIcon?: boolean;
  isNormalTextColor?: boolean;
  modalStyle?: StyleProp<ImageStyle>;
  contentStyle?: object;
  modalImage?: ImageSourcePropType;
  heading?: string;
  text?: string;
  secondText?: string;
  btnText?: string;
  color: ColorVariant;
  variant: ButtonVariant;
  textColor?: ColorVariant;
  backdropOpacity?: number;
  onModalHide?: () => void;

}

const CustomModal = ({
  backdropOpacity = 0.5,
  onModalHide,
  isColumnButton,
  visible,
  onClose,
  disable = false,
  title,
  children,
  showCloseButton,
  modalImage,
  contentStyle,
  modalStyle,
  heading,
  text,
  secondText,
  btnText = 'Submit',
  color,
  isIcon,
  textColor,
  variant,
  isNormalTextColor,
  onPressNavigate,

}: CustomModalProps) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  async function handleBtnClick() {
    setLoading(true)
    await onPressNavigate()
    setLoading(false)
  }
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  return (
    <Modal
      avoidKeyboard={Platform.OS === 'ios'}
      isVisible={visible} backdropColor={'black'} onBackdropPress={onClose} onSwipeComplete={onClose}
      swipeDirection="down"
      animationIn="zoomIn"
      onModalHide={onModalHide}
      animationOut="zoomOut"
      backdropTransitionOutTiming={0}
      backdropOpacity={backdropOpacity}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={[styles.modalContainer, Platform.OS === 'ios' ? { paddingTop: 30 } : '']} >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.midContainer, modalStyle]}>
              {showCloseButton && (
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeText}></Text>
                </TouchableOpacity>
              )}
              {title && <Text style={styles.title}>{title}</Text>}
              <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                {
                  isIcon &&
                  <Image
                    source={modalImage}
                    style={[styles.imageStyle, { tintColor: colors[color] }]}
                  />
                }
                <HeadingComp otherStyles={{ fontSize: 24, textAlign: 'center' }} color={color} title={heading} />
                {
                  text &&
                  <TextComp style={{ textAlign: 'center' }} color={isNormalTextColor ? 'default' : color}>{text}
                    {secondText &&
                      <TextComp color={color} bold>{secondText}</TextComp>
                    }
                  </TextComp>
                }
              </View>
              {
                children &&
                <View style={contentStyle}>{children}</View>
              }

              <View
                style={[styles.buttonRow, isColumnButton && { flexDirection: 'column' }]}>
                {
                  isColumnButton ?
                    <>
                      <Button title={btnText} isDisabled={(disable || loading)}
                        loading={loading} onPress={handleBtnClick} variant={variant} />
                      <Button title={'Cancel'} btnTextStyle={{ color: colors.danger }}
                        onPress={onClose} outlined />

                    </> :
                    <>
                      <View style={{ flex: 1 }}>
                        <Button title={'Cancel'}
                          onPress={onClose} outlined />
                      </View>

                      <View style={{ flex: 1 }}>
                        <Button title={btnText} isDisabled={(disable || loading)}
                          loading={loading} onPress={handleBtnClick} variant={variant} />
                      </View>
                    </>
                }

              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>

    </Modal >
  );
};

export default CustomModal;

const createStyleSheet = (colors: ColorPalette) =>
  StyleSheet.create({
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },

    overlay: {
      flex: 1,
      backgroundColor: colors.blackOpacity30,
    },
    modalContainer: {

      flex: 1,
      justifyContent: 'center',
    },
    midContainer:
    {
      backgroundColor: colors.secondaryBackgroundWithoutOpacity,
      borderRadius: 16,
      padding: 20,
      elevation: 5,
      gap: 20,
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 12,
      zIndex: 1,
    },
    closeText: {
      fontSize: 22,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    imageStyle: {
      height: 45,
      width: 50,
    },
    explanation: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 400,
    },
    heading: {

      textTransform: 'capitalize',
      textAlign: 'center',
      fontSize: 24,
      fontFamily: FONTS.headingSemibold,
    },
    button: {
      flex: 1,
      flexDirection: 'row',
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 12,
      height: 43,
      gap: 10,
      ...shadows.button,
    },
    buttonWhite: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors.white,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      ...shadows.button,
      paddingHorizontal: 12,
      height: 43,
      gap: 10,
    },

  });
