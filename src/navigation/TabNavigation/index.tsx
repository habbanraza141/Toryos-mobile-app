import React, { useCallback, useMemo, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../../navigation/HomeStack';
import CustomTabBar from '../../components/CustomTabBar';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';
import { CommonActions, CompositeNavigationProp, NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EventStack from '../EventStack';
import ScheduledStack from '../ScheduledStack';
import MoreStack, { MoreStackParamList } from '../MoreStack';
import TabModalContent from '../../components/TabModalContent';
import Button from '../../components/Button';

export type TabNavigationParamList = {
  HomeStack: undefined;
  RoomStack: undefined;
  CourseStack: undefined;
  More: NavigatorScreenParams<MoreStackParamList>;

};
export type TabNavProp = CompositeNavigationProp<BottomTabNavigationProp<TabNavigationParamList, 'More'>,
  NativeStackNavigationProp<any>>;

const Tab = createBottomTabNavigator();

const ITEMS = [
  {
    id: '1',
    label: 'Tools',
    icon: require('../../assets/icons/tool.png'),
  },
  {
    id: '2',
    label: 'Rooms',
    icon: require('../../assets/icons/room.png'),
  },
  {
    id: '3',
    label: 'Courses',
    icon: require('../../assets/icons/topi.png'),
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

  const handleModalHide = useCallback(() => {
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
  }, [pendingNavigation]);


  const items = useMemo(() => {
    return ITEMS.map(item => ({
      ...item,
      onPress: () => {
        setModalVisible(false);

        if (item.label === 'Tools') {
          setPendingNavigation(() => () => {
            navigation.navigate('BottomTab', {
              screen: 'More',
              params: {
                screen: 'ToolStack',
              },
            });
          });
        } else if (item.label === 'Rooms') {
          setPendingNavigation(() => () => {
            navigation.navigate('BottomTab', {
              screen: 'More',
              params: {
                screen: 'RoomStack',
              },
            });
          });
        } else if (item.label === 'Courses') {
          setPendingNavigation(() => () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'BottomTab',
                    state: {
                      routes: [
                        {
                          name: 'More',
                          state: {
                            routes: [
                              {
                                name: 'CourseStack',
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              }),
            );
          });
        }
      },
    }));
  }, [navigation]);

  const handleTabPress = useCallback((e: any) => {
    e.preventDefault();
    setModalVisible(true);
  }, []);


  const handleModalClose = useCallback(() => {
    setModalVisible(false);
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
          listeners={{
            tabPress: handleTabPress,
          }}
        />
      </Tab.Navigator>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={handleModalClose}
        swipeDirection="down"
        onSwipeComplete={handleModalClose}
        onModalHide={handleModalHide}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        backdropColor="black"
        backdropOpacity={0.5}
        style={styles.drawerModal}
        hideModalContentWhileAnimating={true}>
        <View
          style={[
            styles.modalContent,
            Platform.OS === 'ios' && { paddingBottom: 50 },
          ]}>
          <View style={styles.dragIndicator} />
          <View>
            <TabModalContent items={items} />
            <Button
              title="Logout"
              leftImage={require('../../assets/icons/logout.png')}
              isleftImage={true}
              btnStyle={{ backgroundColor: colors.danger }}
              btnTextStyle={{ fontSize: 18 }}
            />
          </View>
        </View>
      </Modal>
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
