import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../../screens/Welcome';


export type AuthStackParamList = {

  Welcome: undefined;

};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen name="Welcome" component={Welcome} />

    </Stack.Navigator>
  );
}
