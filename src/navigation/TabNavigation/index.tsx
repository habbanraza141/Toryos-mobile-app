import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../../navigation/HomeStack';
import CustomTabBar from '../../components/CustomTabBar';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EventStack from '../EventStack';
import ScheduledStack from '../ScheduledStack';
import MoreStack from '../MoreStack';

export type TabNavigationParamList = {
  HomeStack: undefined;
};
export type TabNavProp = CompositeNavigationProp<BottomTabNavigationProp<TabNavigationParamList, 'HomeStack'>,
  NativeStackNavigationProp<any>>;

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  const navigation = useNavigation<TabNavProp>();
  const theme = useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props: any) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        name="Event"
        component={EventStack}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduledStack}
      />
      <Tab.Screen
        name="More"
        component={MoreStack}
      />
    </Tab.Navigator>

  );
};

const createStyleSheet = (colors: ColorPalette) => {
  return StyleSheet.create({
    drawerModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 16,
      borderTopLeftRadius: 16,
      backgroundColor: colors.background,
      borderTopRightRadius: 16,
    },
    dragIndicator: {
      width: 40,
      height: 5,
      borderRadius: 8,
      alignSelf: 'center',
      marginBottom: 10,
      backgroundColor: colors.muted,
    },
  });
};

export default TabRoutes;
