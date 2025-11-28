import React from 'react';
import AuthStack from './src/navigation/AuthStack';
import StatusBar from './src/components/StatusBar/index.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    reset(arg0: { index: number; routes: { name: string; }[]; }): unknown;
    Auth: undefined;
    Main: undefined;
};


export default function AppContent() {



    return (
        <>
            {/* <StatusBar /> */}
            <NavigationContainer >
                <RootStack.Navigator>

                    {/* <RootStack.Screen name="Main" component={MainStack} /> */}
                    <RootStack.Screen name="Auth" component={AuthStack} />
                </RootStack.Navigator>
            </NavigationContainer>
        </>
    );
}