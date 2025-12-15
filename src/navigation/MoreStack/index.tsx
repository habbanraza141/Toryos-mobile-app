import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import ToolStack, { ToolStackParamList } from '../ToolStack';
import RoomStack, { RoomStackParamList } from '../RoomStack';
import CourseStack, { CourseStackParamList } from '../CourseStack';
import MemberStack, { MemberStackParamList } from '../MemberStack';


export type MoreStackParamList = {
  ToolStack: NavigatorScreenParams<ToolStackParamList>;
  RoomStack: NavigatorScreenParams<RoomStackParamList>;
  CourseStack: NavigatorScreenParams<CourseStackParamList>;
  MemberStack: NavigatorScreenParams<MemberStackParamList>;
};
const Stack = createStackNavigator<MoreStackParamList>();

const MoreStack = () => {
  return (
    <Stack.Navigator initialRouteName="ToolStack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ToolStack" component={ToolStack} />
      <Stack.Screen name="RoomStack" component={RoomStack} />
      <Stack.Screen name="CourseStack" component={CourseStack} />
      <Stack.Screen name="MemberStack" component={MemberStack} />
    </Stack.Navigator>
  );
};

export default MoreStack;
