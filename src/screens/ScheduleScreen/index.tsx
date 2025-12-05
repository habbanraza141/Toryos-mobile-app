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

const ScheduleScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const [activeTab, setActiveTab] = useState(0);

    const tabs = ['Write', 'Preview'];

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
                                <TextComp style={styles.tabIcon}>✏️</TextComp>
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
                                <TextComp style={styles.tabIcon}>👁️</TextComp>
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
                        <TouchableOpacity style={styles.spaceSelector}>
                            <TextComp fontSize={14}>Choose a space to post in</TextComp>
                            <Image
                                source={require('../../assets/icons/rightArrow.png')}
                                style={[styles.chevronIcon, { transform: [{ rotate: '90deg' }] }]}
                            />
                        </TouchableOpacity>

                        <SpaceComponent />

                        {/* Post Options Row */}
                        <View style={styles.postOptionsRow}>
                            <TouchableOpacity style={styles.postOption}>
                                <TextComp style={styles.postOptionIcon}>😊</TextComp>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postOption}>
                                <TextComp style={styles.postOptionIcon}>⬆️</TextComp>
                                <TextComp fontSize={12} style={styles.postOptionLabel}>Attach</TextComp>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.postOption, styles.postOptionActive]}>
                                <View style={styles.fileIcon}>
                                    <TextComp style={styles.fileIconText}>📄</TextComp>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postOption}>
                                <TextComp style={styles.postOptionIcon}>📹</TextComp>
                                <TextComp fontSize={12} style={styles.postOptionLabel}>Video</TextComp>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postOption}>
                                <TextComp style={styles.postOptionIcon}>📊</TextComp>
                                <TextComp fontSize={12} style={styles.postOptionLabel}>Poll</TextComp>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postOption}>
                                <TextComp style={styles.postOptionIcon}>🕐</TextComp>
                                <TextComp fontSize={12} style={styles.postOptionLabel}>Schedule</TextComp>
                            </TouchableOpacity>
                            <View style={styles.publishButtonContainer}>
                                <Button
                                    title="Publish"
                                    btnStyle={styles.publishButton}
                                />
                            </View>
                        </View>
                    </Card>

                    {/* No Posts Card */}
                    <Card otherStyle={styles.emptyCard}>
                        <View style={styles.emptyCardContent}>
                            <View style={styles.emptyIconContainer}>
                                <TextComp style={styles.emptyIcon}>💬</TextComp>
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
            gap: 8,
            marginBottom: 8,
        },
        tab: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: 'transparent',
        },
        tabActive: {
            backgroundColor: colors.muted35,
        },
        tabIcon: {
            fontSize: 16,
        },
        tabText: {
            fontSize: 14,
            color: colors.default,
        },
        tabTextActive: {
            color: colors.default,
            fontWeight: '600',
        },
        textArea: {
            minHeight: 120,
        },
        spaceSelector: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.bottomTabsBorder,
            backgroundColor: colors.secondaryBackground,
        },
        chevronIcon: {
            width: 16,
            height: 16,
            tintColor: colors.default,
        },
        postOptionsRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
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
            fontSize: 18,
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
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        emptyIcon: {
            fontSize: 18,
            paddingBottom: 0
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
