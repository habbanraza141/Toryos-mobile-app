import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {Platform} from 'react-native';
import {components} from '@EHSNavigator/types';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {ColorVariant} from '../../types/generalInterface';
import {requestStoragePermission} from './permissions';
import Share from 'react-native-share';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../AppContent';
import {StackNavigationProp} from '@react-navigation/stack';
import {clearUserData} from '../../store/slices/auth';
import {useDispatch} from 'react-redux';
import * as Sentry from '@sentry/react-native';

type Navigation = StackNavigationProp<RootStackParamList>;

export const storeData = async (
  key: string,
  value: unknown,
): Promise<void | Error> => {
  try {
    let jsonValue: string;

    if (typeof value !== 'string') {
      jsonValue = JSON.stringify(value);
    } else {
      jsonValue = value;
    }

    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    Sentry.captureException(e);

    return e as Error;
  }
};

export const getAccessToken = async (): Promise<string> => {
  const data = (await getData(
    'userData',
  )) as components['schemas']['LoginResponse']['data'];

  return data?.accessToken;
};

export const getData = async <T = unknown,>(
  key: string,
): Promise<
  T | components['schemas']['LoginResponse']['data'] | null | Error
> => {
  try {
    const res = await AsyncStorage.getItem(key);

    if (res !== null) {
      return JSON.parse(res) as T;
    }

    return null;
  } catch (e) {
    Sentry.captureException(e);

    return e as Error;
  }
};

export const showError = (message: string): void => {
  showMessage({
    type: 'danger',
    icon: 'danger',
    message,
    duration: 2500,
  });
};

export const getStatusColor = (
  status:
    | components['schemas']['Incidents']['status']
    | components['schemas']['CorrectiveActions']['status'],
) => {
  switch (status) {
    case 'Active':
      return 'danger';
    case 'Closed':
      return 'success';
    case 'In Progress':
      return 'primary';

    case 'Request Extension':
      return 'primary';
    case 'Rejected':
      return 'primary';
    case 'Extension Approved':
      return 'primary';
    case 'Extension Rejected':
      return 'primary';
    case 'In Review':
      return 'warning';
    case 'Draft':
      return 'warning';
    default:
      return 'muted';
  }
};

export const getSeverityColorWithMark = (
  severity:
    | components['schemas']['Incidents']['severity']
    | components['schemas']['CorrectiveActions']['priority'],
): {color: ColorVariant; mark: string} => {
  switch (severity) {
    case 'Critical':
      return {color: 'danger', mark: '!!!!'};
    case 'Major':
      return {color: 'warning', mark: '!!!'};
    case 'Moderate':
      return {color: 'warningLight', mark: '!!'};

    case 'Low':
      return {color: 'success', mark: '!'};
    case 'Medium':
      return {color: 'warningLight', mark: '!!'};
    case 'High':
      return {color: 'warning', mark: '!!!'};
    case 'Urgent':
      return {color: 'danger', mark: '!!!!'};

    default:
      return {color: 'default', mark: '-'};
  }
};

export const getQueryParamMap = (activeTab: number): Record<string, string> => {
  const fullQueryParamMap = {
    'All statuses': 'status',
    'Incident types': 'incidentTypeId',
    'Attention Needed': 'attentionNeeded',
    Departments: 'departmentId',
    'Due in': 'dueDays',
    Assignee: 'assign',
    Priorities: 'priority',
    Severities: 'severity',
    search: 'search',
  };

  if (activeTab === 0) {
    const {
      ['Attention Needed']: _,
      ['Priorities']: __,
      ...rest
    } = fullQueryParamMap;
    return rest;
  } else if (activeTab === 1) {
    const {
      ['Incident types']: _,
      ['Severities']: __,
      ...rest
    } = fullQueryParamMap;
    return rest;
  }

  return fullQueryParamMap;
};

export const getQueryParamCorrectiveAction = (
  activeTab: number,
): Record<string, string> => {
  const fullQueryParamMap = {
    'All statuses': 'status',
    'Attention Needed': 'attentionNeeded',
    Departments: 'departmentId',
    'Due in': 'dueInDays',
    Assignee: 'assign',
    Priorities: 'priority',
    search: 'search',
  };

  if (activeTab === 0) {
    const {
      ['Attention Needed']: _,
      ['Due in']: __,
      ...rest
    } = fullQueryParamMap;
    return rest;
  } else if (activeTab === 1) {
    const {['Departments']: _, ['Assignee']: __, ...rest} = fullQueryParamMap;
    return rest;
  }

  return fullQueryParamMap;
};

