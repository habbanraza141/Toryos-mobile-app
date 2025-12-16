import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import TextComp from "../../components/TextComp";
import Card from "../../components/Card";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";

type ActivitySubTab = 'interactions' | 'posts' | 'history';

const ActivitySettingsScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const [activeActivityTab, setActiveActivityTab] = useState<ActivitySubTab>('interactions');

    const activityTabs = [
        { id: 'interactions', label: 'Interactions', icon: require('../../assets/icons/rightArrow.png') },
        { id: 'posts', label: 'Your Posts', icon: require('../../assets/icons/post.png') },
        { id: 'history', label: 'Account History', icon: require('../../assets/icons/clock.png') },
    ];

    const activityItems = [
        {
            id: '1',
            type: 'like',
            user: { name: 'HARIS', initials: 'H', avatar: null },
            content: 'I have a listing in Miami County and would like to put it in their MLS. Wher...',
            date: 'Dec 15, 2025 · 11:52 PM',
        },
        {
            id: '2',
            type: 'like',
            user: { name: 'Tom Brookey', initials: 'TB', avatar: require('../../assets/images/image.jpg') },
            content: 'when are we doing the trip to the zoo?',
            date: 'Nov 24, 2025 · 6:39 PM',
        },
    ];

    return (
        <Card otherStyle={styles.sectionCard}>
            <TextComp bold fontSize={18}>Activity Log</TextComp>
            <TextComp fontSize={14} color="muted">
                Review your interactions, posts, and account history
            </TextComp>

            <View style={styles.activityStats}>
                <View style={styles.statItem}>
                    <Image source={require('../../assets/icons/reactionFilled.png')} style={styles.statIcon} />
                    <TextComp fontSize={16} bold>2</TextComp>
                </View>
                <View style={styles.statItem}>
                    <Image source={require('../../assets/icons/commentIcon.png')} style={styles.statIcon} />
                    <TextComp fontSize={16} bold>0</TextComp>
                </View>
                <View style={styles.statItem}>
                    <Image source={require('../../assets/icons/post.png')} style={styles.statIcon} />
                    <TextComp fontSize={16} bold>3</TextComp>
                </View>
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
                                { tintColor: activeActivityTab === tab.id ? colors.primary : colors.iconBackground }
                            ]}
                        />
                        <TextComp
                            fontSize={14}
                            style={[
                                styles.activityTabText,
                                activeActivityTab === tab.id && { color: colors.primary }
                            ]}
                        >
                            {tab.label}
                        </TextComp>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.activityList}>
                {activityItems.map((item) => (
                    <View key={item.id} style={styles.activityItem}>
                        <Image
                            source={require('../../assets/icons/reactionUnfilled.png')}
                            style={[styles.activityItemIcon, { tintColor: colors.iconBackground }]}
                        />
                        <View style={styles.avatarSmall}>
                            {item.user.avatar ? (
                                <Image source={item.user.avatar} style={styles.avatarSmallImage} />
                            ) : (
                                <TextComp bold fontSize={12} style={styles.avatarSmallText}>
                                    {item.user.initials}
                                </TextComp>
                            )}
                        </View>
                        <View style={styles.activityItemContent}>
                            <TextComp bold fontSize={14}>{item.user.name}</TextComp>
                            <TextComp fontSize={12} color="muted" numberOfLines={1}>{item.content}</TextComp>
                            <View style={styles.activityItemDate}>
                                <Image
                                    source={require('../../assets/icons/calendar.png')}
                                    style={[styles.dateIcon, { tintColor: colors.iconBackground }]}
                                />
                                <TextComp fontSize={11} color="muted">{item.date}</TextComp>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </Card>
    );
};

const createStyleSheet = (colors: ColorPalette) =>
    StyleSheet.create({
        sectionCard: {
            gap: 20,
        },
        activityStats: {
            flexDirection: 'row',
            gap: 24,
            paddingVertical: 12,
        },
        statItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
        },
        statIcon: {
            width: 20,
            height: 20,
            tintColor: colors.iconBackground,
        },
        activityTabsContainer: {
            flexDirection: 'row',
            gap: 8,
            paddingVertical: 8,
        },
        activityTab: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 6,
            backgroundColor: 'transparent',
        },
        activityTabActive: {
            backgroundColor: colors.primaryLight,
        },
        activityTabIcon: {
            width: 16,
            height: 16,
        },
        activityTabText: {
            color: colors.iconBackground,
        },
        activityList: {
            gap: 12,
            marginTop: 8,
        },
        activityItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 12,
        },
        activityItemIcon: {
            width: 20,
            height: 20,
            marginTop: 2,
        },
        avatarSmall: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.primaryLight,
            justifyContent: 'center',
            alignItems: 'center',
        },
        avatarSmallImage: {
            width: 40,
            height: 40,
            borderRadius: 20,
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
            marginTop: 2,
        },
        dateIcon: {
            width: 12,
            height: 12,
        },
    });

export default ActivitySettingsScreen;

