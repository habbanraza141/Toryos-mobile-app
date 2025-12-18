import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import TabRoutes from '../TabNavigation';
import DrawerComponent from '../../components/DrawerComponent';
import ToolStack, { ToolStackParamList } from '../ToolStack';
import RoomStack, { RoomStackParamList } from '../RoomStack';
import CourseStack, { CourseStackParamList } from '../CourseStack';
import { NavigatorScreenParams } from '@react-navigation/native';

export type DrawerStackParamList = {
    TabRoutes: {
        screen?: string;
        params?: any;
    };
    ToolStack: NavigatorScreenParams<ToolStackParamList>;
    RoomStack: NavigatorScreenParams<RoomStackParamList>;
    CourseStack: NavigatorScreenParams<CourseStackParamList>;
};

const Drawer = createDrawerNavigator<DrawerStackParamList>();
export default function DrawerStack() {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerComponent {...props} />}>
            <Drawer.Screen
                name="TabRoutes"
                component={TabRoutes}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="ToolStack"
                component={ToolStack}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="RoomStack"
                component={RoomStack}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="CourseStack"
                component={CourseStack}
                options={{ headerShown: false }}
            />
        </Drawer.Navigator>
    );
}