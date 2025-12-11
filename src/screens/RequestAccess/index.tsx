import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import TextInputComp from "../../components/TextInputComp";
import TextAreaComp from "../../components/TextAreaComp";
import Button from "../../components/Button";
import HeaderComp from "../../components/HeaderComp";
import BackButton from "../../components/BackButton";
import Card from "../../components/Card";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStack";
import SpaceComponent from "../../components/SpaceComponent";

type RequestAccessNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'RequestAccess'>;

const RequestAccess = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const navigation = useNavigation<RequestAccessNavigationProp>();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [brokerageName, setBrokerageName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [aboutBrokerage, setAboutBrokerage] = useState('');

    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [brokerageNameError, setBrokerageNameError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRequestDemo = () => {
        setFullNameError('');
        setEmailError('');
        setBrokerageNameError('');

        let hasError = false;

        if (!fullName.trim()) {
            setFullNameError('Full name is required');
            hasError = true;
        }

        if (!email.trim()) {
            setEmailError('Email is required');
            hasError = true;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.trim())) {
                setEmailError('Please enter a valid email address');
                hasError = true;
            }
        }

        if (!brokerageName.trim()) {
            setBrokerageNameError('Brokerage name is required');
            hasError = true;
        }

        if (hasError) {
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
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            resizeMode="contain"
                            style={styles.logo}
                        />
                    </View>



                    <View style={styles.formSection}>
                        <View style={styles.inputContainer}>
                            <HeaderComp style={{ fontSize: 20 }} title="Tell Us About Your Brokerage" />
                            <TextComp style={styles.formDescription}>
                                We'll schedule a demo to show you how toryOS can help your team.
                            </TextComp>

                            <SpaceComponent />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextComp style={styles.label}>
                                Full Name <TextComp style={styles.required}>*</TextComp>
                            </TextComp>
                            <TextInputComp
                                placeholderText="John Smith"
                                value={fullName}
                                onChangeText={setFullName}
                                showToggleImage={false}
                                error={fullNameError}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextComp style={styles.label}>
                                Email <TextComp style={styles.required}>*</TextComp>
                            </TextComp>
                            <TextInputComp
                                placeholderText="john@yourbrokerage.com"
                                value={email}
                                onChangeText={setEmail}
                                showToggleImage={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                error={emailError}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextComp style={styles.label}>
                                Brokerage Name <TextComp style={styles.required}>*</TextComp>
                            </TextComp>
                            <TextInputComp
                                placeholderText="Your Brokerage LLC"
                                value={brokerageName}
                                onChangeText={setBrokerageName}
                                showToggleImage={false}
                                error={brokerageNameError}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextComp style={styles.label}>Phone Number</TextComp>
                            <TextInputComp
                                placeholderText="(555) 123-4567"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                showToggleImage={false}
                                keyboardType="phone-pad"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextComp style={styles.label}>Tell Us About Your Brokerage</TextComp>
                            <TextAreaComp
                                placeholder="Number of agents, current challenges, what you're looking for..."
                                value={aboutBrokerage}
                                onChangeText={setAboutBrokerage}
                                inputStyle={styles.textArea}
                            />
                        </View>

                        <Button
                            title="Request Demo"
                            onPress={handleRequestDemo}
                            loading={loading}
                            btnStyle={styles.submitButton}
                        />

                        <TextComp style={styles.infoText}>
                            We typically respond within 24 hours.
                        </TextComp>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <TextComp style={styles.footerText}>
                            Already have an account?{' '}
                            <TextComp
                                style={styles.footerLink}
                                onPress={() => navigation.navigate('SignIn')}
                            >
                                Sign in
                            </TextComp>
                        </TextComp>
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
            paddingTop: 40,
            paddingBottom: 30,
            gap: 20,
        },
        logoContainer: {
            alignItems: 'center',
        },
        logo: {
            width: 200,
            height: 100,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginTop: 10,
        },
        title: {
            fontSize: 24,
            fontWeight: '700',
            flex: 1,
        },
        subtitle: {
            fontSize: 16,
            color: colors.default,
            textAlign: 'center',
            marginTop: 8,
        },
        formCard: {
            gap: 20,
            marginTop: 10,
        },
        formTitle: {
            fontSize: 18,
            color: colors.default,
        },
        formDescription: {
            fontSize: 14,
            color: colors.muted,
            lineHeight: 20,
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
        required: {
            color: colors.danger,
        },
        textArea: {
            minHeight: 100,
        },
        submitButton: {
            marginTop: 8,
        },
        infoText: {
            fontSize: 12,
            color: colors.muted,
            textAlign: 'center',
            marginTop: 8,
        },
        footer: {
            alignItems: 'center',
            marginTop: 20,
        },
        footerText: {
            fontSize: 14,
            color: colors.default,
        },
        footerLink: {
            fontSize: 14,
            color: colors.btnTextPrimary,
            textDecorationLine: 'underline',
        },
    });
};

export default RequestAccess;

