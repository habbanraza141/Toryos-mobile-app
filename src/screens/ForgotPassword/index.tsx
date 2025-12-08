import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import TextInputComp from "../../components/TextInputComp";
import Button from "../../components/Button";
import HeaderComp from "../../components/HeaderComp";
import BackButton from "../../components/BackButton";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStack";

type ForgotPasswordNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

const ForgotPassword = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const navigation = useNavigation<ForgotPasswordNavigationProp>();
    
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendResetLink = () => {
        setEmailError('');

        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setEmailError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // Navigate back or show success message
            navigation.goBack();
        }, 1000);
    };

    return (
        <BackgroundContainer>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <BackButton />
                            <HeaderComp title="Reset Password" style={styles.title} />
                        </View>
                    </View>

                    {/* Description */}
                    <TextComp style={styles.description}>
                        Enter your email address and we'll send you a link to reset your password.
                    </TextComp>

                    <View style={styles.formSection}>
                        <View style={styles.inputContainer}>
                            <TextComp style={styles.label}>Email</TextComp>
                            <TextInputComp
                                placeholderText="you@example.com"
                                value={email}
                                onChangeText={setEmail}
                                showToggleImage={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                error={emailError}
                            />
                        </View>

                        <Button
                            title="Send Reset Link"
                            onPress={handleSendResetLink}
                            loading={loading}
                            btnStyle={styles.sendButton}
                        />
                    </View>
                </View>
            </ScrollView>
        </BackgroundContainer>
    );
};

const createStyleSheet = (colors: ColorPalette) => {
    return StyleSheet.create({
        scrollContent: {
            flexGrow: 1,
        },
        container: {
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 60,
            paddingBottom: 30,
        },
        header: {
            marginBottom: 16,
        },
        headerLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        title: {
            fontSize: 24,
            fontWeight: '700',
        },
        description: {
            fontSize: 14,
            color: colors.muted,
            lineHeight: 20,
            marginBottom: 24,
        },
        formSection: {
            gap: 20,
        },
        inputContainer: {
            gap: 8,
        },
        label: {
            fontSize: 14,
            fontWeight: '600',
            color: colors.default,
        },
        sendButton: {
            marginTop: 8,
        },
    });
};

export default ForgotPassword;

