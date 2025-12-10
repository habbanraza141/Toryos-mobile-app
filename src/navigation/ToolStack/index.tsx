import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ToolboxScreen from '../../screens/ToolboxScreen';

export type ToolStackParamList = {
  ToolboxScreen: undefined;
};

const Stack = createNativeStackNavigator<ToolStackParamList>();

export default function ToolStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ToolboxScreen">
      <Stack.Screen
        name="ToolboxScreen"
        component={ToolboxScreen}
        options={{
          headerShown: false,
          contentStyle: { width: '100%' },
        }}
      />

    </Stack.Navigator>
  );
}
