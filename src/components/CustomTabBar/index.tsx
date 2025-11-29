import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { shadows } from '../../theme/shadows';
import { ColorPalette, getColors } from '../../theme/colors';
import { NavigationState } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabBarDescriptor = {
  options: {
    tabBarLabel?: string;
    title?: string;
  };
};

type CustomTabBarProps = any & {
  state: NavigationState<any>;
  descriptors: Record<string, TabBarDescriptor>;
  navigation: any;
  disabledTabs?: string[];
};

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  disabledTabs = [],
}) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const insets = useSafeAreaInsets();

  const styles = React.useMemo(() => createstylesheet(colors), [colors]);

  // Check if current route is FAQs screen or SubmitInjuryScreen


  const handleTabPress = useCallback(
    (route: any, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        requestAnimationFrame(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: route.name }],
          });
        });
      }
    },
    [navigation],
  );


  return (
    <View style={[styles.container]}>
      <View
        style={[styles.tabBarContainer, { paddingBottom: insets.bottom + 12 }]}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const dynamicStyles = createDynamicStyles(colors, isFocused);
          const isDisabled = disabledTabs.includes(route.name);

          const label = options.tabBarLabel ?? options.title ?? route.name;

          const iconMap = {
            Home: require('../../assets/icons/home.png'),
            Event: require('../../assets/icons/event.png'),
            Schedule: require('../../assets/icons/clock.png'),
            More: require('../../assets/icons/more.png'),

          };


          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handleTabPress(route, isFocused)}
              style={[styles.tabItem, isDisabled && styles.disabledTab]}
              activeOpacity={0.7}
              disabled={isDisabled}>
              <Image
                source={
                  iconMap[route.name as keyof typeof iconMap]
                }
                style={[
                  styles.icon,
                  isDisabled && styles.disabledIcon,
                  { tintColor: dynamicStyles.iconTintColor },
                ]}
              />
              <Text
                style={[
                  styles.label,
                  dynamicStyles.labelText,
                  isDisabled && styles.disabledText,
                ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const createstylesheet = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    tabBarContainer: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 18,
      paddingHorizontal: 15,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 0,
      borderColor: colors.bottomTabsBorder,
      backgroundColor: colors.bottomTabsBack,
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
    tabItem: {
      alignItems: 'center',
      gap: 4,
      flex: 1,
      justifyContent: 'center',
    },
    disabledTab: {
      opacity: 0.5,
    },
    icon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
    },
    disabledIcon: {
      opacity: 0.5,
    },
    label: {
      fontSize: 10,
    },
    disabledText: {
      opacity: 0.5,
    },
  });
};

const createDynamicStyles = (colors: ColorPalette, isFocused?: boolean) => {
  return {
    iconTintColor: isFocused ? colors.green : colors.bottomTabsIcon,
    labelText: {
      color: isFocused ? colors.green : colors.bottomTabsIcon,
      fontWeight: isFocused ? 'bold' : 'normal',
    } as const,
  };
};

export default CustomTabBar;
