import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MembersScreen from '../../screens/MembersScreen';

export type MemberStackParamList = {
  MembersScreen: undefined;
};

const Stack = createNativeStackNavigator<MemberStackParamList>();

export default function MemberStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MembersScreen">
      <Stack.Screen
        name="MembersScreen"
        component={MembersScreen}
        options={{
          headerShown: false,
          contentStyle: { width: '100%' },
        }}
      />
    </Stack.Navigator>
  );
}

