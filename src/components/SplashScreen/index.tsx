import React, { useEffect } from 'react';
import SplashScreenLib from 'react-native-splash-screen';

const SplashScreen: React.FC = () => {
  useEffect(() => {
    // Hide splash screen after app is ready
    const timer = setTimeout(() => {
      SplashScreenLib.hide();
    }, 2000); // Show for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default SplashScreen;

