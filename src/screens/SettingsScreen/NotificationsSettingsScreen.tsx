import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Switch } from "react-native";
import TextComp from "../../components/TextComp";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import { Image } from "react-native";

const NotificationsSettingsScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);

    const [notifications, setNotifications] = useState({
        commentsOnPosts: { email: true, inApp: true, mobile: true, sms: true },
        repliesToComments: { email: true, inApp: true, mobile: true, sms: true },
        mentions: { email: true, inApp: true, mobile: true, sms: true },
        directMessages: { email: true, inApp: true, mobile: true, sms: true },
        likesOnPosts: { email: true, inApp: true, mobile: true, sms: true },
        likesOnComments: { email: true, inApp: true, mobile: true, sms: true },
        liveStreams: { email: true, inApp: true, mobile: true, sms: true },
        newCourseContent: { email: true, inApp: true, mobile: true, sms: true },
        polls: { email: true, inApp: true, mobile: true, sms: true },
        brokerWaitlist: { email: true, inApp: true, mobile: true, sms: true },
        newMembers: { email: true, inApp: true, mobile: true, sms: true },
        companyPosts: { email: true, inApp: true, mobile: true, sms: true },
        ohioPosts: { email: true, inApp: true, mobile: true, sms: true },
        privatePosts: { email: true, inApp: true, mobile: true, sms: true },
    });

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Card otherStyle={styles.sectionCard}>
                <TextComp bold fontSize={18}>Notification Preferences</TextComp>
                <TextComp fontSize={14} color="muted">
                    Choose when and how you want to be notified
                </TextComp>

                <TextComp bold fontSize={16} style={styles.subsectionTitle}>New activity</TextComp>

                {[
                    { key: 'commentsOnPosts', label: 'Comments on my posts' },
                    { key: 'repliesToComments', label: 'Replies to my comments' },
                    { key: 'mentions', label: 'Mentions' },
                    { key: 'directMessages', label: 'Direct messages' },
                    { key: 'likesOnPosts', label: 'Likes on my posts' },
                    { key: 'likesOnComments', label: 'Likes on my comments' },
                    { key: 'liveStreams', label: 'Live streams/rooms' },
                ].map((item) => (
                    <View key={item.key} style={styles.notificationRow}>
                        <TextComp fontSize={14}>{item.label}</TextComp>
                        <View style={styles.notificationChannels}>
                            {['email', 'inApp', 'mobile', 'sms'].map((channel) => (
                                <View key={channel} style={styles.notificationChannel}>
                                    <TextComp fontSize={12} color="muted" style={styles.channelLabel}>
                                        {channel === 'email' ? 'Email' : channel === 'inApp' ? 'In-app' : channel === 'mobile' ? 'Mobile' : 'SMS'}
                                    </TextComp>
                                    <Switch
                                        value={notifications[item.key as keyof typeof notifications][channel as keyof typeof notifications.commentsOnPosts]}
                                        onValueChange={(value) => {
                                            setNotifications(prev => ({
                                                ...prev,
                                                [item.key]: { ...prev[item.key as keyof typeof prev], [channel]: value }
                                            }));
                                        }}
                                        trackColor={{ false: colors.muted35, true: colors.primaryDark }}
                                        thumbColor={colors.white}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                <TextComp bold fontSize={16} style={styles.subsectionTitle}>New course content</TextComp>
                <View style={styles.notificationRow}>
                    <TextComp fontSize={14}>New course content</TextComp>
                    <View style={styles.notificationChannels}>
                        {['email', 'inApp', 'mobile', 'sms'].map((channel) => (
                            <View key={channel} style={styles.notificationChannel}>
                                <TextComp fontSize={12} color="muted" style={styles.channelLabel}>
                                    {channel === 'email' ? 'Email' : channel === 'inApp' ? 'In-app' : channel === 'mobile' ? 'Mobile' : 'SMS'}
                                </TextComp>
                                <Switch
                                    value={notifications.newCourseContent[channel as keyof typeof notifications.newCourseContent]}
                                    onValueChange={(value) => {
                                        setNotifications(prev => ({
                                            ...prev,
                                            newCourseContent: { ...prev.newCourseContent, [channel]: value }
                                        }));
                                    }}
                                    trackColor={{ false: colors.muted35, true: colors.primaryDark }}
                                    thumbColor={colors.white}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.notificationRow}>
                    <TextComp fontSize={14}>Polls</TextComp>
                    <View style={styles.notificationChannels}>
                        {['email', 'inApp', 'mobile', 'sms'].map((channel) => (
                            <View key={channel} style={styles.notificationChannel}>
                                <TextComp fontSize={12} color="muted" style={styles.channelLabel}>
                                    {channel === 'email' ? 'Email' : channel === 'inApp' ? 'In-app' : channel === 'mobile' ? 'Mobile' : 'SMS'}
                                </TextComp>
                                <Switch
                                    value={notifications.polls[channel as keyof typeof notifications.polls]}
                                    onValueChange={(value) => {
                                        setNotifications(prev => ({
                                            ...prev,
                                            polls: { ...prev.polls, [channel]: value }
                                        }));
                                    }}
                                    trackColor={{ false: colors.muted35, true: colors.primaryDark }}
                                    thumbColor={colors.white}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                <TextComp bold fontSize={16} style={styles.subsectionTitle}>Admin notifications</TextComp>

                <View style={styles.notificationRow}>
                    <TextComp fontSize={14}>Broker waitlist signups</TextComp>
                    <View style={styles.notificationChannels}>
                        {['email', 'inApp', 'mobile', 'sms'].map((channel) => (
                            <View key={channel} style={styles.notificationChannel}>
                                <TextComp fontSize={12} color="muted" style={styles.channelLabel}>
                                    {channel === 'email' ? 'Email' : channel === 'inApp' ? 'In-app' : channel === 'mobile' ? 'Mobile' : 'SMS'}
                                </TextComp>
                                <Switch
                                    value={notifications.brokerWaitlist[channel as keyof typeof notifications.brokerWaitlist]}
                                    onValueChange={(value) => {
                                        setNotifications(prev => ({
                                            ...prev,
                                            brokerWaitlist: { ...prev.brokerWaitlist, [channel]: value }
                                        }));
                                    }}
                                    trackColor={{ false: colors.muted35, true: colors.primaryDark }}
                                    thumbColor={colors.white}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.notificationRow}>
                    <TextComp fontSize={14}>New members join</TextComp>
                    <View style={styles.notificationChannels}>
                        {['email', 'inApp', 'mobile', 'sms'].map((channel) => (
                            <View key={channel} style={styles.notificationChannel}>
                                <TextComp fontSize={12} color="muted" style={styles.channelLabel}>
                                    {channel === 'email' ? 'Email' : channel === 'inApp' ? 'In-app' : channel === 'mobile' ? 'Mobile' : 'SMS'}
                                </TextComp>
                                <Switch
                                    value={notifications.newMembers[channel as keyof typeof notifications.newMembers]}
                                    onValueChange={(value) => {
                                        setNotifications(prev => ({
                                            ...prev,
                                            newMembers: { ...prev.newMembers, [channel]: value }
                                        }));
                                    }}
                                    trackColor={{ false: colors.muted35, true: colors.primaryDark }}
                                    thumbColor={colors.white}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                <Button
                    title="Turn off all notifications"
                    outlined
                    variant="danger"
                    btnStyle={styles.turnOffButton}
                />

                <View style={styles.divider} />

                <TextComp bold fontSize={16} style={styles.subsectionTitle}>New posts</TextComp>

                <View style={styles.notificationRow}>
                    <TextComp fontSize={14}>Apply to all spaces</TextComp>
                    <View style={styles.selectAllContainer}>
                        <TextComp fontSize={12} color="muted">Select all</TextComp>
                        <Switch
                            value={false}
                            trackColor={{ false: colors.muted35, true: colors.primaryDark }}
                            thumbColor={colors.white}
                        />
                    </View>
                </View>

                {[
                    { key: 'companyPosts', label: 'Company', icon: require('../../assets/icons/tool.png') },
                    { key: 'ohioPosts', label: 'Ohio', icon: require('../../assets/icons/room.png') },
                    { key: 'privatePosts', label: 'Private', icon: require('../../assets/icons/more.png') },
                ].map((space) => (
                    <View key={space.key} style={styles.spaceNotificationRow}>
                        <View style={styles.spaceLabelContainer}>
                            <Image source={space.icon} style={[styles.spaceIcon, { tintColor: colors.iconBackground }]} />
                            <TextComp fontSize={14}>{space.label}</TextComp>
                        </View>
                        <View style={styles.notificationChannels}>
                            {['email', 'inApp', 'mobile', 'sms'].map((channel) => (
                                <View key={channel} style={styles.notificationChannel}>
                                    <TextComp fontSize={12} color="muted" style={styles.channelLabel}>
                                        {channel === 'email' ? 'Email' : channel === 'inApp' ? 'In-app' : channel === 'mobile' ? 'Mobile' : 'SMS'}
                                    </TextComp>
                                    <Switch
                                        value={notifications[space.key as keyof typeof notifications][channel as keyof typeof notifications.companyPosts]}
                                        onValueChange={(value) => {
                                            setNotifications(prev => ({
                                                ...prev,
                                                [space.key]: { ...prev[space.key as keyof typeof prev], [channel]: value }
                                            }));
                                        }}
                                        trackColor={{ false: colors.muted35, true: colors.primaryDark }}
                                        thumbColor={colors.white}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                ))}

                <Button
                    title="Save changes"
                    btnStyle={styles.saveButton}
                />
            </Card>
        </ScrollView>
    );
};

const createStyleSheet = (colors: ColorPalette) =>
    StyleSheet.create({
        sectionCard: {
            gap: 20,
        },
        subsectionTitle: {
            marginTop: 16,
            marginBottom: 12,
        },
        notificationRow: {
            gap: 12,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.bottomTabsBorder,
        },
        notificationChannels: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
        },
        notificationChannel: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            minWidth: 80,
        },
        channelLabel: {
            fontSize: 11,
        },
        spaceNotificationRow: {
            gap: 12,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.bottomTabsBorder,
        },
        spaceLabelContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        spaceIcon: {
            width: 16,
            height: 16,
        },
        selectAllContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        turnOffButton: {
            marginTop: 16,
            borderColor: colors.danger,
        },
        divider: {
            height: 1,
            backgroundColor: colors.bottomTabsBorder,
            marginVertical: 20,
        },
        saveButton: {
            marginTop: 16,
        },
    });

export default NotificationsSettingsScreen;

