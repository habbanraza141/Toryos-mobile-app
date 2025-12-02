import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ModalComp from '../ModalComp';
import TextComp from '../TextComp';
import { ColorPalette, getColors } from '../../theme/colors';
import { useTheme } from '../../hooks/useTheme';

interface PostOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onBookmark?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const PostOptionsModal: React.FC<PostOptionsModalProps> = ({
  visible,
  onClose,
  onBookmark,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);

  return (
    <ModalComp
      isVisible={visible}
      onClose={onClose}
      backdropOpacity={0.5}
      style={styles.modalContainer}
    >
      <View style={styles.content}>
        {onBookmark && (
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              onBookmark();
              onClose();
            }}
          >
            <TextComp style={styles.icon}>🔖</TextComp>
            <TextComp style={styles.optionText}>Bookmark</TextComp>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            onEdit();
            onClose();
          }}
        >
          <TextComp style={styles.icon}>✏️</TextComp>
          <TextComp style={styles.optionText}>Edit post</TextComp>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            onDelete();
            onClose();
          }}
        >
          <TextComp style={styles.icon}>🗑️</TextComp>
          <TextComp style={[styles.optionText, styles.deleteText]}>Delete post</TextComp>
        </TouchableOpacity>
      </View>
    </ModalComp>
  );
};

const createStyleSheet = (colors: ColorPalette) => {
  return StyleSheet.create({
    modalContainer: {
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      paddingTop: 100,
      paddingRight: 20,
    },
    content: {
      backgroundColor: colors.secondaryBackground,
      borderRadius: 12,
      paddingVertical: 8,
      minWidth: 200,
      gap: 4,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 12,
    },
    icon: {
      fontSize: 20,
    },
    optionText: {
      fontSize: 16,
      color: colors.default,
    },
    deleteText: {
      color: colors.danger,
    },
  });
};

export default PostOptionsModal;

