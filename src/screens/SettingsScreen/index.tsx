import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import HeaderComp from "../../components/HeaderComp";
import BackButton from "../../components/BackButton";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import ProfileSettingsScreen from "./ProfileSettingsScreen";
import ActivitySettingsScreen from "./ActivitySettingsScreen";
import NotificationsSettingsScreen from "./NotificationsSettingsScreen";
import TutorialSettingsScreen from "./TutorialSettingsScreen";
import SecuritySettingsScreen from "./SecuritySettingsScreen";

type SettingsTab = 'profile' | 'activity' | 'notifications' | 'tutorial' | 'security';

const SettingsScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

    const tabs = [
        { id: 'profile', icon: require('../../assets/icons/profile.png'), label: 'Profile' },
        { id: 'activity', icon: require('../../assets/icons/event.png'), label: 'Activity' },
        { id: 'notifications', icon: require('../../assets/icons/notifications.png'), label: 'Notifications' },
        // { id: 'tutorial', icon: require('../../assets/icons/light.png'), label: 'Tutorial' },
        { id: 'security', icon: require('../../assets/icons/settings.png'), label: 'Security' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileSettingsScreen />;
            case 'activity':
                return <ActivitySettingsScreen />;
            case 'notifications':
                return <NotificationsSettingsScreen />;
            // case 'tutorial':
            //     return <TutorialSettingsScreen />;
            case 'security':
                return <SecuritySettingsScreen />;
            default:
                return <ProfileSettingsScreen />;
        }
    };

    return (
        <BackgroundContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <BackButton />
                        <View style={styles.headerContent}>
                            <HeaderComp title="Account Settings" />
                            <TextComp fontSize={14} color="muted">
                                Manage your account preferences and settings
                            </TextComp>
                        </View>
                    </View>

                    <View style={styles.tabsContainer}>
                        {tabs.map((tab) => (
                            <TouchableOpacity
                                key={tab.id}
                                style={[
                                    styles.tab,
                                    activeTab === tab.id && styles.tabActive
                                ]}
                                onPress={() => setActiveTab(tab.id as SettingsTab)}
                            >
                                <Image
                                    source={tab.icon}
                                    style={[
                                        styles.tabIcon,
                                        { tintColor: activeTab === tab.id ? colors.textPrimary : colors.iconBackground }
                                    ]}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {renderTabContent()}
                </View>
            </ScrollView>
        </BackgroundContainer>
    );
};

const createStyleSheet = (colors: ColorPalette) =>
    StyleSheet.create({
        container: {
            gap: 20,
            paddingBottom: 20,
        },
        headerContainer: {
            gap: 12,
        },
        headerContent: {
            gap: 4,
        },
        tabsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 12,
            gap: 8,
        },
        tab: {
            width: 48,
            height: 48,
            borderRadius: 24,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
        },
        tabActive: {
            backgroundColor: colors.primaryLight,
            borderWidth: 1,
            borderColor: colors.bottomTabsBorder,
        },
        tabIcon: {
            width: 24,
            height: 24,
        },
    });

export default SettingsScreen;
