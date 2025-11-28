import React from 'react';
import { Provider } from 'react-redux';
import AppContent from './AppContent';
import store from './src/store/store';


export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
