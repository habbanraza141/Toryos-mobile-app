import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScheduleScreen from '../../screens/ScheduleScreen';

export type ScheduledStackParamList = {
  ScheduleScreen: undefined;
};

const Stack = createNativeStackNavigator<ScheduledStackParamList>();

export default function ScheduledStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ScheduleScreen">
      <Stack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{
          headerShown: false,
          contentStyle: { width: '100%' },
        }}
      />

    </Stack.Navigator>
  );
}
