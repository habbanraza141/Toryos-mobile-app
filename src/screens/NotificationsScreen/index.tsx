import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import HeaderComp from "../../components/HeaderComp";
import BackButton from "../../components/BackButton";
import Card from "../../components/Card";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import SpaceComponent from "../../components/SpaceComponent";

interface Notification {
    id: string;
    title: string;
    message: string;
    timeAgo: string;
    isRead: boolean;
}

const NotificationsScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const navigation = useNavigation();

    // Static notifications for alpha version
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: 'New broker waitlist signup: Qitmeer Raza',
            message: 'from Your Brokerage LLC',
            timeAgo: 'about 12 hours ago',
            isRead: false,
        },
        {
            id: '2',
            title: 'New broker waitlist signup: test',
            message: 'from Your Brokerage LLC',
            timeAgo: 'about 12 hours ago',
            isRead: false,
        },
        {
            id: '3',
            title: 'New broker waitlist signup: test',
            message: 'from Your Brokerage LLC',
            timeAgo: 'about 12 hours ago',
            isRead: false,
        },
        {
            id: '4',
            title: 'New message from Qitmeer Raza',
            message: 'from Qitmeer Raza',
            timeAgo: '6 days ago',
            isRead: false,
        },
        {
            id: '5',
            title: 'Qitmeer Raza started a video call',
            message: '',
            timeAgo: '6 days ago',
            isRead: false,
        },
    ]);

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    };

    const handleMarkAsRead = (id: string) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, isRead: true } : notif
        ));
    };

    return (
        <BackgroundContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <BackButton />
                        <View style={styles.headerContainer2} >

                            <HeaderComp title="Notifications" />
                            <TouchableOpacity onPress={handleMarkAllRead}>
                                <TextComp fontSize={14} color="primary">Mark all read</TextComp>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <SpaceComponent />

                    <View style={styles.notificationsList}>
                        {notifications.map((notification) => (
                            <TouchableOpacity
                                key={notification.id}
                                onPress={() => handleMarkAsRead(notification.id)}
                                activeOpacity={0.7}
                            >
                                <Card otherStyle={[
                                    styles.notificationCard,
                                    notification.isRead && styles.notificationCardRead
                                ]}>
                                    <View style={styles.notificationContent}>
                                        <View style={styles.notificationTextContainer}>
                                            <TextComp bold fontSize={16}>
                                                {notification.title}
                                            </TextComp>
                                            {notification.message && (
                                                <TextComp fontSize={14} color="muted" style={styles.notificationMessage}>
                                                    {notification.message}
                                                </TextComp>
                                            )}
                                            <TextComp fontSize={12} color="muted" style={styles.notificationTime}>
                                                {notification.timeAgo}
                                            </TextComp>
                                        </View>
                                        {!notification.isRead && (
                                            <View style={styles.unreadDot} />
                                        )}
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </BackgroundContainer>
    );
};

const createStyleSheet = (colors: ColorPalette) => {
    return StyleSheet.create({
        container: {
            padding: 20,
            gap: 20,
        },
        headerContainer: {
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
        },
        headerContainer2: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // gap: 12,
        },
        notificationsList: {
            gap: 12,
        },
        notificationCard: {
            backgroundColor: colors.secondaryBackground,
            padding: 16,
            borderRadius: 12,
        },
        notificationCardRead: {
            opacity: 0.7,
        },
        notificationContent: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        notificationTextContainer: {
            flex: 1,
            gap: 4,
        },
        notificationMessage: {
            marginTop: 4,
        },
        notificationTime: {
            marginTop: 8,
        },
        unreadDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.textPrimary,
            marginLeft: 12,
            marginTop: 4,
        },
    });
};

export default NotificationsScreen;

