import {StyleSheet, View, ViewProps} from 'react-native';
import React from 'react';
import TextComp from '../TextComp';
import {useTheme} from '../../hooks/useTheme';
import {getColors} from '../../theme/colors';
import {ColorPalette} from '../../theme/colors';

type DateAndTimeVariant = 'primary' | 'danger';

interface DateAndTimeProps extends ViewProps {
  variant?: DateAndTimeVariant;
  date: string;
  time: string;
  dateUndetermined?: boolean;
}

const getBackgroundColor = (
  variant: DateAndTimeVariant,
  colors: ColorPalette,
) => {
  switch (variant) {
    case 'primary':
      return colors.primary;
    case 'danger':
      return colors.danger;
    default:
      return colors.primary;
  }
};

const getTextColor = (variant: DateAndTimeVariant, colors: ColorPalette) => {
  switch (variant) {
    case 'primary':
      return colors.white;
    case 'danger':
      return colors.white;
    default:
      return colors.text;
  }
};

const DateAndTime: React.FC<DateAndTimeProps> = ({
  variant = 'primary',
  date,
  dateUndetermined = false,
  time,
}: DateAndTimeProps) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);

  const backgroundColor = getBackgroundColor(variant, colors);
  const textColor = getTextColor(variant, colors);
  return (
    <View style={[styles.container]}>
      <TextComp bold color="primary">
        Date & Time
      </TextComp>
      {dateUndetermined ? (
        <View style={styles.bottomContainer}>
          <View style={styles.oneContainer}>
            <TextComp bold color="default" fontSize={16}>
              Date
            </TextComp>
            <TextComp
              italic
              color="default"
              fontSize={16}
              style={styles.dateTextStyle}>
              Date & Time Undetermined
            </TextComp>
          </View>
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <View style={styles.oneContainer}>
            <TextComp bold color="default" fontSize={16}>
              Date{' '}
            </TextComp>
            <TextComp
              italic
              color="default"
              fontSize={16}
              style={styles.dateTextStyle}>
              {date}{' '}
            </TextComp>
          </View>
          <View style={styles.oneContainer}>
            <TextComp bold color="default" fontSize={16}>
              Time{' '}
            </TextComp>
            <TextComp italic color="default" fontSize={16}>
              {time}{' '}
            </TextComp>
          </View>
        </View>
      )}
    </View>
  );
};

export default DateAndTime;

const createStyleSheet = (colors: ColorPalette) =>
  StyleSheet.create({
    oneContainer: {
      gap: 10,
      flex: 1,
    },
    container: {
      gap: 20,
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 20,
    },
    dateTextStyle: {
      textTransform: 'capitalize',
    },
  });