export async function downloadFile(file: any) {
  try {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      return {
        success: false,
        message: 'Storage permission is required to download files',
      };
    }

    const isLocalFile =
      file.uri &&
      (file.uri.startsWith('file://') || file.uri.startsWith('content://'));
    const isRemoteUrl =
      (file.uri || file.url) &&
      (file.uri?.startsWith('http') || file.url?.startsWith('http'));

    let fileUrl = file.uri || file.url || file.path;
    if (!fileUrl) {
      throw new Error('Invalid file URL - URL is missing');
    }

    const timestamp = new Date().getTime();
    let originalName = file.fileName || file.name || 'file';

    originalName = originalName.replace(/[^a-zA-Z0-9\-._]/g, '_');

    let extension =
      file.extension || originalName.split('.').pop()?.toLowerCase();

    if (!extension) {
      if (file.type) {
        const mimeToExt: Record<string, string> = {
          'application/pdf': 'pdf',
          'application/msword': 'doc',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            'docx',
          'application/vnd.ms-excel': 'xls',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            'xlsx',
          'application/vnd.ms-powerpoint': 'ppt',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            'pptx',
          'text/plain': 'txt',
          'image/jpeg': 'jpg',
          'image/png': 'png',
          'image/gif': 'gif',
          'video/mp4': 'mp4',
          'video/quicktime': 'mov',
          'audio/mpeg': 'mp3',
        };

        extension = mimeToExt[file.type] || 'bin';
      } else if (fileUrl.includes('.')) {
        const urlParts = fileUrl.split('/').pop()?.split('.') || [];
        if (urlParts.length > 1) {
          extension = urlParts.pop()?.split('?')[0] || 'bin';
        }
      } else {
        extension = 'bin';
      }
    }

    const baseName = originalName.split('.')[0];
    const fileName = `${baseName}_${timestamp}.${extension}`;

    const downloadPath = Platform.select({
      ios: `${RNFS.DocumentDirectoryPath}/${fileName}`,
      android: `${RNFS.DownloadDirectoryPath}/EHSApp/${fileName}`,
    });

    if (!downloadPath) {
      throw new Error('Could not determine download path');
    }

    if (Platform.OS === 'android') {
      const dirPath = `${RNFS.DownloadDirectoryPath}/EHSApp`;
      const dirExists = await RNFS.exists(dirPath);
      if (!dirExists) {
        await RNFS.mkdir(dirPath);
      }
    }

    if (isLocalFile) {
      await RNFS.copyFile(fileUrl, downloadPath);
    } else if (isRemoteUrl) {
      if (!fileUrl.startsWith('http://') && !fileUrl.startsWith('https://')) {
        fileUrl = `https://${fileUrl}`;
      }

      const response = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: downloadPath,
        background: true,
        progress: res => {
          console.log(
            `Download progress: ${res.bytesWritten}/${res.contentLength}`,
          );
        },
      }).promise;

      if (response.statusCode !== 200) {
        throw new Error(`Download failed with status: ${response.statusCode}`);
      }
    } else {
      throw new Error(
        'Unsupported file type - must be either local file or remote URL',
      );
    }

    const isMediaFile =
      file.type?.startsWith('image/') ||
      file.type?.startsWith('video/') ||
      ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov'].includes(extension);

    if (isMediaFile) {
      try {
        const fileExists = await RNFS.exists(downloadPath);
        console.log('File exists check:', {
          downloadPath,
          fileExists,
          fileSize: fileExists ? await RNFS.stat(downloadPath) : 'N/A',
        });

        if (!fileExists) {
          throw new Error(
            'Downloaded file does not exist at path: ' + downloadPath,
          );
        }

        let mediaType = file.type;
        if (!mediaType) {
          if (['mp4', 'mov'].includes(extension)) {
            mediaType = 'video/mp4';
          } else if (['jpg', 'jpeg'].includes(extension)) {
            mediaType = 'image/jpeg';
          } else if (extension === 'png') {
            mediaType = 'image/png';
          } else if (extension === 'gif') {
            mediaType = 'image/gif';
          }
        }

        console.log('Media type detection:', {
          originalType: file.type,
          detectedType: mediaType,
          extension,
        });

        if (Platform.OS === 'android') {
          await CameraRoll.saveAsset(`file://${downloadPath}`, {
            type: mediaType?.startsWith('video/') ? 'video' : 'photo',
            album: 'EHSApp',
          });
        } else {
          const iosPath = downloadPath.startsWith('file://')
            ? downloadPath
            : `file://${downloadPath}`;
          console.log('iOS save attempt:', {
            originalPath: downloadPath,
            iosPath,
          });

          try {
            const fileStats = await RNFS.stat(downloadPath);
            console.log('File stats:', fileStats);

            if (fileStats.size === 0) {
              throw new Error('File is empty');
            }

            await CameraRoll.saveAsset(iosPath, {
              type: mediaType?.startsWith('video/') ? 'video' : 'photo',
              album: 'EHSApp',
            });
          } catch (firstError: any) {
            Sentry.captureException(firstError);

            console.log('First iOS save attempt failed:', firstError.message);

            try {
              await CameraRoll.saveAsset(iosPath, {
                type: mediaType?.startsWith('video/') ? 'video' : 'photo',
              });
            } catch (secondError: any) {
              Sentry.captureException(secondError);

              console.log(
                'Second iOS save attempt failed:',
                secondError.message,
              );

              if (extension === 'mp4' || mediaType?.includes('video')) {
                try {
                  await CameraRoll.saveAsset(iosPath, {
                    type: 'video',
                  });
                } catch (thirdError: any) {
                  Sentry.captureException(thirdError);

                  console.log(
                    'Third iOS save attempt failed:',
                    thirdError.message,
                  );
                  throw thirdError;
                }
              } else {
                throw secondError;
              }
            }
          }
        }

        return {
          success: true,
          message: 'File saved successfully',
          path: downloadPath,
          isMedia: true,
          savedToGallery: true,
        };
      } catch (saveError: any) {
        Sentry.captureException(saveError);

        console.error('Save to gallery error:', saveError);
        console.error('Error details:', {
          platform: Platform.OS,
          downloadPath,
          fileType: file.type,
          extension,
          errorMessage: saveError.message,
          errorStack: saveError.stack,
        });

        return {
          success: true,
          message: 'File downloaded but could not save to gallery',
          path: downloadPath,
          isMedia: true,
          savedToGallery: false,
        };
      }
    } else {
      // Non-media files: on iOS prompt user to save to Files
      if (Platform.OS === 'ios') {
        try {
          const url = downloadPath.startsWith('file://')
            ? downloadPath
            : `file://${downloadPath}`;
          await Share.open({
            url,
            saveToFiles: true,
            type: file.type || undefined,
            failOnCancel: false,
          });
        } catch (e) {
          // user cancelled share sheet
        }
      }
      return {
        success: true,
        message: 'File downloaded successfully',
        path: downloadPath,
        isMedia: false,
        savedToGallery: false,
      };
    }
  } catch (error: any) {
    Sentry.captureException(error);

    console.error('Download error:', error);
    return {
      success: false,
      message: `Failed to download file: ${error.message}`,
      error: error,
    };
  }
}

