import React from "react";
import { View, StyleSheet } from "react-native";
import TextComp from "../../components/TextComp";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";

const SecuritySettingsScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);

    return (
        <Card otherStyle={styles.sectionCard}>
            <View>

                <TextComp bold fontSize={18}>Authentication Settings</TextComp>
                <TextComp fontSize={14} color="muted">
                    Manage your password and security preferences
                </TextComp>
            </View>

            <View style={styles.securitySection}>
                <TextComp bold fontSize={16}>Change Password</TextComp>
                <TextComp fontSize={14} color="muted">
                    Update your password to keep your account secure
                </TextComp>
                <Button
                    title="Change Password"
                    outlined
                    btnStyle={styles.securityButton}
                />
            </View>

            <View style={styles.securitySection}>
                <TextComp bold fontSize={16}>Two-Factor Authentication</TextComp>
                <TextComp fontSize={14} color="muted">
                    Add an extra layer of security to your account
                </TextComp>
                <Button
                    title="Enable 2FA (Coming Soon)"
                    outlined
                    btnStyle={[styles.securityButton, styles.disabledButton]}
                    isDisabled
                />
            </View>

            <View style={styles.divider} />

            <View style={styles.dangerZone}>
                <TextComp bold fontSize={18} style={{ color: colors.danger }}>Danger Zone</TextComp>
                <TextComp fontSize={14} color="muted">
                    Permanently delete your account and all associated data
                </TextComp>
                <Button
                    title="Delete Account"
                    variant="danger"
                    leftImage={require('../../assets/icons/bin.png')}
                    btnStyle={styles.deleteButton}
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
        securitySection: {
            gap: 8,
            marginTop: 16,
        },
        securityButton: {
            marginTop: 8,
        },
        disabledButton: {
            opacity: 0.5,
        },
        divider: {
            height: 1,
            backgroundColor: colors.bottomTabsBorder,
            marginVertical: 20,
        },
        dangerZone: {
            gap: 12,
            marginTop: 8,
        },
        deleteButton: {
            marginTop: 8,
        },
    });

export default SecuritySettingsScreen;

