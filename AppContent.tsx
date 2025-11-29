import React from 'react';
import AuthStack from './src/navigation/AuthStack';
import StatusBar from './src/components/StatusBar/index.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './src/navigation/MainStack/index.tsx';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Main: undefined;
    Auth: undefined;
};


export default function AppContent() {



    return (
        <>
            <NavigationContainer >
                <RootStack.Navigator screenOptions={{ headerShown: false }}>
                    <RootStack.Screen name="Main" component={MainStack} />
                    {/* <RootStack.Screen name="Auth" component={AuthStack} /> */}
                </RootStack.Navigator>
            </NavigationContainer>
        </>
    );
}