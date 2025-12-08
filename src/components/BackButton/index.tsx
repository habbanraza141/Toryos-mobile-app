import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';

interface BackButtonProps {
    onPress?: () => void;
    style?: any;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, style }) => {
    const theme = useTheme();
    const colors = getColors(theme);
    const navigation = useNavigation();
    const styles = createStyleSheet(colors);

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[styles.backButton, style]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <Image
                source={require('../../assets/icons/rightArrow.png')}
                style={[styles.backIcon, { transform: [{ rotate: '180deg' }] }]}
            />
        </TouchableOpacity>
    );
};

const createStyleSheet = (colors: ColorPalette) => {
    return StyleSheet.create({
        backButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.muted35,
            justifyContent: 'center',
            alignItems: 'center',
        },
        backIcon: {
            width: 20,
            height: 20,
            tintColor: colors.default,
        },
    });
};

export default BackButton;

