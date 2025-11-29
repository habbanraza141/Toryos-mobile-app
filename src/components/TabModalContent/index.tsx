import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ColorPalette, getColors } from '../../theme/colors';
// import ToggleSwitch from '../ToggleSwitch';
import { useTheme } from '../../hooks/useTheme';
import SpaceComponent from '../SpaceComponent';
import TextComp from '../TextComp';

type TabItem = {
  id: string;
  label: string;
  icon: any;
  onPress: () => void;
  disabled?: boolean;
};

type TabModalContentProps = {
  items: TabItem[];
};

const TabModalContent: React.FC<TabModalContentProps> = ({ items }) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);

  const renderItem = (item: TabItem, index: number) => (
    <React.Fragment key={item.id}>
      <TouchableOpacity
        style={[styles.container, item.disabled && styles.disabledItem]}
        onPress={item.disabled ? undefined : item.onPress}
        disabled={item.disabled ? true : false}>
        <View style={styles.item}>
          <Image
            style={[styles.leftIcon, item.disabled && styles.disabledIcon]}
            source={item.icon}
          />
          <TextComp style={[styles.text, item.disabled && styles.disabledText]}>
            {item.label}
          </TextComp>
        </View>
        <Image
          style={[styles.rightIcon, item.disabled && styles.disabledIcon]}
          source={require('../../assets/icons/rightArrow.png')}
        />
      </TouchableOpacity>
      {index < items.length - 1 && <SpaceComponent />}
    </React.Fragment>
  );

  return (
    <View style={styles.modalView}>
      <View>{items.map((item, index) => renderItem(item, index))}</View>
      <View style={styles.container}>
        <TextComp lineHeight={19.2} fontSize={16}>
          Light/Dark Mode
        </TextComp>
        {/* <ToggleSwitch size="sm" /> */}
      </View>
    </View>
  );
};

export default TabModalContent;

function createStyleSheet(colors: ColorPalette) {
  return StyleSheet.create({
    modalView: {
      backgroundColor: colors.background,
      width: '100%',
      borderRadius: 10,
      marginBottom: 25,
    },
    container: {
      borderBottomColor: colors.spaceLine,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      paddingVertical: 23,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    disabledItem: {
      opacity: 0.5,
    },
    leftIcon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
    },
    rightIcon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
      tintColor: colors.muted,
    },
    disabledIcon: {
      opacity: 0.5,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      paddingBottom: 0,
    },
    disabledText: {
      opacity: 0.5,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
  });
}
