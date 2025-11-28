import { useNavigation, CommonActions } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import CustomAlert from '../components/CustomAlert';

type Options = {
  strict?: boolean;
  message?: string;
  variant?: 'success' | 'error' | 'default';
  fallbackRoute?: string;
  fallbackParams?: object;
};

export const useBackNavigate = ({
  strict = false,
  message = 'Are you sure you want to go back?',
  variant = 'default',
  fallbackParams = {},
  fallbackRoute,
}: Options = {}) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);

  const handleConfirm = () => {
    setShowAlert(false);

    if (fallbackRoute) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: fallbackRoute,
              params: fallbackParams,
            },
          ],
        })
      );
    } else {
      navigation.goBack();
    }
  };

  const goBack = () => {
    if (strict) {
      setShowAlert(true);
    } else {
      handleConfirm();
    }
  };

  useEffect(() => {
    const onBackPress = () => {
      goBack();
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [strict]);

  const AlertModal = (
    <CustomAlert
      visible={showAlert}
      variant={variant}
      message={message}
      isButton
      onClick={handleConfirm}
      onClose={() => setShowAlert(false)}
    />
  );

  return { goBack, AlertModal };
};
