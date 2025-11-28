import React, { useState } from 'react';
import {
  View,
  Image,
  Alert,
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { shadows } from '../../theme/shadows';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';
import TextComp from '../TextComp';
import ModalComp from '../ModalComp';
import CustomAlert from '../CustomAlert';
import { openFiles } from '../../utils/HelperFunctions/filePickerHelper.ts';
import { SelectedFileView } from './SelectedFileView.tsx';
import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import * as Sentry from '@sentry/react-native';

interface TextInputCompProps {
  textInputStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholderText?: string;
  uploadedImages?: any;
  selectedFiles?: any[];
  light?: boolean;
  enableStorage?: boolean;
  allowFiles?: string[];
  onImageChanges: (images: any[]) => void;
  handleRemoveClick?: (file: any) => void;
}

const UploadImageComp = ({
  light = false,
  enableStorage = false,
  selectedFiles = [],
  uploadedImages = [],
  allowFiles = ['.png', '.jpg/.jpeg', '.mp4', '.gif'],
  onImageChanges,
  handleRemoveClick,
}: TextInputCompProps) => {
  const theme = light ? 'light' : useTheme();
  const colors = getColors(theme);
  const isDark = theme === 'dark';
  const styles = createStyleSheet(colors, isDark);

  const [files, setFiles] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const requestCameraPermissions = async () => {
    console.log('🔐 Starting permission request...');

    if (Platform.OS === 'android') {
      const permissions = [PermissionsAndroid.PERMISSIONS.CAMERA];
      const results = await PermissionsAndroid.requestMultiple(permissions);
      const hasAllPermissions = Object.values(results).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED,
      );
      console.log('🔐 Android permission results:', results);
      console.log('🔐 Android has all permissions:', hasAllPermissions);
      return hasAllPermissions;
    } else {
      try {
        const cameraStatus = await request(PERMISSIONS.IOS.CAMERA);
        console.log(`📱 iOS Camera status: ${cameraStatus}`);
        return cameraStatus;
      } catch (error) {
        Sentry.captureException(error);
        console.log('🔐 Error requesting iOS permissions:', error);
        return false;
      }
    }
  };

  const requestVideoPermissions = async () => {
    console.log('🔐 Starting permission request...');

    if (Platform.OS === 'android') {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ];

      const results = await PermissionsAndroid.requestMultiple(permissions);

      const hasAllPermissions = Object.values(results).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED,
      );

      console.log('🔐 Android permission results:', results);
      console.log('🔐 Android has all permissions:', hasAllPermissions);
      return hasAllPermissions;
    } else {
      try {
        const cameraStatus = await request(PERMISSIONS.IOS.CAMERA);
        console.log(`📱 iOS Camera status: ${cameraStatus}`);
        const micStatus = await request(PERMISSIONS.IOS.MICROPHONE);
        console.log('📷 iOS mic permission check:', micStatus);
        return cameraStatus && micStatus;
      } catch (error) {
        Sentry.captureException(error);
        console.log('🔐 Error requesting iOS permissions:', error);
        return false;
      }
    }
  };

  const isValidFileSize = (file: any): boolean => {
    const fileSize = file.fileSize || file.size || 0;
    const sizeInMB = fileSize / (1024 * 1024);

    console.log('📱 File size validation for:', {
      fileName: file.fileName || file.name,
      fileSize: fileSize,
      sizeInMB: sizeInMB,
      type: file.type,
      originalFileSize: file.fileSize,
      originalSize: file.size,
    });

    if (file.type?.startsWith('image/')) {
      return sizeInMB <= 5;
    }
    if (file.type?.startsWith('video/')) {
      return sizeInMB <= 50;
    }
    return false;
  };

  const openGallery = async () => {
    const timeoutId = setTimeout(() => {
      console.log('Image picker timeout - taking too long to respond');
    }, 10000);

    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 3 - uploadedImages.length,
      },
      (response: any) => {
        clearTimeout(timeoutId);
        setModalVisible(false);

        if (response.didCancel) return;

        if (response.errorCode) {
          console.log(
            'Image picker error:',
            response.errorCode,
            response.errorMessage,
          );
          setAlertError(response.errorMessage || 'Something went wrong');
          setShowAlert(true);
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const rejected = response.assets.find(
            (file: any) => !isValidFileSize(file),
          );

          if (rejected) {
            const type = rejected.type?.startsWith('image') ? 'Image' : 'Video';
            setAlertError(
              `${type} must be under ${type === 'Image' ? '5MB' : '50MB'}.`,
            );
            setShowAlert(true);
            return;
          }

          const imageAssets = response.assets.filter((a: any) =>
            a.type?.startsWith('image'),
          );
          const videoAssets = response.assets.filter((a: any) =>
            a.type?.startsWith('video'),
          );
          const files = [...imageAssets, ...videoAssets].slice(0, 3);

          onImageChanges([...uploadedImages, ...files]);
        }
      },
    );
  };

  const openCamera = async () => {
    if (uploadedImages.length >= 3) return;

    const granted = await requestCameraPermissions();
    if (!granted) {
      Alert.alert('Camera permission is required');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
      },
      response => {
        setModalVisible(false);
        if (response.didCancel) return;
        if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          if (!isValidFileSize(asset)) {
            setAlertError('Image exceeds the 5MB size limit.');
            setShowAlert(true);
            return;
          }

          if (uploadedImages.length >= 3) {
            setAlertError('Files limit exceed.');
            setShowAlert(true);
          } else {
            onImageChanges([...uploadedImages, asset]);
          }
        }
      },
    );
  };

  const openVideo = async () => {
    if (uploadedImages.length >= 3) return;

    const granted = await requestVideoPermissions();

    if (!granted) {
      Alert.alert('Camera permission is required');
      return;
    }

    launchCamera(
      {
        mediaType: 'video',
        videoQuality: 'high',
        durationLimit: 60,
        saveToPhotos: false,
      },
      response => {
        setModalVisible(false);

        console.log('📱 Camera response received:', response);

        if (response.didCancel) {
          console.log('📱 User cancelled camera');
          return;
        }

        if (response.errorCode) {
          console.log(
            '📱 Camera error:',
            response.errorCode,
            response.errorMessage,
          );
          setAlertError(
            `Camera error: ${response.errorMessage || response.errorCode}`,
          );
          setShowAlert(true);
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const newVideo = response.assets[0];
          console.log('📱 Video asset received:', newVideo);
          console.log('📱 Video asset structure:', {
            fileName: newVideo.fileName,
            fileSize: newVideo.fileSize,
            size: newVideo.size,
            type: newVideo.type,
            uri: newVideo.uri?.substring(0, 50) + '...',
            duration: newVideo.duration,
            width: newVideo.width,
            height: newVideo.height,
          });

          const processedVideo = {
            ...newVideo,
            fileName: newVideo.fileName || `video_${Date.now()}.mp4`,
            type: newVideo.type || 'video/mp4',
            fileSize: newVideo.fileSize || newVideo.size || 0,
          };

          console.log('📱 Processed video:', processedVideo);

          if (!isValidFileSize(processedVideo)) {
            setAlertError('Video exceeds the 50MB size limit.');
            setShowAlert(true);
            return;
          }

          if (uploadedImages.length >= 3) {
            setAlertError('Files limit exceed.');
            setShowAlert(true);
          } else {
            console.log('📱 Adding processed video to uploaded images');
            console.log(
              '📱 Current uploaded images count:',
              uploadedImages.length,
            );
            console.log('📱 Current uploaded images:', uploadedImages);
            console.log('📱 New array to pass:', [
              ...uploadedImages,
              processedVideo,
            ]);

            onImageChanges([...uploadedImages, processedVideo]);

            console.log('📱 Video added successfully - callback called');
          }
        } else {
          console.log('📱 No assets in response');
        }
      },
    );
  };

  const removeImage = (fileName: string, type: string, uri?: string) => {
    const filteredFiles = uploadedImages.filter(
      (item: any) => item.fileName !== fileName || item.uri !== uri,
    );
    onImageChanges(filteredFiles);
  };

  const removeSelectedFile = (fileToRemove: any) => {
    const filteredFiles = selectedFiles.filter(
      (item: any) => item.uri !== fileToRemove.uri,
    );
    onImageChanges(filteredFiles);
  };

  const renderImageItem = (item: any, index: number) => {
    const fileName = item.fileName || 'image.jpg';
    const displayName =
      fileName.length > 20
        ? `${fileName.substring(0, 15)}...${fileName.substring(
          fileName.length - 5,
        )}`
        : fileName;

    const isVideo =
      item.mediaType === 'video/mp4' || item.type?.startsWith('video/');

    return (
      <View key={index} style={styles.imageItem}>
        <Image
          source={
            isVideo
              ? require('../../assets/icons/player-icon.png')
              : { uri: item.uri }
          }
          style={[
            styles.thumbnail,
            {
              tintColor: isVideo ? colors.primary : undefined,
            },
          ]}
        />
        <TextComp style={styles.imageName} numberOfLines={1}>
          {displayName}
        </TextComp>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.removeButton]}
            onPress={() => removeImage(fileName, item.type, item.uri)}>
            <TextComp fontSize={16} style={styles.actionButtonText}>
              ×
            </TextComp>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const filesFromStorage = async () => {
    try {
      console.log('📱 Starting file selection from storage...');
      console.log('📱 Platform:', Platform.OS);
      console.log('📱 Current selected files count:', selectedFiles.length);
      console.log('📱 Enable storage:', enableStorage);
      const isIPad = Platform.OS === 'ios' && Platform.isPad;
      console.log('📱 Is iPad:', isIPad);

      const { success, files, message } = await openFiles(3);

      console.log('📱 File selection result:', {
        success,
        message,
        fileCount: files?.length,
      });

      if (success && files && files.length > 0) {
        console.log('📱 Adding files to selection:', files);
        onImageChanges(files);
      } else {
        console.log('📱 File selection failed or no files selected');
        if (message) {
          setAlertError(message);
          setShowAlert(true);
        }
      }
    } catch (error) {
      Sentry.captureException(error);
      console.log('📱 Error in filesFromStorage:', error);
      setAlertError('Failed to open file picker. Please try again.');
      setShowAlert(true);
    }
  };

  return (
    <View>
      <CustomAlert
        visible={showAlert}
        variant={'error'}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
      {enableStorage ? (
        <>
          {[...selectedFiles].length > 0 && (
            <View style={styles.imageList}>
              {selectedFiles.map((item, index) => (
                <SelectedFileView
                  handleRemoveClick={() =>
                    handleRemoveClick
                      ? handleRemoveClick(item)
                      : removeSelectedFile(item)
                  }
                  key={index}
                  item={item}
                />
              ))}
            </View>
          )}
        </>
      ) : (
        <>
          {uploadedImages.length > 0 && (
            <View style={styles.imageList}>
              {uploadedImages.map((item: any, index: number) =>
                renderImageItem(item, index),
              )}
            </View>
          )}
        </>
      )}
      {selectedFiles && selectedFiles.length < 3 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            if (enableStorage) {
              if (!selectedFiles || selectedFiles.length < 3) {
                filesFromStorage();
              }
              return;
            }
            setModalVisible(true);
          }}
          disabled={
            uploadedImages.length >= 3 ||
            (enableStorage && selectedFiles.length >= 3)
          }>
          <Image
            style={styles.imageStyle}
            source={require('../../assets/icons/upload.png')}
          />
          <View style={styles.textView}>
            <TextComp bold>
              {enableStorage ? 'Select Files' : 'Select Image/Video Source'}
            </TextComp>
            {enableStorage ? (
              <TextComp
                fontSize={12}
                color={selectedFiles.length >= 3 ? 'danger' : 'default'}>
                {3 - selectedFiles.length === 0
                  ? 'Slots are filled'
                  : `${3 - selectedFiles.length} ${3 - selectedFiles.length === 1 ? 'slot' : 'slots'
                  } available`}
              </TextComp>
            ) : (
              <TextComp fontSize={12}>
                {3 - uploadedImages.length === 0
                  ? 'Slots are filled'
                  : `${3 - uploadedImages.length} ${3 - uploadedImages.length === 1 ? 'slot' : 'slots'
                  } available`}
              </TextComp>
            )}
            <TextComp style={{ textAlign: 'center' }} fontSize={12}>
              Supported: {allowFiles.join(', ')}
            </TextComp>
            {enableStorage && Platform.OS === 'android' && (
              <TextComp
                style={{ textAlign: 'center' }}
                fontSize={10}
                color="muted">
                Tap to select files from your device
              </TextComp>
            )}
            {uploadedImages.length >= 3 && (
              <TextComp fontSize={12} color={'danger'}>
                Maximum limit reached (3/3)
              </TextComp>
            )}
          </View>
        </TouchableOpacity>
      )}

      <ModalComp
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <TextComp bold>Select Image Source</TextComp>
          <TextComp style={styles.remainingText}>
            {3 - uploadedImages.length} image slots remaining
          </TextComp>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={openCamera}
              disabled={uploadedImages.length >= 3}>
              <Image
                source={require('./../../assets/icons/camera-icon.png')}
                style={[styles.icon, { width: 20, height: 20 }]}
              />
              <TextComp>Camera</TextComp>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={openGallery}
              disabled={uploadedImages.length >= 3}>
              <Image
                source={require('./../../assets/icons/gallery-icon.png')}
                style={styles.icon}
              />
              <TextComp>Gallery</TextComp>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={openVideo}
              disabled={uploadedImages.length >= 3}>
              <Image
                source={require('./../../assets/icons/video-icon.png')}
                style={styles.icon}
              />
              <TextComp>Video</TextComp>
            </TouchableOpacity>
          </View>
        </View>
      </ModalComp>
    </View>
  );
};

