import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';

type CenteredModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onModalHide?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  extraStyle?: StyleProp<ViewStyle>;
  backdropOpacity?: number;

};

const ModalComp: React.FC<CenteredModalProps> = ({
  isVisible,
  onClose,
  onModalHide,
  backdropOpacity = 0.5,
  extraStyle,
  children,
  style,
}) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

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
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      animationIn="zoomIn"
      onModalHide={onModalHide}
      animationOut="zoomOut"
      backdropTransitionOutTiming={0}
      backdropColor="black"
      backdropOpacity={backdropOpacity}
      style={styles.centeredModal}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[style, extraStyle]}>{children}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const createStyleSheet = (colors: ColorPalette) => {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: colors.background,
      borderRadius: 10,
      maxWidth: '90%',
      elevation: 5,
    },
    centeredModal: {
      width: '110%',
      alignSelf: 'center',
      margin: 0,
      justifyContent: 'center',
      alignItems: 'center',

    },
  });
};

export default ModalComp;