export function enumToDropdownArray(
  enumObject: Record<string, string>,
  rejectKeys: string[] = [],
) {
  return Object.values(enumObject)
    .filter(value => !rejectKeys.includes(value))
    .map(value => ({
      label: value,
      value: value,
    }));
}

export const clearAppStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared');
  } catch (error) {
    Sentry.captureException(error);
    console.log('Failed to clear AsyncStorage:', error);
    throw error;
  }
};

const isObject = (obj: any) => obj !== null && typeof obj === 'object';

export function isChanged(obj1: any, obj2: any): boolean {
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 !== obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return true;

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    const bothAreObjects = isObject(val1) && isObject(val2);

    if (bothAreObjects && isChanged(val1, val2)) {
      return true;
    }

    if (!bothAreObjects && val1 !== val2) {
      return true;
    }
  }

  return false;
}

export const cleanPayload = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return Boolean(value);
    }),
  );
};

export const useLogout = () => {
  const navigation = useNavigation<Navigation>();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await clearAppStorage();
      dispatch(clearUserData());
      dispatch({type: 'LOGOUT'});

      navigation.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
    } catch (err) {
      Sentry.captureException(err);

      console.log('Logout error:', err);
    }
  };

  return logout;
};

export const forceLogout = async (dispatchCallback?: () => void) => {
  try {
    await clearAppStorage();
    if (dispatchCallback) {
      dispatchCallback();
    }
  } catch (err) {
    Sentry.captureException(err);
    console.log('Force logout error:', err);
  }
};
