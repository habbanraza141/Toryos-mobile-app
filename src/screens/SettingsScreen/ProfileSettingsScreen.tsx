import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import TextComp from "../../components/TextComp";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import TextAreaComp from "../../components/TextAreaComp";

const ProfileSettingsScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);

    const [fullName, setFullName] = useState('HARIS');
    const [phoneNumber, setPhoneNumber] = useState('+923117769834');
    const [bio, setBio] = useState('Veniam voluptate mo');

    return (
        <Card otherStyle={styles.sectionCard}>
            <TextComp bold fontSize={18}>Profile Settings</TextComp>
            <TextComp fontSize={14} color="muted">
                Manage your profile information and avatar
            </TextComp>

            <View style={styles.profilePictureContainer}>
                <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
                    <TextComp bold style={styles.avatarText}>H</TextComp>
                </View>
                <TextComp fontSize={14}>Profile Picture</TextComp>
                <View style={styles.profilePictureButtons}>
                    <Button
                        title="Upload Picture"
                        outlined
                        leftImage={require('../../assets/icons/upload.png')}
                    // btnStyle={styles.uploadButton}
                    />
                    {/* <TouchableOpacity style={styles.generateButton}>
                        <Image
                            source={require('../../assets/icons/light.png')}
                            style={[styles.generateIcon, { tintColor: colors.white }]}
                        />
                    </TouchableOpacity> */}
                </View>
                <TextComp fontSize={12} color="muted">
                    Upload a profile picture (PNG, JPG, max 2MB)
                </TextComp>
            </View>

            <View style={styles.inputGroup}>
                <TextComp fontSize={14} bold>Full Name</TextComp>
                <TextInput
                    style={[styles.input, { borderColor: colors.bottomTabsBorder }]}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholderTextColor={colors.muted}
                />
            </View>

            <View style={styles.inputGroup}>
                <TextComp fontSize={14} bold>Phone Number</TextComp>
                <TextInput
                    style={[styles.input, { borderColor: colors.bottomTabsBorder }]}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholderTextColor={colors.muted}
                />
            </View>

            <View style={styles.inputGroup}>
                <TextComp fontSize={14} bold>Bio</TextComp>
                <TextAreaComp
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Enter your bio..."
                    containerStyle={styles.textArea}
                />
            </View>
        </Card>
    );
};

const createStyleSheet = (colors: ColorPalette) =>
    StyleSheet.create({
        sectionCard: {
            gap: 20,
        },
        profilePictureContainer: {
            alignItems: 'center',
            gap: 8,
        },
        avatar: {
            width: 80,
            height: 80,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
        },
        avatarText: {
            fontSize: 32,
            color: colors.primaryDark,
        },
        profilePictureButtons: {
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
        },
        uploadButton: {
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
        generateButton: {
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        generateIcon: {
            width: 20,
            height: 20,
        },
        inputGroup: {
            gap: 8,
        },
        input: {
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 14,
            backgroundColor: colors.secondaryBackground,
        },
        textArea: {
            marginTop: 4,
        },
    });

export default ProfileSettingsScreen;

