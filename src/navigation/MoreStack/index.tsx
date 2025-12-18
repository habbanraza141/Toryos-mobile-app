import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';

import MemberStack, { MemberStackParamList } from '../MemberStack';
import SettingsStack, { SettingsStackParamList } from '../SettingsStack';


export type MoreStackParamList = {

  MemberStack: NavigatorScreenParams<MemberStackParamList>;
  SettingsStack: NavigatorScreenParams<SettingsStackParamList>;
};
const Stack = createStackNavigator<MoreStackParamList>();

const MoreStack = () => {
  return (
    <Stack.Navigator initialRouteName="MemberStack" screenOptions={{ headerShown: false }}>

      <Stack.Screen name="MemberStack" component={MemberStack} />
      <Stack.Screen name="SettingsStack" component={SettingsStack} />
    </Stack.Navigator>
  );
};

export default MoreStack;
