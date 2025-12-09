import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import TextComp from '../TextComp';
import BackgroundContainer from '../BackgroundContainer';
import { colors } from '../../theme/colors';
import HeaderComp from '../HeaderComp';

type Props = {
  title?: string;
  variant?: 'primary' | 'danger';
  size?: 'small' | 'large';
  spinnerColor?: string;
  fullScreen?: boolean;
};
const Loader = ({
  title = 'Loading...',
  variant = "primary",
  size = "large",
  fullScreen = true,
  spinnerColor = colors.primary,
}: Props) => {

  const textSize = {
    "small": 14,
    "large": 18,
    "medium": 10,
  }
  return (
    <BackgroundContainer>
      <View style={[styles.container, {
        ...(fullScreen ? {
          flex: 1,
        } : {})
      }]}>
        <ActivityIndicator
          size={size}
          color={spinnerColor}
          style={styles.spinner}
        />
        <HeaderComp title={title} style={styles.text}>

        </HeaderComp>
      </View>
      {
        fullScreen && (
          <Image
            style={{
              opacity: 0.1, position: 'absolute', right: '-10%', bottom: '-10%', transform: [{ rotate: '15deg' }
              ],
            }}
            source={require('../../assets/images/logo.png')}
          />
        )
      }

    </BackgroundContainer>
  );
};

const styles = StyleSheet.create({
  spinner: {
    transform: [{ scale: 1.5 }],
  },
  text: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
});

export default Loader;
