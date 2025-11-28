import { combineReducers } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import switchReducer from './slices/switch';
import modalToggleReducer from './slices/modalToggle';
import themeReducer from './slices/themeSlice';
import { loadThemeFromStorage } from './slices/themeSlice';
import injuryReporting from './slices/injurySlice';
import userReducer from './slices/userSlice';
import investigationReportReducer from './slices/investigationReportSlice';

const appReducer = combineReducers({
  switchVal: switchReducer,
  user: userReducer,
  injuryReporting: injuryReporting,
  modalToggle: modalToggleReducer,
  theme: themeReducer,
  investigationReport: investigationReportReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any,
) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(loadThemeFromStorage());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, any> &
  typeof store.dispatch;

export default store;
