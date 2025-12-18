import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import TextComp from "../../components/TextComp";
import Card from "../../components/Card";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import SpaceComponent from "../../components/SpaceComponent";

type ActivitySubTab = 'interactions' | 'posts' | 'history';
type ActivityMetric = 'likes' | 'comments' | 'bookmarks';

const ActivitySettingsScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const [activeActivityTab, setActiveActivityTab] = useState<ActivitySubTab>('interactions');
    const [activeMetric, setActiveMetric] = useState<ActivityMetric>('likes');

    const activityTabs = [
        { id: 'interactions', label: 'Interactions', icon: require('../../assets/icons/twoway.png') },
        { id: 'posts', label: 'Posts', icon: require('../../assets/icons/post.png') },
        { id: 'history', label: 'History', icon: require('../../assets/icons/clock.png') },
    ];

    const activityMetrics = [
        { id: 'likes', icon: require('../../assets/icons/reactionUnfilled.png'), count: 0, label: 'Likes' },
        { id: 'comments', icon: require('../../assets/icons/commentIcon.png'), count: 0, label: 'Comments' },
        { id: 'bookmarks', icon: require('../../assets/icons/scheduled.png'), count: 1, label: 'Bookmarks' },
    ];

    // Activity items based on active metric
    const getActivityItems = () => {
        if (activeMetric === 'likes') {
            return [];
        } else if (activeMetric === 'comments') {
            return [];
        } else if (activeMetric === 'bookmarks') {
            return [
                {
                    id: '1',
                    type: 'bookmark',
                    user: { name: 'Amy Ogletree', initials: 'AO', avatar: require('../../assets/images/image.jpg') },
                    content: 'I have a contract that did not get initialed in the time allowed for the...',
                    date: 'Nov 25, 2025 · 6:30 PM',
                },
            ];
        }
        return [];
    };

    const activityItems = getActivityItems();

    const getEmptyStateMessage = () => {
        if (activeMetric === 'likes') return 'No likes yet';
        if (activeMetric === 'comments') return 'No comments yet';
        if (activeMetric === 'bookmarks') return 'No bookmarks yet';
        return 'No activity yet';
    };

    const getEmptyStateIcon = () => {
        if (activeMetric === 'likes') return require('../../assets/icons/reactionUnfilled.png');
        if (activeMetric === 'comments') return require('../../assets/icons/commentIcon.png');
        if (activeMetric === 'bookmarks') return require('../../assets/icons/scheduled.png');
        return require('../../assets/icons/reactionUnfilled.png');
    };

    return (
        <Card otherStyle={styles.sectionCard}>
            <View style={styles.headerSection}>
                <TextComp bold fontSize={18}>Activity Log</TextComp>
                <TextComp fontSize={14} color="muted">
                    Review your interactions, posts, and account history
                </TextComp>
            </View>

            <View style={styles.activityTabsContainer}>
                {activityTabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[
                            styles.activityTab,
                            activeActivityTab === tab.id && styles.activityTabActive
                        ]}
                        onPress={() => setActiveActivityTab(tab.id as ActivitySubTab)}
                    >
                        <Image
                            source={tab.icon}
                            style={[
                                styles.activityTabIcon,
                                { tintColor: colors.iconBackground }
                            ]}
                        />
                        <TextComp
                            fontSize={14}
                            style={[
                                styles.activityTabText,
                                activeActivityTab === tab.id && styles.activityTabTextActive
                            ]}
                        >
                            {tab.label}
                        </TextComp>
                    </TouchableOpacity>
                ))}
            </View>

            <View>
                <View style={styles.activityMetrics}>
                    {activityMetrics.map((metric) => (
                        <TouchableOpacity
                            key={metric.id}
                            style={[styles.metricItem, { borderBottomWidth: activeMetric === metric.id ? 1 : 0, borderColor: colors.primaryDark }]}
                            onPress={() => setActiveMetric(metric.id as ActivityMetric)}
                        >
                            <Image
                                source={metric.icon}
                                style={[
                                    styles.metricIcon,
                                    { tintColor: colors.iconBackground }
                                ]}
                            />
                            <TextComp
                                fontSize={16}
                                bold
                                style={[
                                    styles.metricText,
                                    activeMetric === metric.id && styles.metricTextActive
                                ]}
                            >
                                {metric.count}
                            </TextComp>
                        </TouchableOpacity>
                    ))}
                </View>
                <SpaceComponent />

            </View>

            {activityItems.length > 0 ? (
                <View style={styles.activityList}>
                    {activityItems.map((item) => (
                        <View key={item.id} style={styles.activityItem}>
                            <Image
                                source={getEmptyStateIcon()}
                                style={[styles.activityItemIcon, { tintColor: colors.primary }]}
                            />

                            <View style={styles.activityItemContent}>
                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                    <View style={[styles.avatarSmall]}>
                                        {item.user.avatar ? (
                                            <Image source={item.user.avatar} style={styles.avatarSmallImage} />
                                        ) : (
                                            <TextComp bold fontSize={14} style={styles.avatarSmallText}>
                                                {item.user.initials}
                                            </TextComp>
                                        )}
                                    </View>
                                    <TextComp bold fontSize={14}>{item.user.name}</TextComp>
                                </View>
                                <TextComp fontSize={14} numberOfLines={2}>
                                    {item.content}
                                </TextComp>
                                <View style={styles.activityItemDate}>
                                    <Image
                                        source={require('../../assets/icons/calendar.png')}
                                        style={[styles.dateIcon, { tintColor: colors.muted }]}
                                    />
                                    <TextComp fontSize={11} >{item.date}</TextComp>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            ) : (
                <View style={styles.emptyState}>
                    <Image
                        source={getEmptyStateIcon()}
                        style={[styles.emptyStateIcon, { tintColor: colors.muted35 }]}
                    />
                    <TextComp fontSize={14} color="muted">{getEmptyStateMessage()}</TextComp>
                </View>
            )}
        </Card>
    );
};

const createStyleSheet = (colors: ColorPalette) =>
    StyleSheet.create({
        sectionCard: {
            gap: 20,
        },
        headerSection: {
            gap: 4,
        },
        activityTabsContainer: {
            flexDirection: 'row',
            backgroundColor: colors.secondaryBackground,
            borderRadius: 8,
            // padding: 4,
            gap: 4,
        },
        activityTab: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderRadius: 6,
        },
        activityTabActive: {
            backgroundColor: colors.primaryLight,
        },
        activityTabIcon: {
            width: 18,
            height: 18,
        },
        activityTabText: {
            fontSize: 14,
            color: colors.iconBackground,
        },
        activityTabTextActive: {
            color: colors.text,
            fontWeight: '600',
        },
        activityMetrics: {
            flexDirection: 'row',
            gap: 24,
            paddingVertical: 12,
        },
        metricItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingBottom: 5
            // borderBottomWidth: 1
        },
        metricIcon: {
            width: 20,
            height: 20,
        },
        metricText: {
            fontSize: 16,
            // color: colors.textPrimary,
        },
        metricTextActive: {
            // color: colors.primary,
            // textDecorationLine: 'underline',
        },
        activityList: {
            gap: 16,
            marginTop: 8,
        },
        activityItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 12,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.bottomTabsBorder,
        },
        activityItemIcon: {
            width: 20,
            height: 20,
            marginTop: 2,
        },
        avatarSmall: {

            justifyContent: 'center',
            alignItems: 'center',
        },
        avatarSmallImage: {
            width: 20,
            height: 20,
            borderRadius: 10,
        },
        avatarSmallText: {
            color: colors.primaryDark,
        },
        activityItemContent: {
            flex: 1,
            gap: 4,
        },
        activityItemDate: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            marginTop: 4,
        },
        dateIcon: {
            width: 12,
            height: 12,
        },
        emptyState: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 60,
            gap: 12,
        },
        emptyStateIcon: {
            width: 64,
            height: 64,
        },
    });

export default ActivitySettingsScreen;
