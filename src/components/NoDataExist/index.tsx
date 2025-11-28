import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { getColors } from '../../theme/colors';
import { ColorPalette } from '../../theme/colors';
import TextComp from '../TextComp';
import HeadingComp from '../HeadingComp';
import Button from '../Button';

type Props = {
  icon?: string;
  heading?: string;
  detail?: string;
  btnTitle?: string;
  handleClick?: () => void;
};

const NoDataExist: React.FC<Props> = ({ icon, heading, detail, handleClick, btnTitle = 'Ok' }) => {
  const theme = useTheme();
  const colors = getColors(theme);
  const styles = createStyleSheet(colors);


  return (
    <View style={styles.container}>
      {icon && (
        <Image
          source={typeof icon === 'string' ? { uri: icon } : icon}
          style={styles.icon}
          resizeMode="contain"
        />
      )}

      {heading && (
        <HeadingComp
          otherStyles={{ color: colors.muted, textAlign: 'center', textTransform: 'none' }}
          title={heading}
        />
      )}

      {detail && (
        <TextComp style={{ textAlign: 'center' }} >
          {detail}
        </TextComp>
      )}
      {/* {
        !!handleClick &&
        <Button
          btnStyle={{ width: 'auto', minWidth: 100, paddingVertical: 6 }}
          title={btnTitle}
          onPress={handleClick}
        />
      } */}

    </View>
  );
};

const createStyleSheet = (colors: ColorPalette) => {
  return StyleSheet.create({
    container: {
      padding: 16,
      gap: 10,
      alignItems: 'center',
    },
    icon: {
      width: 48,
      height: 48,
      tintColor: colors.muted,
    },
  });
};
export default NoDataExist;
