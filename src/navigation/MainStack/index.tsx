import React, { useEffect, useState, useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from '../TabNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import Loader from '../../components/Loader';
import { getRequiredModal } from '../../client/service/promises/promiseGet';
import { useFocusEffect } from '@react-navigation/native';


export type MainStackParamList = {
  BottomTab: undefined;
  StripeRenewScreen: undefined;

  PlanExpired: {
    email?: string;
    fromSignIn?: boolean;
  };
  EmailVerification: {
    userId: string;
    token: string;
  };
  NotFoundMain: undefined;

  DeleteAccountScreen: {
    userId: string;
    token: string;
  };
  LinkExpired: { from?: 'SetNewPassword' | 'Verification'; userId?: string };

};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen name="BottomTab" component={TabRoutes} />


    </Stack.Navigator>
  );
}
