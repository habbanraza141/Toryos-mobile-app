import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import ToolStack, { ToolStackParamList } from '../ToolStack';
import RoomStack, { RoomStackParamList } from '../RoomStack';
import CourseStack, { CourseStackParamList } from '../CourseStack';


export type AccessStackParamList = {
    ToolStack: NavigatorScreenParams<ToolStackParamList>;
    RoomStack: NavigatorScreenParams<RoomStackParamList>;
    CourseStack: NavigatorScreenParams<CourseStackParamList>;
};
const Stack = createStackNavigator<AccessStackParamList>();

const AccessStack = () => {
    return (
        <Stack.Navigator initialRouteName="ToolStack" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ToolStack" component={ToolStack} />
            <Stack.Screen name="RoomStack" component={RoomStack} />
            <Stack.Screen name="CourseStack" component={CourseStack} />
        </Stack.Navigator>
    );
};

export default AccessStack;
