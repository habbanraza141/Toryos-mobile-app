import {
  PermissionsAndroid as AndroidPermissions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import RNFS from 'react-native-fs';
import { requestStoragePermission } from './permissions';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import * as Sentry from '@sentry/react-native';


export async function downloadFile(file: any) {
  try {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      return {
        success: false,
        message: 'Storage permission is required to download files',
      };
    }

    if (file.content) {
      const timestamp = new Date().getTime();
      let originalName = file.fileName || 'file';

      const baseName = originalName.split('.')[0];
      const extension = originalName.split('.').pop() || '';
      const uniqueFileName = extension
        ? `${baseName}_${timestamp}.${extension}`
        : `${baseName}_${timestamp}`;

      const downloadPath = Platform.select({
        ios: `${RNFS.DocumentDirectoryPath}/${uniqueFileName}`,
        android: `${RNFS.DownloadDirectoryPath}/EHSApp/${uniqueFileName}`,
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

      const encoding = file.encoding || (file.isBase64 ? 'base64' : 'utf8');
      await RNFS.writeFile(downloadPath, file.content, encoding);

      return {
        success: true,
        message: 'File downloaded successfully',
        path: downloadPath,
        isMedia: false,
        savedToGallery: false,
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
      file.extension || originalName.split('.').pop()?.toLowerCase() || '';

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
          'text/csv': 'csv',
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

      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw new Error(`Download failed with status ${response.statusCode}`);
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
              Sentry.captureException(firstError) 
            console.log('First iOS save attempt failed:', firstError.message);

            try {
              await CameraRoll.saveAsset(iosPath, {
                type: mediaType?.startsWith('video/') ? 'video' : 'photo',
              });
            } catch (secondError: any) {
              Sentry.captureException(secondError) 

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
                                Sentry.captureException(thirdError) 
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
                                Sentry.captureException(saveError) 
        
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
      return {
        success: true,
        message: 'File downloaded successfully',
        path: downloadPath,
        isMedia: false,
        savedToGallery: false,
      };
    }
  } catch (error: any) {
                                Sentry.captureException(error) 
    console.error('Download error:', error);
    return {
      success: false,
      message: `Failed to download file: ${error.message}`,
      error: error,
    };
  }
}
