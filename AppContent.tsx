import React from 'react';
import AuthStack from './src/navigation/AuthStack';
import StatusBar from './src/components/StatusBar/index.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};


export default function AppContent() {



    return (
        <>
            <NavigationContainer >
                <RootStack.Navigator screenOptions={{ headerShown: false }}>
                    <RootStack.Screen name="Auth" component={AuthStack} />
                </RootStack.Navigator>
            </NavigationContainer>
        </>
    );
}