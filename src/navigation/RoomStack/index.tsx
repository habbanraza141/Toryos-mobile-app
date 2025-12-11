import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoomScreen from '../../screens/RoomScreen';

export type RoomStackParamList = {
  RoomScreen: undefined;
};

const Stack = createNativeStackNavigator<RoomStackParamList>();

export default function RoomStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="RoomScreen">
      <Stack.Screen
        name="RoomScreen"
        component={RoomScreen}
        options={{
          headerShown: false,
          contentStyle: { width: '100%' },
        }}
      />

    </Stack.Navigator>
  );
}
