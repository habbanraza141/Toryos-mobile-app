import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import AppContent from './AppContent';
import store from './src/store/store';

export default function App() {
  useEffect(() => {
    // Hide splash screen after app is ready
    const timer = setTimeout(() => {
      try {
        SplashScreen.hide();
      } catch (error) {
        console.warn('Error hiding splash screen:', error);
      }
    }, 2000); // Show for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
