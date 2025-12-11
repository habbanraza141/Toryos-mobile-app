import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, KeyboardAvoidingView, Platform } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import TextInputComp from "../../components/TextInputComp";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setCurrentUser } from "../../store/slices/userSlice";
import HeaderComp from "../../components/HeaderComp";
import SpaceComponent from "../../components/SpaceComponent";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStack";

type SignInNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignIn'>;

const SignIn = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<SignInNavigationProp>();

    const [email, setEmail] = useState('toryos@gmail.com');
    const [password, setPassword] = useState('User123,');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = () => {
        setEmailError('');
        setPasswordError('');

        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            return;
        }

        // Static authentication - only allow the specific user
        if (email.trim() === 'toryos@gmail.com' && password === 'User123,') {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                dispatch(setCurrentUser({
                    name: 'Tory OS',
                    email: 'toryos@gmail.com',
                    initials: 'TO'
                }));
                setLoading(false);
            }, 500);
        } else {
            // setEmailError('Invalid email or password');
            setPasswordError('Invalid email or password');
        }
    };

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    const handleRequestAccess = () => {
        navigation.navigate('RequestAccess');
    };

    const handleTermsPress = () => {
        Linking.openURL('https://toryos.com/terms');
    };

    const handlePrivacyPress = () => {
        Linking.openURL('https://toryos.com/privacy');
    };

    return (
        <BackgroundContainer>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        {/* Logo */}
                        <View style={styles.logoContainer}>
                            <View style={styles.logoTextContainer}>
                                <Image source={require('../../assets/images/logo.png')} resizeMode="contain" style={{
                                    width: 200,
                                    height: 100,
                                }} />

                            </View>
                        </View>

                        {/* Login Card */}
                        <View style={styles.loginCard}>
                            <View style={styles.welcomeSection}>
                                <HeaderComp style={styles.welcomeTitle} title="Welcome Back" />
                                <TextComp style={styles.welcomeSubtitle}>Sign in to your workspace</TextComp>
                            </View>

                            <View style={styles.formSection}>
                                <View style={styles.inputContainer}>
                                    <TextComp style={styles.label}>Email</TextComp>
                                    <TextInputComp
                                        placeholderText="Enter your email"
                                        value={email}
                                        onChangeText={setEmail}
                                        showToggleImage={false}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        error={emailError}
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <TextComp style={styles.label}>Password</TextComp>
                                    <TextInputComp
                                        placeholderText="Enter your password"
                                        value={password}
                                        onChangeText={setPassword}
                                        showToggleImage={true}
                                        secureText={true}
                                        error={passwordError}
                                    />
                                </View>

                                <Button
                                    title="Sign In"
                                    onPress={handleSignIn}
                                    loading={loading}
                                    btnStyle={styles.signInButton}
                                />

                                <TextComp onPress={handleForgotPassword} style={styles.forgotPasswordText}>Forgot password?</TextComp>
                            </View>


                            <SpaceComponent />
                            <View style={styles.requestAccessSection}>
                                <TextComp style={styles.requestAccessText}>Don't have an account?</TextComp>
                                <Button
                                    title="Request Access"
                                    variant="primary"
                                    outlined={true}
                                    onPress={handleRequestAccess}
                                    btnStyle={styles.requestAccessButton}
                                />
                            </View>
                        </View>


                    </View>
                </ScrollView>

            </KeyboardAvoidingView>

            <View style={styles.footer}>
                <View style={styles.poweredBySection}>
                    <TextComp style={styles.poweredByText}>📚 Powered by AI-driven knowledge retrieval</TextComp>
                </View>
                <View style={styles.legalSection}>
                    <TextComp style={styles.legalText}>
                        By signing up, you agree to our{' '}
                        <TextComp style={styles.linkText} onPress={handleTermsPress}>
                            Terms of Service
                        </TextComp>
                        {' '}and{' '}
                        <TextComp style={styles.linkText} onPress={handlePrivacyPress}>
                            Privacy Policy
                        </TextComp>
                    </TextComp>
                </View>
            </View>
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
            gap: 30,
        },
        logoContainer: {
            alignItems: 'center',
            // marginTop: 20,
        },
        logoTextContainer: {
            width: 200,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center'
        },
        logoTextTory: {
            fontSize: 48,
            fontWeight: '700',
            color: '#4A90E2', // Blue gradient color
        },
        logoTextOS: {
            fontSize: 48,
            fontWeight: '700',
            color: '#9B59B6', // Purple gradient color
        },
        loginCard: {
            // backgroundColor: colors.white || '#FFFFFF',
            // borderRadius: 16,
            // padding: 24,
            gap: 24,
        },
        welcomeSection: {
            gap: 8,
        },
        welcomeTitle: {
            fontSize: 28,
            fontWeight: '700',
            color: colors.default,
        },
        welcomeSubtitle: {
            fontSize: 16,
            color: colors.muted,
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
        signInButton: {
            marginTop: 8,
        },
        forgotPasswordContainer: {
            alignItems: 'center',
            marginTop: 8,
        },
        forgotPasswordText: {
            fontSize: 14,
            color: colors.btnTextPrimary,
            textAlign: 'center'
        },
        divider: {
            height: 1,
            backgroundColor: colors.bottomTabsBorder || colors.muted15,
            marginVertical: 8,
        },
        requestAccessSection: {
            alignItems: 'center',
            gap: 12,
        },
        requestAccessText: {
            fontSize: 14,
            color: colors.default,
        },
        requestAccessButton: {
            width: '100%',
        },
        footer: {
            alignItems: 'center',
            gap: 8,
            padding: 15
        },
        poweredBySection: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        poweredByText: {
            fontSize: 12,
            color: colors.muted,
        },
        legalSection: {
            alignItems: 'center',
        },
        legalText: {
            fontSize: 12,
            color: colors.muted,
            textAlign: 'center',
        },
        linkText: {
            fontSize: 12,
            color: colors.btnTextPrimary,
            textDecorationLine: 'underline',
        },
    });
};

export default SignIn;
