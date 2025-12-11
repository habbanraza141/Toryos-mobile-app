import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CourseScreen from '../../screens/CourseScreen';

export type CourseStackParamList = {
  CourseScreen: undefined;
};

const Stack = createNativeStackNavigator<CourseStackParamList>();

export default function CourseStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="CourseScreen">
      <Stack.Screen
        name="CourseScreen"
        component={CourseScreen}
        options={{
          headerShown: false,
          contentStyle: { width: '100%' },
        }}
      />

    </Stack.Navigator>
  );
}