const createStyleSheet = (colors: ColorPalette, isDark: boolean) => {
  return StyleSheet.create({
    input: {
      alignItems: 'center',
      backgroundColor: colors.secondaryBackground,
      borderColor: colors.muted15,
      borderRadius: 10,
      borderWidth: 1,
      color: colors.default,
      fontSize: 16,
      marginTop: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      width: '100%',
      ...(isDark ? {} : shadows.textInput),
    },
    imageStyle: {
      height: 50,
      width: 50,
    },
    textView: {
      gap: 5,
      alignItems: 'center',
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 8,
      tintColor: colors.default,
    },
    modalContent: {
      backgroundColor: colors.background,
      padding: 20,
      borderRadius: 16,
      width: 280,
      alignItems: 'center',
    },
    buttonRow: {
      marginTop: 20,
      gap: 4,
      width: '100%',
    },
    optionButton: {
      padding: 12,
      marginHorizontal: 5,
      flexDirection: 'row',
      backgroundColor: colors.muted35,
      borderRadius: 8,
      alignItems: 'center',
    },
    imageList: {
      marginTop: 10,
      gap: 8,
    },
    imageItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      backgroundColor: colors.secondaryBackground,
      borderRadius: 8,
    },
    thumbnail: {
      width: 40,
      height: 40,
      borderRadius: 4,
      marginRight: 10,
    },
    imageName: {
      flex: 1,
      marginRight: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    downloadButton: {
      backgroundColor: colors.primary,
    },
    removeButton: {
      backgroundColor: colors.danger,
    },
    actionButtonText: {
      color: colors.white,
      marginBottom: 2,
      lineHeight: 20,
    },
    remainingText: {
      marginTop: 5,
      color: colors.muted,
      fontSize: 12,
    },
  });
};

export default UploadImageComp;
