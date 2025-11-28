import { pick } from '@react-native-documents/picker';
import { Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { allowedExtensions } from '../Constants';
import * as Sentry from '@sentry/react-native';


const fallbackFilePicker = async (maxCount: number = 3) => {
  try {
    console.log('📁 Using fallback file picker...');

    const result = await new Promise((resolve, reject) => {
      launchImageLibrary(
        {
          mediaType: 'mixed',
          selectionLimit: maxCount,
          includeBase64: false,
          quality: 1,
        },
        response => {
          if (response.didCancel) {
            resolve({
              success: false,
              files: [],
              message: 'Selection cancelled',
            });
            return;
          }

          if (response.errorCode) {
            reject(new Error(response.errorMessage || 'Image picker error'));
            return;
          }

          if (response.assets && response.assets.length > 0) {
            const files = response.assets.map(asset => ({
              uri: asset.uri,
              name:
                asset.fileName ||
                `file_${Date.now()}.${asset.type?.split('/')[1] || 'unknown'}`,
              type: asset.type,
              size: asset.fileSize,
            }));

            resolve({
              success: true,
              files,
              message: 'Files selected successfully',
            });
          } else {
            resolve({ success: false, files: [], message: 'No files selected' });
          }
        },
      );
    });

    return result;
  } catch (error) {
    console.error('📁 Fallback picker error:', error);
    Sentry.captureException(error)

    return {
      success: false,
      files: [],
      message:
        error instanceof Error ? error.message : 'Fallback picker failed',
    };
  }
};

export const openFiles = async (
  maxCount: number = 3,
  restrictToDocuments?: boolean,
) => {
  try {
    console.log('📁 Starting file picker on platform:', Platform.OS);
    console.log('📁 Max count:', maxCount);

    // Configure picker options with better iPad support
    const pickerOptions = {
      mode: 'open' as const,
      type: restrictToDocuments
        ? [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'com.adobe.pdf',
          'com.microsoft.word.doc',
          'org.openxmlformats.wordprocessingml.document',
        ]
        : [
          'image/png',
          'image/jpeg',
          'image/jpg',
          'video/mp4',
          'image/gif',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          // Add more generic types for better iPad compatibility
          'public.image',
          'public.movie',
          'public.data',
          'public.content',
        ],
      allowMultiSelection: true,
      selectionLimit: maxCount,
      // Add iPad-specific options
      ...(Platform.OS === 'ios' && {
        presentationStyle: 'formSheet' as const,
        allowsEditing: false,
      }),
    };

    console.log('📁 Picker options:', pickerOptions);

    const files = await pick(pickerOptions);

    console.log('📁 Files picked:', files);
    console.log('📁 Number of files:', files.length);

    if (!files || files.length === 0) {
      console.log('📁 No files selected');
      return {
        message: 'No files were selected.',
        success: false,
        files: [],
      };
    }

    const filteredFiles = files.filter(file => {
      const ext = file.name?.split('.').pop()?.toLowerCase();
      const isValid = ext && allowedExtensions.includes(ext);
      return isValid;
    });

    if (filteredFiles.length === 0) {
      return {
        message:
          'Only specific file types are allowed: ' +
          allowedExtensions.join(', '),
        success: false,
        files: [],
      };
    }

    if (filteredFiles.length > maxCount) {
      return {
        message: `You can only select up to ${maxCount} files.`,
        success: false,
        files: filteredFiles.slice(0, maxCount).map(file => ({
          uri: file.uri,
          name: file.name,
          type: file.type,
          size: file.size,
        })),
      };
    }

    const result = {
      success: true,
      files: filteredFiles,
      message: 'Files picked successfully.',
    };

    return result;
  } catch (error) {
    Sentry.captureException(error)

    if (Platform.OS === 'ios') {
      const fallbackResult = await fallbackFilePicker(maxCount);

      if (fallbackResult.success) {
        const filteredFiles = fallbackResult.files.filter(file => {
          const ext = file.name?.split('.').pop()?.toLowerCase();
          return ext && allowedExtensions.includes(ext);
        });

        if (filteredFiles.length > 0) {
          return {
            success: true,
            files: filteredFiles.slice(0, maxCount),
            message: 'Files selected using alternative method.',
          };
        }
      }
    }

    let errorMessage = 'Failed to pick documents.';

    if (error instanceof Error) {
      if (
        error.message.includes('cancelled') ||
        error.message.includes('canceled')
      ) {
        errorMessage = 'File selection was cancelled.';
      } else if (error.message.includes('permission')) {
        errorMessage = 'Permission denied. Please check app permissions.';
      } else if (error.message.includes('unavailable')) {
        errorMessage = 'Document picker is not available on this device.';
      } else {
        errorMessage = `Error: ${error.message}`;
      }
    }

    return {
      message: errorMessage,
      success: false,
      files: [],
    };
  }
};
