import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventScreen from '../../screens/EventScreen';

export type EventStackParamList = {
  EventScreen: undefined;
};

const Stack = createNativeStackNavigator<EventStackParamList>();

export default function EventStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="EventScreen">
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={{
          headerShown: false,
          contentStyle: { width: '100%' },
        }}
      />

    </Stack.Navigator>
  );
}
