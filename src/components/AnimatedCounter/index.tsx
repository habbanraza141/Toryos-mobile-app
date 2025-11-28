import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleProp, Text, TextStyle } from 'react-native';

type AnimatedCounterProps = {
    toValue: number;
    duration?: number;
    style?: StyleProp<TextStyle>;
};

const AnimatedCounter = ({ toValue, duration = 1800, style }: AnimatedCounterProps) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
            toValue,
            duration,
            useNativeDriver: false,
        }).start();

        const listener = animatedValue.addListener(({ value }) => {
            setDisplayValue(Math.floor(value));
        });

        return () => {
            animatedValue.removeListener(listener);
        };
    }, [toValue]);

    return <Text style={style}>{displayValue}</Text>;
};

export default AnimatedCounter;
