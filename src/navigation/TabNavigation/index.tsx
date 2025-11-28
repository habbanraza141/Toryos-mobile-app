import React, { useMemo, useState, useCallback } from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import HomeStack from '../../navigation/HomeStack';
import Button from '../../components/Button';
import CustomTabBar from '../../components/CustomTabBar';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';
import {
  CommonActions,
  CompositeNavigationProp,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import axios from 'axios';

export type TabNavigationParamList = {

  Auth: undefined;
};
export type TabNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigationParamList, 'Auth'>,
  NativeStackNavigationProp<any>
>;

const Tab = createBottomTabNavigator();

const EMPLOYEE_ITEMS = [
  {
    id: '1',
    label: 'Help & Support',
    icon: require('../../assets/icons/supportIcon.png'),
  },
  {
    id: '2',
    label: 'My Account',
    icon: require('../../assets/icons/accountIcon.png'),
  },
  {
    id: '3',
    label: 'Document Library',
    icon: require('../../assets/icons/documentLibrary.png'),
  },
];

const NOT_EMPLOYEE_ITEMS = [
  {
    id: '1',
    label: 'Corrective Actions',
    icon: require('../../assets/icons/correctiveIcon.png'),
  },
  {
    id: '2',
    label: 'My Account',
    icon: require('../../assets/icons/accountIcon.png'),
  },
  {
    id: '3',
    label: 'Document Library',
    icon: require('../../assets/icons/documentLibrary.png'),
  },
  {
    id: '4',
    label: 'Help & Support',
    icon: require('../../assets/icons/supportIcon.png'),
  },
];

const TabRoutes = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [pendingNavigation, setPendingNavigation] = useState<
    (() => void) | null
  >(null);
  const navigation = useNavigation<TabNavProp>();
  const theme = useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);
  const dispatch = useDispatch();

  const handleModalHide = useCallback(() => {
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
  }, [pendingNavigation]);



  const handleTabPress = useCallback((e: any) => {
    e.preventDefault();
    setModalVisible(true);
  }, []);





  return (
    <>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props: any) => <CustomTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeStack}

        />
        {/* <Tab.Screen
          name="Incidents"
          component={IncidentStack}
          listeners={{
            tabPress: handleIncidentsTabPress,
          }}
        /> */}

      </Tab.Navigator>

    </>
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
