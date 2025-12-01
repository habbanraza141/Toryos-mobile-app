import React, { useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { setTheme } from '../../store/slices/themeSlice';
import { getColors } from '../../theme/colors';

const SIZE_VARIANTS: any = {
  sm: {
    switchWidth: 44,
    switchHeight: 20,
    circleSize: 16,
    circleStart: 1,
    circleEnd: 24,
    iconSize: 12,
  },
  md: {
    switchWidth: 54,
    switchHeight: 32,
    circleSize: 26,
    circleStart: 2,
    circleEnd: 24,
    iconSize: 16,
  },
  lg: {
    switchWidth: 68,
    switchHeight: 40,
    circleSize: 34,
    circleStart: 1,
    circleEnd: 28,
    iconSize: 20,
  },
};

const ToggleSwitch = ({ size = 'md' }: any) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = getColors(theme);


  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  };

  const isDark = theme === 'dark';
  const variant: any = SIZE_VARIANTS[size] || SIZE_VARIANTS.md;
  const translateX = useRef(new Animated.Value(variant.circleStart)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isDark ? variant.circleEnd : variant.circleStart,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isDark]);

  const renderIcon = () => (
    <View
      style={{
        position: 'absolute',
        right: isDark ? 'auto' : 6,
        left: isDark ? 6 : 'auto',
      }}>
      <Image
        source={
          isDark
            ? require('../../assets/icons/moon.png')
            : require('../../assets/icons/light.png')
        }
        style={{
          width: variant.iconSize + 4,
          height: variant.iconSize + 4,
          position: 'absolute',
          top: -8,
          left: isDark ? -4 : 'auto',
          right: isDark ? 'auto' : -2,
        }}
      />
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          {
            width: variant.switchWidth,
            height: variant.switchHeight,
            borderRadius: variant.switchHeight / 2,
            padding: 2,
            backgroundColor: isDark ? '#333' : '#ddd',
            justifyContent: 'center',
          },
        ]}
        onPress={toggleTheme}
        activeOpacity={0.8}>
        {renderIcon()}
        <Animated.View
          style={{
            width: variant.circleSize,
            height: variant.circleSize,
            borderRadius: variant.circleSize / 2,
            backgroundColor: colors.blue,
            transform: [{ translateX }],
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
});

export default ToggleSwitch;
