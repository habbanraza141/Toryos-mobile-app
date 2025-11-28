import React, { ReactNode, useState } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  UIManager,
  Image,
  TextStyle,
  StyleProp,
} from 'react-native';
import { ColorPalette, getColors } from '../../theme/colors';
import { useTheme } from '../../hooks/useTheme';
import { shadows } from '../../theme/shadows';
import TextComp from '../TextComp';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  children?: ReactNode;
  question: string;
  answer?: string;
  testID?: string;
  questionTextStyle?: StyleProp<TextStyle>;
  isWithout?: boolean;
  isChild?: boolean;
};

const SimpleAccordion: React.FC<Props> = ({
  question,
  answer,
  testID,
  isWithout,
  questionTextStyle,
  isChild,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);

  const theme = useTheme();
  const isDark = theme === 'dark';
  const colors = getColors(theme);
  const styles = createStyleSheet(colors, isDark);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View
      style={[
        styles.mainContainer,
        isWithout && { paddingVertical: 0, paddingHorizontal: 0 },
      ]}>
      <View
        style={[
          styles.container,
          isWithout && {
            paddingVertical: 15,
            paddingHorizontal: 15,
            borderRadius: 10,
          },
        ]}
        testID={testID}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.header,
            isWithout && { justifyContent: 'space-between' },
          ]}
          onPress={toggleExpand}
          testID={`${testID}-header`}>
          {!isWithout && (
            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/icons/cross.png')}
                style={styles.icon}
                accessibilityLabel={expanded ? 'Collapse' : 'Expand'}
              />
            </View>
          )}

          <TextComp
            style={[styles.questionText, questionTextStyle]}
            fontSize={isWithout ? 16 : 14}
            lineHeight={19.2}
            bold>
            {question}
          </TextComp>

          {isWithout && (
            <View style={styles.iconContainer}>
              <Image
                source={expanded
                  ? ''
                  : require('../../assets/icons/dropdown.png')
                }
                style={styles.icon2}
                accessibilityLabel={expanded ? 'Collapse' : 'Expand'}
              />
            </View>
          )}
        </TouchableOpacity>

        {expanded && (
          <View style={styles.content} testID={`${testID}-content`}>
            {isChild ? (
              <View>{children}</View>
            ) : (
              <TextComp fontSize={14} lineHeight={16.8}>
                {answer}
              </TextComp>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const createStyleSheet = (colors: ColorPalette, isDark: boolean) => {
  return StyleSheet.create({
    mainContainer: {
      paddingHorizontal: 25,
      paddingVertical: 10,
    },
    container: {
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.secondaryBackground,
      borderWidth: 1,
      borderColor: colors.muted15,
      overflow: 'hidden',
      ...(isDark ? {} : shadows.button),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    questionText: {
      flex: 1,
      marginRight: 8,
    },
    content: {
      marginTop: 10,
    },
    iconContainer: {
      marginRight: 10,
    },
    icon: {
      height: 15,
      width: 15,
      resizeMode: 'contain',
      tintColor: colors.primary,
    },
    icon2: {
      height: 15,
      width: 22.5,
      tintColor: colors.success,
    },
  });
};

export default SimpleAccordion;
