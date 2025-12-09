import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventScreen from '../../screens/EventScreen';
import CreateEventScreen from '../../screens/CreateEventScreen';

export type EventStackParamList = {
  EventScreen: undefined;
  CreateEvent: undefined;
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
      <Stack.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{
          headerShown: false,
          contentStyle: { width: '100%' },
        }}
      />

    </Stack.Navigator>
  );
}
