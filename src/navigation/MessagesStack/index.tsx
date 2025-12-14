import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagesScreen from '../../screens/MessagesScreen';

export type MessagesStackParamList = {
  MessagesScreen: undefined;
};

const Stack = createNativeStackNavigator<MessagesStackParamList>();

export default function MessagesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MessagesScreen">
      <Stack.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{
          headerShown: false,
          contentStyle: { width: '100%' },
        }}
      />
    </Stack.Navigator>
  );
}

