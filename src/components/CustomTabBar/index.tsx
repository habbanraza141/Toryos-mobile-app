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
  const shouldHideTabBar = React.useMemo(() => {
    const currentRoute = state.routes[state.index];

    // Check for FAQs screen
    if (currentRoute?.name === 'More') {
      const moreState = currentRoute.state;
      if (moreState?.routes) {
        const moreRoute = moreState.routes[moreState.index];
        if (moreRoute?.name === 'HelpSupportStack') {
          const helpSupportState = moreRoute.state;
          if (helpSupportState?.routes) {
            const helpSupportRoute =
              helpSupportState.routes[helpSupportState.index];
            if (
              ['FAQs', 'UserGuide', 'ContactSupport'].includes(
                helpSupportRoute?.name,
              )
            ) {
              return true;
            }
          }
        }
        if (moreRoute?.name === 'AccountStack') {
          const accountState = moreRoute.state;
          if (accountState?.routes) {
            const accountRoute =
              accountState.routes[accountState.index];
            if (
              ['RemoveCardScreen',].includes(
                accountRoute?.name,
              )
            ) {
              return true;
            }
          }
        }
      }
    }

    // Check for SubmitInjuryScreen
    if (currentRoute?.name === 'Injuries') {
      const injuriesState = currentRoute.state;
      if (injuriesState?.routes) {
        const injuriesRoute = injuriesState.routes[injuriesState.index];
        if (
          injuriesRoute?.name === 'SubmitInjuryScreen' ||
          injuriesRoute?.name === 'InvestigationReport'
        ) {
          return true;
        }
      }
    }

    return false;
  }, [state]);

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

  // Don't render tab bar if it should be hidden
  if (shouldHideTabBar) {
    return null;
  }

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
            Home: require('../../assets/icons/homeIcon.png'),
            Incidents: require('../../assets/icons/incidentsIcon.png'),
            Manager: require('../../assets/icons/managerIcon.png'),
            Statistics: require('../../assets/icons/statisticsIcon.png'),
            More: require('../../assets/icons/moreIcon.png'),
            Action: require('../../assets/icons/actionUnfill.png'),
            Account: require('../../assets/icons/accountUnfill.png'),
            Injuries: require('../../assets/icons/injuryUnselected.png'),
          };

          const iconMapSelected = {
            Home: require('../../assets/icons/homeSelected.png'),
            Incidents: require('../../assets/icons/incidentSelected.png'),
            Manager: require('../../assets/icons/managerSelected.png'),
            Statistics: require('../../assets/icons/statisticsSelected.png'),
            More: require('../../assets/icons/moreSelected.png'),
            Action: require('../../assets/icons/actionFill.png'),
            Account: require('../../assets/icons/accountFilled.png'),
            Injuries: require('../../assets/icons/injurySelected.png'),
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
                  isFocused
                    ? iconMapSelected[
                    route.name as keyof typeof iconMapSelected
                    ]
                    : iconMap[route.name as keyof typeof iconMap]
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
