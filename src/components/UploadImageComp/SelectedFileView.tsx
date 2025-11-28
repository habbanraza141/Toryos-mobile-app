import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';
import { shadows } from '../../theme/shadows';
import TextComp from '../TextComp';

export const SelectedFileView = ({
  item,
  handleRemoveClick,
}: {
  item: any;
  handleRemoveClick?: () => void;
}) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const isDark = theme === 'dark';
  const styles = createStyleSheet(colors, isDark);

  const fileName = item.name || item.fileName || 'unknown.file';
  const displayName =
    fileName.length > 20
      ? `${fileName.substring(0, 15)}...${fileName.substring(
        fileName.length - 5,
      )}`
      : fileName;

  const mime = item.type || '';
  const isImage = mime.startsWith('image/');
  const isVideo = mime.startsWith('video/');
  const isPDF = mime === 'application/pdf';
  const isDOC =
    mime === 'application/msword' ||
    mime ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document';



  let preview = null;

  if (isImage) {
    preview = (
      <Image
        source={{ uri: item.uri }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
    );
  } else if (isVideo) {
    preview = (
      <Image
        source={require('./../../assets/icons/player-icon.png')}
        style={styles.thumbnail}
        resizeMode="contain"
      />
    );
  } else if (isPDF) {
    preview = (
      <Image
        source={require('./../../assets/icons/pdf.png')}
        style={styles.thumbnail}
        resizeMode="contain"
      />
    );
  } else if (isDOC) {
    preview = (
      <Image
        source={require('./../../assets/icons/doc.png')}
        style={styles.thumbnail}
        resizeMode="contain"
      />
    );
  } else {
    preview = (
      <Image
        source={require('./../../assets/icons/docx.png')}
        style={styles.thumbnail}
        resizeMode="contain"
      />
    );
  }

  return (
    <>
      <View
        style={[styles.imageItem, item.error && { borderColor: colors.danger }]}>
        {preview}
        <TextComp style={styles.imageName} numberOfLines={1}>
          {displayName}
        </TextComp>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.removeButton]}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={handleRemoveClick}>
            <TextComp fontSize={16} style={styles.actionButtonText}>
              ×
            </TextComp>
          </TouchableOpacity>
        </View>
      </View>
      {item.error && (
        <TextComp fontSize={12} color="danger">
          {item.errorMessage}
        </TextComp>
      )}
    </>
  );
};

const createStyleSheet = (colors: ColorPalette, isDark: boolean) => {
  return StyleSheet.create({
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
      borderWidth: 0.8,
      borderColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 4,
      backgroundColor: colors.secondaryBackground,
      borderRadius: 8,
    },
    thumbnail: {
      width: 34,
      height: 34,
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
