import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../../screens/Welcome';
import SignIn from '../../screens/SignIn';
import ForgotPassword from '../../screens/ForgotPassword';
import RequestAccess from '../../screens/RequestAccess';


export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  RequestAccess: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="RequestAccess" component={RequestAccess} />

    </Stack.Navigator>
  );
}
