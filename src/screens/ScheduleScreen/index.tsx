import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import HeaderComp from "../../components/HeaderComp";
import Card from "../../components/Card";
import TextAreaComp from "../../components/TextAreaComp";
import Button from "../../components/Button";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import SpaceComponent from "../../components/SpaceComponent";
import DropdownComp from "../../components/DropdownComp";

const ScheduleScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedSpace, setSelectedSpace] = useState<string>('');

    const tabs = ['Write', 'Preview'];

    const spaceOptions = [
        { label: 'Company → Announcements', value: 'company-announcements' },
        { label: 'Company → Social', value: 'company-social' },
        { label: 'Company → Tech Tips + Troubleshooting', value: 'company-tech-tips' },
        { label: 'Company → Preferred Partners/Vendors', value: 'company-partners' },
        { label: 'Company → Max Influence', value: 'company-max-influence' },
    ];

    return (
        <BackgroundContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <HeaderComp title="Scheduled Posts" />
                        <TextComp>Posts in this group</TextComp>
                    </View>

                    {/* Post Creation Card */}
                    <Card otherStyle={styles.postCard}>
                        {/* Tabs */}
                        <View style={styles.tabsContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    activeTab === 0 && styles.tabActive
                                ]}
                                onPress={() => setActiveTab(0)}
                            >
                                <Image
                                    source={require('../../assets/icons/write.png')}
                                    style={[
                                        styles.tabIcon,
                                        { tintColor: activeTab === 0 ? colors.textPrimary : colors.iconBackground }
                                    ]}
                                />
                                <TextComp style={[
                                    styles.tabText,
                                    activeTab === 0 && styles.tabTextActive
                                ]}>
                                    Write
                                </TextComp>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    activeTab === 1 && styles.tabActive
                                ]}
                                onPress={() => setActiveTab(1)}
                            >
                                <Image
                                    source={require('../../assets/icons/preview.png')}
                                    style={[
                                        styles.tabIcon,
                                        { tintColor: activeTab === 1 ? colors.textPrimary : colors.iconBackground }
                                    ]}
                                />
                                <TextComp style={[
                                    styles.tabText,
                                    activeTab === 1 && styles.tabTextActive
                                ]}>
                                    Preview
                                </TextComp>
                            </TouchableOpacity>
                        </View>

                        <SpaceComponent />

                        {/* Text Area */}
                        <TextAreaComp
                            placeholder="Share an update, ask a question, or request help from Victoria... (use @ to mention someone)"
                            inputStyle={styles.textArea}
                        />

                        <SpaceComponent />

                        {/* Space Selection */}
                        <DropdownComp
                            placeholder="Choose a space to post in"
                            options={spaceOptions}
                            value={selectedSpace}
                            onSelect={(value, label) => setSelectedSpace(value)}
                            containerStyle={styles.spaceSelector}
                        />

                        <SpaceComponent />

                        {/* Post Options Row */}
                        <View style={styles.postOptionsRow}>
                            <TouchableOpacity style={styles.postOption}>
                                <Image
                                    source={require('../../assets/icons/upload.png')}
                                    style={[styles.postOptionIcon, { tintColor: colors.iconBackground }]}
                                />
                                <TextComp fontSize={12} style={styles.postOptionLabel}>Attach</TextComp>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.postOption}>
                                <Image
                                    source={require('../../assets/icons/video.png')}
                                    style={[styles.postOptionIcon, { tintColor: colors.iconBackground }]}
                                />
                                <TextComp fontSize={12} style={styles.postOptionLabel}>Video</TextComp>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postOption}>
                                <Image
                                    source={require('../../assets/icons/poll.png')}
                                    style={[styles.postOptionIcon, { tintColor: colors.iconBackground }]}
                                />
                                <TextComp fontSize={12} style={styles.postOptionLabel}>Poll</TextComp>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postOption}>
                                <Image
                                    source={require('../../assets/icons/scheduled.png')}
                                    style={[styles.postOptionIcon, { tintColor: colors.iconBackground }]}
                                />
                                <TextComp fontSize={12} style={styles.postOptionLabel}>Schedule</TextComp>
                            </TouchableOpacity>
                        </View>
                        <Button
                            title="Publish"
                            btnStyle={styles.publishButton}
                        />
                    </Card>

                    {/* No Posts Card */}
                    <Card otherStyle={styles.emptyCard}>
                        <View style={styles.emptyCardContent}>
                            <View style={styles.emptyIconContainer}>
                                <Image
                                    source={require('../../assets/icons/post.png')}
                                    style={[styles.emptyIcon, { tintColor: colors.primaryDark }]}
                                />
                            </View>
                            <TextComp bold style={styles.emptyTitle}>
                                No posts yet.
                            </TextComp>
                            <TextComp style={styles.emptyMessage}>
                                Be the first to share something!
                            </TextComp>
                        </View>
                    </Card>
                </View>
            </ScrollView>
        </BackgroundContainer>
    );
};

const createStyleSheet = (colors: ColorPalette) => {
    return StyleSheet.create({
        container: {
            gap: 20,
            paddingBottom: 20,
        },
        topContainer: {
            gap: 5,
        },
        postCard: {
            gap: 16,
        },
        tabsContainer: {
            flexDirection: 'row',
            gap: 12,
            marginBottom: 8,
        },
        tab: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.bottomTabsBorder,
            backgroundColor: colors.secondaryBackground,
        },
        tabActive: {
            backgroundColor: colors.primaryLight,
            borderColor: colors.primaryLight,
        },
        tabIcon: {
            width: 18,
            height: 18,
        },
        tabText: {
            fontSize: 14,
            color: colors.default,
        },
        tabTextActive: {
            color: colors.textPrimary,
            fontWeight: '600',
        },
        textArea: {
            minHeight: 120,
        },
        spaceSelector: {
            // Styles handled by DropdownComp
        },
        postOptionsRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12,
            // flexWrap: 'wrap',
        },
        postOption: {
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            padding: 8,
        },
        postOptionActive: {
            backgroundColor: colors.muted35,
            borderRadius: 8,
        },
        postOptionIcon: {
            width: 20,
            height: 20,
        },
        postOptionLabel: {
            color: colors.default,
        },
        fileIcon: {
            width: 32,
            height: 32,
            borderRadius: 6,
            backgroundColor: colors.textPrimary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        fileIconText: {
            fontSize: 18,
            color: colors.white,
        },
        publishButtonContainer: {
            marginLeft: 'auto',
        },
        publishButton: {
            paddingHorizontal: 20,
        },
        emptyCard: {
            borderStyle: 'dashed',
            borderWidth: 2,
            borderColor: colors.bottomTabsBorder,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 300,
        },
        emptyCardContent: {
            alignItems: 'center',
            gap: 16,
        },
        emptyIconContainer: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.primaryLight,
            justifyContent: 'center',
            alignItems: 'center',
        },
        emptyIcon: {
            width: 40,
            height: 40,
        },
        emptyTitle: {
            fontSize: 18,
            color: colors.default,
        },
        emptyMessage: {
            fontSize: 14,
            color: colors.muted,
        },
    });
};

export default ScheduleScreen;
