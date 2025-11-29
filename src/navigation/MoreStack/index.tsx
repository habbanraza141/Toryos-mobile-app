import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import ToolStack, { ToolStackParamList } from '../ToolStack';


export type MoreStackParamList = {
  ToolStack: NavigatorScreenParams<ToolStackParamList>;
};
const Stack = createStackNavigator<MoreStackParamList>();

const MoreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ToolStack" component={ToolStack} />
    </Stack.Navigator>
  );
};

export default MoreStack;
