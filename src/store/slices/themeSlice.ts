import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';
type ForcedTheme = 'light' | 'dark' | null;

interface ThemeState {
  mode: ThemeMode;
  forcedTheme: ForcedTheme;
}

const THEME_STORAGE_KEY = '@app_theme';

const initialState: ThemeState = {
  mode: 'system',
  forcedTheme: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      if (action.payload === 'system') {
        state.mode = 'system';
        state.forcedTheme = null;
      } else {
        state.mode = action.payload;
        state.forcedTheme = action.payload;
      }

      AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(state));
    },
    loadTheme: (state, action: PayloadAction<ThemeState>) => {
      return action.payload;
    },
  },
});

export const loadThemeFromStorage = () => async (dispatch: any) => {
  try {
    const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      dispatch(themeSlice.actions.loadTheme(JSON.parse(savedTheme)));
    }
  } catch (error) {
    console.error('Failed to load theme from storage', error);
  }
};

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
