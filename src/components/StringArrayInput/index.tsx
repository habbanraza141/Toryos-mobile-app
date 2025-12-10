import React, { useState } from 'react';
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { shadows } from '../../theme/shadows';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';
import TextComp from '../TextComp';

interface StringArrayInputProps {
  value?: string[];
  onChange: (values: string[]) => void;
  placeholderText?: string;
  error?: string;
  light?: boolean;
  noMaxWidth?: boolean;
  isWrap?: boolean;
  buttonImage?: any;
  buttonText?: string;
}

const StringArrayInput = ({
  placeholderText = "Add an item",
  value = [],
  error,
  isWrap = false,
  noMaxWidth = false,
  onChange,
  light = false,
  buttonImage = require('../../assets/icons/plus.png'),
  buttonText = "Add",
}: StringArrayInputProps) => {
  const theme = light ? 'light' : useTheme();
  const colors = getColors(theme);
  const isDark = theme === 'dark';
  const styles = createStyleSheet(colors, isDark);

  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    if (inputValue.trim()) {
      const newArray = [...value, inputValue.trim()];
      onChange(newArray);
      setInputValue('');
    }
  };

  const handleRemoveItem = (index: number) => {
    const newArray = value.filter((_, i) => i !== index);
    onChange(newArray);
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <>
      <View style={[styles.container, noMaxWidth ? {} : { maxHeight: 150 }]}>
        <ScrollView
          // style={styles.listContainer}
          keyboardShouldPersistTaps="handled"

        >
          <View style={styles.inputContainer}>
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={placeholderText}
              placeholderTextColor={colors.muted}
              style={styles.inputText}
              onSubmitEditing={handleAddItem}
              returnKeyType="done"
            />
            <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
              {buttonImage ? (
                <Image source={buttonImage} style={styles.buttonImage} />
              ) : (
                <TextComp style={styles.buttonText}>{buttonText}</TextComp>
              )}
            </TouchableOpacity>
          </View>



          {
            isWrap === true ?
              <View style={{ flexWrap: 'wrap', flexDirection: 'row', gap: 5, }}>
                {value.length > 0 &&
                  value.map((item, index) => {
                    return (
                      <View key={index} style={styles.listItem2}>
                        <TextComp >{item}</TextComp>
                        <TouchableOpacity
                          style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryLight, padding: 5, borderRadius: 9 }}
                          onPress={() => handleRemoveItem(index)}
                        >
                          <Image
                            source={require('../../assets/icons/cross.png')}
                            style={styles.removeIcon2}
                          />
                        </TouchableOpacity>
                      </View>
                    )
                  })
                }
              </View>
              :
              <>
                {value.length > 0 &&
                  value.map((item, index) => {
                    return (
                      <View key={index} style={styles.listItem}>
                        <TextComp style={styles.listItemText}>{item}</TextComp>
                        <TouchableOpacity
                          onPress={() => handleRemoveItem(index)}
                        >
                          <Image
                            source={require('../../assets/icons/cross.png')}
                            style={styles.removeIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    )
                  })
                }
              </>
          }
        </ScrollView>
      </View >
      {
        error && (
          <TextComp bold fontSize={12} color="danger" style={{ marginTop: 8 }}>
            {error}
          </TextComp>
        )
      }
    </>
    // </View>

  );
};

const createStyleSheet = (colors: ColorPalette, isDark: boolean) => {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.muted15,
      backgroundColor: colors.secondaryBackground,
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 12,
      // maxHeight: 150,
      ...(isDark ? {} : shadows.textInput),
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputText: {
      flex: 1,
      color: colors.default,
      fontSize: 14,
      paddingVertical: 8,
    },
    addButton: {
      padding: 8,
      marginLeft: 8,
    },
    buttonImage: {
      height: 20,
      width: 20,
      tintColor: colors.primaryLight,
    },
    buttonText: {
      color: colors.primaryLight,
      fontWeight: 'bold',
    },

    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: colors.muted15,
      marginBottom: 8,

      borderRadius: 6,
      borderColor: colors.primaryLight,
      gap: 12
    },

    listItemText: {
      flex: 1,
      color: colors.default,
    },

    removeIcon: {
      height: 14,
      width: 14,
      tintColor: colors.danger,
    },
    listItem2: {
      flexDirection: 'row',
      backgroundColor: colors.muted15,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: colors.primaryLight,
      gap: 12,
      padding: 5,
      alignItems: 'center',
      maxWidth: '98%'
    },


    removeIcon2: {
      height: 9,
      width: 9,
      tintColor: colors.white,
    },
    listContainer: {
      maxHeight: 120,
    },
  });
};

export default StringArrayInput;