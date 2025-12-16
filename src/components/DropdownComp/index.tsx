import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { ColorPalette, getColors } from '../../theme/colors';
import { useTheme } from '../../hooks/useTheme';
import TextComp from '../TextComp';
import { Image } from 'react-native';

interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownCompProps {
    placeholder?: string;
    options: DropdownOption[];
    value?: string;
    onSelect: (value: string, label: string) => void;
    containerStyle?: any;
}

const DropdownComp: React.FC<DropdownCompProps> = ({
    placeholder = 'Select an option',
    options,
    value,
    onSelect,
    containerStyle,
}) => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<View>(null);

    const selectedOption = options.find(opt => opt.value === value);

    const handleSelect = (option: DropdownOption) => {
        onSelect(option.value, option.label);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handlePressOutside = () => {
            if (isOpen) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            // Add a small delay to avoid immediate closing
            const timer = setTimeout(() => {
                // This will be handled by TouchableWithoutFeedback
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <View style={styles.wrapper} ref={dropdownRef}>
            <TouchableOpacity
                style={[styles.container, containerStyle]}
                onPress={() => setIsOpen(!isOpen)}
                activeOpacity={0.7}
            >
                <TextComp fontSize={14} color={selectedOption ? "primary" : "muted"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </TextComp>
                <Image
                    source={require('../../assets/icons/rightArrow.png')}
                    style={[styles.chevronIcon, { transform: [{ rotate: isOpen ? '270deg' : '90deg' }] }]}
                />
            </TouchableOpacity>

            {isOpen && (
                <>
                    <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
                        <View style={styles.backdrop} />
                    </TouchableWithoutFeedback>
                    <View style={styles.dropdownList}>
                        <ScrollView
                            style={styles.optionsList}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={true}
                        >
                            {options.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[
                                        styles.option,
                                        value === option.value && styles.optionSelected
                                    ]}
                                    onPress={() => handleSelect(option)}
                                    activeOpacity={0.7}
                                >
                                    <TextComp
                                        fontSize={14}
                                        color={"primary"}
                                    >
                                        {option.label}
                                    </TextComp>
                                    {value === option.value && (
                                        <View style={styles.checkmark}>
                                            <TextComp fontSize={12} color="primary">✓</TextComp>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </>
            )}
        </View>
    );
};

const createStyleSheet = (colors: ColorPalette) => {
    return StyleSheet.create({
        wrapper: {
            position: 'relative',
            zIndex: 1000,
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.secondaryBackground,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.bottomTabsBorder,
        },
        chevronIcon: {
            width: 16,
            height: 16,
            tintColor: colors.iconBackground,
        },
        backdrop: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
        },
        dropdownList: {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 4,
            backgroundColor: colors.secondaryBackground,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.bottomTabsBorder,
            maxHeight: 200,
            zIndex: 1001,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        optionsList: {
            maxHeight: 200,
        },
        option: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderRadius: 8,
        },
        optionSelected: {
            backgroundColor: colors.background,
        },
        checkmark: {
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: colors.primaryLight,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};

export default DropdownComp;
