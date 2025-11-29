import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';

export type ToolStackParamList = {
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<ToolStackParamList>();

export default function ToolStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          contentStyle: { width: '100%' },
        }}
      />

    </Stack.Navigator>
  );
}
