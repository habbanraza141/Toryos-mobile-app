import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewProps,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useTheme} from '../../hooks/useTheme';
import {COLORS_DEFAULT, getColors} from '../../theme/colors';
import {ColorPalette} from '../../theme/colors';
import {shadows} from '../../theme/shadows';
import TextComp from '../TextComp';
import moment, {Moment} from 'moment';

type DatePickerVariant = 'light' | 'dark';

interface DatePickerProps extends ViewProps {
  variant?: DatePickerVariant;
  value: Moment | null;
  error?: string;
  placeholder?: string;
  mode: 'date' | 'time' | 'datetime';
  onDateChange: (date: Moment) => void;
  format?: string;
  restrictPastDate?: boolean;
  restrictFutureYear?: boolean;
  isrestricted?: boolean;
  minimumDate?: string;
  showClear?: boolean;
  onClear?: () => void;
}

const DatePickerComp: React.FC<DatePickerProps> = ({
  mode,
  value,
  error,
  placeholder = 'Select Date',
  onDateChange,
  format,
  isrestricted,
  minimumDate,
  restrictPastDate = false,
  restrictFutureYear = false,
  showClear = false,
  onClear,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );
  const theme = useTheme();
  const colors = getColors(theme);
  const isDark = theme === 'dark';
  const styles = createStyleSheet(colors, isDark);

  const handleConfirm = (selectedDate: Date) => {
    setOpen(false);
    onDateChange(moment(selectedDate));
  };

  const getSafeDate = (value: Moment | null): Date => {
    return value ? value.toDate() : new Date();
  };

  return (
    <View>
      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={() => setOpen(true)}>
          <TextComp
            style={
              value != null ? styles.dateTextStyle : styles.placeholderStyle
            }>
            {value != null ? moment(value).format(format) : placeholder}
          </TextComp>
        </TouchableOpacity>

        <View style={styles.iconsRow}>
          {showClear && value != null && (
            <TouchableOpacity onPress={onClear}>
              <Image
                style={styles.clockImage}
                source={require('../../assets/icons/cross.png')}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setOpen(true)}>
            {mode === 'date' && (
              <Image
                style={styles.clockImage}
                source={require('../../assets/icons/calendar.png')}
              />
            )}
            {mode === 'time' && (
              <Image
                style={styles.clockImage}
                source={require('../../assets/icons/clock.png')}
              />
            )}
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          mode={mode}
          open={open}
          date={getSafeDate(value)}
          onConfirm={handleConfirm}
          onCancel={() => {
            setOpen(false);
          }}
          theme={isDark ? 'dark' : 'light'}
          minimumDate={
            restrictPastDate
              ? new Date()
              : isrestricted
              ? new Date(
                  minimumDate ||
                    new Date().setFullYear(new Date().getFullYear() - 1),
                )
              : undefined
          }
          maximumDate={restrictFutureYear ? new Date() : undefined}
          // minimumDate={restrictPastDate ? new Date() : new Date(1950, 0, 1)}
          // maximumDate={restrictFutureYear ? new Date() : eighteenYearsAgo}
        />
      </View>
      {error && (
        <TextComp bold fontSize={12} color="danger" style={{marginTop: 8}}>
          {error}
        </TextComp>
      )}
    </View>
  );
};

const createStyleSheet = (colors: ColorPalette, isDark: boolean) =>
  StyleSheet.create({
    touchableContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    dateContainer: {
      width: '100%',
      height: 44,
      backgroundColor: colors.secondaryBackground,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      borderColor: colors.muted15,
      borderWidth: 1,
      ...(isDark ? {} : shadows.button),
    },
    iconsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    dateTextStyle: {
      fontSize: 16,
      color: colors.default,
    },
    clockImage: {
      height: 18,
      width: 18,
      resizeMode: 'contain',
      tintColor: colors.default,
    },
    placeholderStyle: {
      color: colors.muted,
    },
  });

export default DatePickerComp;
