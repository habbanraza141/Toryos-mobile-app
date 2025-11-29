import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';

export type ScheduledStackParamList = {
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<ScheduledStackParamList>();

export default function ScheduledStack() {
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
