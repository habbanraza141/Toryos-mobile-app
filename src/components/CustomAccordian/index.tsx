import React, { useRef, useState, ReactNode } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Easing,
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

interface AccordionProps {
    header: ReactNode;
    children: ReactNode;
    duration?: number;
    containerStyle?: object;
    contentStyle?: object;
}

const BottomButtonAccordion: React.FC<AccordionProps> = ({
    header,
    children,
    duration = 300,
    containerStyle = {},
    contentStyle = {}
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const animatedHeight = useRef(new Animated.Value(0)).current;

    const toggleAccordion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        Animated.timing(animatedHeight, {
            toValue: isOpen ? 0 : 1,
            duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
        }).start(() => setIsOpen(!isOpen));
    };

    const heightInterpolation = animatedHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, contentHeight],
    });

    return (
        <View style={[styles.container, containerStyle]}>
            <Animated.View
                style={[
                    styles.contentContainer,
                    {
                        height: heightInterpolation,
                        opacity: animatedHeight.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: [0, 0.5, 1]
                        }),
                        marginBottom: 8
                    }
                ]}
            >
                <View
                    style={styles.measureContent}
                    onLayout={(event) => {
                        const { height } = event.nativeEvent.layout;
                        if (height > 0 && height !== contentHeight) {
                            setContentHeight(height);
                        }
                    }}
                >
                    <View style={[styles.content, contentStyle]}>
                        {children}
                    </View>
                </View>
            </Animated.View>

            {
                !isOpen &&
                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleAccordion}
                    activeOpacity={0.9}
                >
                    {header}
                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    contentContainer: {
        overflow: 'hidden',
    },
    measureContent: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
    },
    content: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    button: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    }
});

export default BottomButtonAccordion;