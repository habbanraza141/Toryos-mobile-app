import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import TabRoutes from '../TabNavigation';
import DrawerComponent from '../../components/DrawerComponent';

export type DrawerStackParamList = {
    TabRoutes: {
        screen?: string;
        params?: any;
    };
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
        </Drawer.Navigator>
    );
}