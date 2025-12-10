import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { ColorPalette, getColors } from '../../theme/colors';
import TextComp from '../TextComp';
import { useTheme } from '../../hooks/useTheme';

type Option = {
  label: string;
  value: string;
};

type Props = {
  text?: string;
  error?: string;
  value: string | undefined;
  options: Option[]; // dynamic options (2, 4, etc.)
  onChange: (val: string) => void;
  align?: 'left' | 'between'; // alignment control
};

const RadioGroup = ({ text, value, options, onChange, align = 'left', error,
}: Props) => {
  const theme = useTheme();
  const isDark = theme === 'dark';
  const colors = getColors(theme);
  const styles = createStyleSheet(colors, isDark, align);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {
          text &&

          <TextComp bold >
            {text}<TextComp >*</TextComp>
          </TextComp>
        }

        <View style={styles.optionsContainer}>
          {options.map((opt) => (
            <View key={opt.value} style={styles.option}>
              <TouchableOpacity onPress={() => onChange(opt.value)}>
                <Image
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                  source={
                    value === opt.value
                      ? require('../../assets/icons/radio-button-filled.png')
                      : require('../../assets/icons/radio-button-unfilled.png')
                  }
                />
              </TouchableOpacity>
              <TextComp >{opt.label}</TextComp>
            </View>
          ))}
        </View>
        {error && (
          <TextComp bold fontSize={12} style={{ marginTop: 8 }}>
            {error}
          </TextComp>
        )}
      </View>
    </View>
  );
};

export default RadioGroup;

const createStyleSheet = (
  colors: ColorPalette,
  isDark: boolean,
  align: 'left' | 'between'
) => {
  return StyleSheet.create({
    container: {
      gap: 35,
    },
    topContainer: {
      gap: 10,
    },
    optionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: align === 'between' ? 'space-between' : 'flex-start',
      flexWrap: 'wrap',
      gap: align === 'between' ? 10 : 20,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
  });
};
