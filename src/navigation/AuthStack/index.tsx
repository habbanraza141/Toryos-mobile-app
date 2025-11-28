import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../../screens/SignIn';


export type AuthStackParamList = {

  SignIn: undefined;

};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen name="SignIn" component={SignIn} />

    </Stack.Navigator>
  );
}
