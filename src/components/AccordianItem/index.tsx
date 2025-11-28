
import React, { ReactNode, useState } from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Platform,
    UIManager,
    Image,
    LayoutChangeEvent,
    TextStyle,
    StyleProp,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    runOnJS,
} from 'react-native-reanimated';
import { ColorPalette, getColors } from '../../theme/colors';
import { useTheme } from '../../hooks/useTheme';
import { shadows } from '../../theme/shadows';
import TextComp from '../TextComp';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
    children?: ReactNode;
    question: string;
    answer?: string;
    testID?: string;
    questionTextStyle?: StyleProp<TextStyle>;
    isWithout?: boolean;
    isChild?: boolean;
};

const AccordionItem: React.FC<Props> = ({ question, answer, testID, isWithout, questionTextStyle, isChild, children }) => {
    const [expanded, setExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);

    const theme = useTheme();
    const isDark = theme === 'dark';
    const colors = getColors(theme);
    const styles = createStyleSheet(colors, isDark);

    const animatedHeight = useSharedValue(0);
    const contentOpacity = useSharedValue(0);
    const iconRotation = useSharedValue(0);
    const contentMarginTop = useSharedValue(0);

    const toggleExpand = () => {
        if (!expanded) {
            animatedHeight.value = withTiming(contentHeight, {
                duration: 300,
                easing: Easing.out(Easing.ease)
            });
            contentOpacity.value = withTiming(1, { duration: 200 });
            if (isWithout) {
                iconRotation.value = withTiming(180, { duration: 300 });
            } else {
                iconRotation.value = withTiming(45, { duration: 300 });
            }
            contentMarginTop.value = withTiming(10, { duration: 300 });
            runOnJS(setExpanded)(true);
        } else {
            contentOpacity.value = withTiming(0, { duration: 200 });
            animatedHeight.value = withTiming(0, {
                duration: 300,
                easing: Easing.out(Easing.ease)
            });
            iconRotation.value = withTiming(0, { duration: 300 });
            contentMarginTop.value = withTiming(0, { duration: 300 });
            runOnJS(setExpanded)(false);
        }
    };

    const contentStyle = useAnimatedStyle(() => ({
        height: animatedHeight.value,
        opacity: contentOpacity.value,
        overflow: 'hidden',
        marginTop: contentMarginTop.value,
    }));

    const iconStyle = useAnimatedStyle(() => {
        if (isWithout) {
            return {
                transform: [{ rotate: `${iconRotation.value}deg` }],
                marginRight: 10,
            };
        } else {
            return {
                transform: [{ rotate: `${45 - iconRotation.value}deg` }],
                marginRight: 10,
            };
        }
    });


    const measureContentHeight = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setContentHeight(height);
    };

    return (
        <View style={[styles.mainContainer, isWithout && { paddingVertical: 0, paddingHorizontal: 0 }]}>

            <View style={[styles.container, isWithout && { paddingVertical: 15, paddingHorizontal: 15, borderRadius: 10 }]} testID={testID}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.header, isWithout && { justifyContent: 'space-between' }]}
                    onPress={toggleExpand}
                    testID={`${testID}-header`}
                >
                    {
                        isWithout ? '' :
                            <Animated.View style={iconStyle}>
                                <Image
                                    source={require('../../assets/icons/cross.png')}
                                    style={styles.icon}
                                    accessibilityLabel={expanded ? 'Collapse' : 'Expand'}
                                />
                            </Animated.View>

                    }
                    <TextComp
                        style={[styles.questionText, questionTextStyle]}
                        fontSize={isWithout ? 16 : 14}
                        lineHeight={19.2}
                        bold
                    >
                        {question}
                    </TextComp>
                    {
                        isWithout &&
                        <Animated.View style={iconStyle}>
                            <Image
                                source={require('../../assets/icons/dropdown.png')}
                                style={styles.icon2}
                                accessibilityLabel={expanded ? 'Collapse' : ''}

                            />
                        </Animated.View>
                    }
                </TouchableOpacity>
                <View
                    style={styles.hiddenContent}
                    onLayout={measureContentHeight}
                    testID={`${testID}-hidden-content`}
                >
                    {isChild ? <View>{children}</View> : <TextComp fontSize={14} lineHeight={16.8}>{answer}</TextComp>}
                </View>

                <Animated.View style={[contentStyle]} testID={`${testID}-content`}>
                    {isChild ? <View>{children}</View> : <TextComp fontSize={14} lineHeight={16.8}>{answer}</TextComp>}
                </Animated.View>

            </View>
        </View>
    );
};

const createStyleSheet = (colors: ColorPalette, isDark: boolean) => {
    return StyleSheet.create({
        mainContainer: {
            paddingHorizontal: 25,
            paddingVertical: 10
        },
        container: {
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: colors.secondaryBackground,
            borderWidth: 1,
            borderColor: colors.muted15,
            overflow: 'hidden',
            ...(isDark ? {} : shadows.button)
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        questionText: {
            flex: 1,
            marginRight: 8,
        },
        hiddenContent: {
            position: 'absolute',
            opacity: 0,
            zIndex: -1,
            left: 16,
            right: 16,
            top: 60,
        },
        icon: {
            height: 15,
            width: 15,
            resizeMode: 'contain',
            tintColor: colors.primary,
        },
        icon2: {
            height: 15,
            width: 22.5,
            tintColor: colors.success,
        }
    });
};

export default AccordionItem;