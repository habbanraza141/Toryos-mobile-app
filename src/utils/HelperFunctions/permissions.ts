import { PermissionsAndroid as AndroidPermissions, Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import * as Sentry from '@sentry/react-native';


export async function requestStoragePermission() {
  if (Platform.OS !== 'android') return true;

  try {
    const apiLevel = Platform.Version;

    if (apiLevel >= 29) {
      return true;
    }

    const granted = await AndroidPermissions.request(
      AndroidPermissions.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to storage to download files',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === AndroidPermissions.RESULTS.GRANTED;
  } catch (err) {
Sentry.captureException(err) 

    console.warn('Permission request error:', err);
    return false;
  }
}

export async function checkPhotoLibraryPermission() {
  if (Platform.OS !== 'ios') return true;

  try {
    await CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
    });
    return true;
  } catch (error) {
Sentry.captureException(error) 
    console.warn('Photo library permission check failed:', error);
    return false;
  }
}
