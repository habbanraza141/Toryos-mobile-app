import {useColorScheme} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

export const useTheme = (): 'light' | 'dark' => {
  const systemTheme = useColorScheme() ?? 'light';
  const themeState = useSelector((state: RootState) => state.theme);

  return themeState.mode === 'system'
    ? systemTheme
    : themeState.forcedTheme ?? 'light';
};
