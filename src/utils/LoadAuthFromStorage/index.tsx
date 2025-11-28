import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserResponse,} from '../../store/slices/auth';
import * as Sentry from '@sentry/react-native';


export const loadAuthFromStorage = async (dispatch: any) => {
  try {
    const values = await AsyncStorage.multiGet([
      'userData',
    ]);

    const dataMap = Object.fromEntries(values);

    if (dataMap.userData) {
      try {
        dispatch(setUserResponse(JSON.parse(dataMap.userData)));
      } catch (err) {
Sentry.captureException(err) 
        console.error('Failed to parse userData:', err);
      }
    }
  } catch (error) {
    console.error('Failed to load auth from storage:', error);
Sentry.captureException(error) 
  }
};
