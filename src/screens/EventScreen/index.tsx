import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import HeaderComp from "../../components/HeaderComp";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import SpaceComponent from "../../components/SpaceComponent";

const EventScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

    return (
        <BackgroundContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <HeaderComp title="Events" />
                        <TextComp>All upcoming and past events</TextComp>
                    </View>

                    {/* View Mode Toggle */}
                    <View style={styles.viewModeContainer}>
                        <TouchableOpacity
                            style={[
                                styles.viewModeButton,
                                viewMode === 'list' && styles.viewModeButtonActive
                            ]}
                            onPress={() => setViewMode('list')}
                        >
                            <TextComp style={styles.viewModeIcon}>☰</TextComp>
                            <TextComp style={[
                                styles.viewModeText,
                                viewMode === 'list' && styles.viewModeTextActive
                            ]}>
                                List
                            </TextComp>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.viewModeButton,
                                viewMode === 'calendar' && styles.viewModeButtonActive
                            ]}
                            onPress={() => setViewMode('calendar')}
                        >
                            <TextComp style={styles.viewModeIcon}>📅</TextComp>
                            <TextComp style={[
                                styles.viewModeText,
                                viewMode === 'calendar' && styles.viewModeTextActive
                            ]}>
                                Calendar
                            </TextComp>
                        </TouchableOpacity>
                    </View>

                    {/* New Event Button */}
                    <Button
                        title="New Event"
                        btnStyle={styles.newEventButton}
                    />

                    {/* Event Card */}
                    <Card otherStyle={styles.eventCard}>
                        {/* Event Header */}
                        <View style={styles.eventHeader}>
                            <View style={styles.eventHeaderLeft}>
                                <View style={styles.avatar}>
                                    <TextComp zero bold style={styles.avatarText}>AG</TextComp>
                                </View>
                                <View style={styles.eventHeaderInfo}>
                                    <TextComp bold>Abby Graeter</TextComp>
                                    <TextComp fontSize={12}>3 days ago</TextComp>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Image
                                    source={require('../../assets/icons/threedots.png')}
                                    style={{ tintColor: colors.white, width: 20, height: 20 }}
                                />
                            </TouchableOpacity>
                        </View>

                        <SpaceComponent />

                        {/* Event Title */}
                        <View style={styles.eventInfoRow}>
                            <TextComp style={styles.eventInfoIcon}>📅</TextComp>
                            <TextComp style={styles.eventTitle}>
                                Annual Holiday Reception and Toys for Tots Drive
                            </TextComp>
                        </View>

                        {/* Event Date */}
                        <View style={styles.eventInfoRow}>
                            <TextComp style={styles.eventInfoIcon}>📅</TextComp>
                            <TextComp fontSize={14}>
                                Thursday, December 4, 2025 at 01:00 AM
                            </TextComp>
                        </View>

                        {/* Event Location */}
                        <View style={styles.eventInfoRow}>
                            <TextComp style={styles.eventInfoIcon}>📍</TextComp>
                            <TextComp fontSize={14}>
                                Carillon Park, 1000 Carillon Blvd. in Dayton
                            </TextComp>
                        </View>

                        <SpaceComponent />

                        {/* Event Details */}
                        <TextComp bold style={styles.eventDetailsTitle}>
                            Annual Holiday Reception and Toys for Tots Drive
                        </TextComp>

                        <View style={styles.eventInfoRow}>
                            <TextComp style={styles.eventInfoIcon}>📅</TextComp>
                            <TextComp fontSize={14}>
                                When: Wednesday, December 3, 2025, 3-6pm
                            </TextComp>
                        </View>

                        <View style={styles.eventInfoRow}>
                            <TextComp style={styles.eventInfoIcon}>📍</TextComp>
                            <TextComp fontSize={14}>
                                Where: Carillon Park, 1000 Carillon Blvd. in Dayton
                            </TextComp>
                        </View>

                        <SpaceComponent />

                        <TextComp fontSize={14} style={styles.eventDescription}>
                            Get ready to celebrate and spread some serious holiday cheer! Bring a brand new toy or gift for a child or teen to donate to Toys for Tots. After you drop off your donation, enjoy great fellowship, delicious food, the Treasures Raffle, the YPN Ugly Sweater Contest, and a photo op with Santa and Mrs. Claus!
                        </TextComp>

                        <SpaceComponent />

                        <TextComp fontSize={14}>
                            Fee: $35 per person in advan...
                        </TextComp>
                        <TouchableOpacity>
                            <TextComp style={styles.readMoreLink}>Read more</TextComp>
                        </TouchableOpacity>

                        <SpaceComponent />

                        <View style={styles.rsvpContainer}>
                            <TouchableOpacity style={styles.rsvpButton}>
                                <TextComp style={styles.rsvpIcon}>✓</TextComp>
                                <TextComp style={styles.rsvpButtonText}>Going</TextComp>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rsvpButton}>
                                <TextComp style={styles.rsvpIcon}>○</TextComp>
                                <TextComp style={styles.rsvpButtonText}>Maybe</TextComp>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rsvpButton}>
                                <TextComp style={styles.rsvpIcon}>✕</TextComp>
                                <TextComp style={styles.rsvpButtonText}>Can't go (1)</TextComp>
                            </TouchableOpacity>
                        </View>

                        <SpaceComponent />

                        <Button
                            title="View Guest List"
                            btnStyle={styles.guestListButton}
                        />

                        <SpaceComponent />

                        {/* Social Actions */}
                        <View style={styles.socialActions}>
                            <TouchableOpacity style={styles.socialAction}>
                                <TextComp >👍</TextComp>
                                <TextComp fontSize={14}>React</TextComp>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialAction}>
                                <TextComp >💬</TextComp>
                                <TextComp fontSize={14}>Add Comment</TextComp>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialAction}>
                                <TextComp >➢</TextComp>
                                <TextComp fontSize={14}>Share</TextComp>
                            </TouchableOpacity>
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
        viewModeContainer: {
            flexDirection: 'row',
            gap: 12,
            marginTop: 10,
        },
        viewModeButton: {
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
        viewModeButtonActive: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
        },
        viewModeIcon: {
            fontSize: 18,
        },
        viewModeText: {
            fontSize: 14,
            color: colors.default,
        },
        viewModeTextActive: {
            color: colors.textPrimary,
            fontWeight: '600',
        },
        newEventButton: {
            marginTop: 10,
        },
        eventCard: {
            gap: 12,
        },
        eventHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        eventHeaderLeft: {
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
        },
        avatar: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        avatarText: {
            color: colors.textPrimary,
            fontSize: 16,
            fontWeight: '600',
        },
        eventHeaderInfo: {
            gap: 4,
        },
        eventInfoRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 8,
            marginBottom: 8,
        },
        eventInfoIcon: {
            fontSize: 16,
            marginTop: 2,
        },
        eventTitle: {
            fontSize: 16,
            color: colors.textPrimary,
            fontWeight: '600',
            flex: 1,
        },
        eventDetailsTitle: {
            fontSize: 18,
            marginBottom: 8,
        },
        eventDescription: {
            lineHeight: 20,
            color: colors.default,
        },
        readMoreLink: {
            fontSize: 14,
            color: colors.textPrimary,
            marginTop: 4,
        },
        rsvpContainer: {
            flexDirection: 'row',
            gap: 8,
        },
        rsvpButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 20,
            backgroundColor: colors.secondaryBackground,
            borderWidth: 1,
            borderColor: colors.bottomTabsBorder,
        },
        rsvpIcon: {
            fontSize: 14,
            color: colors.default,
        },
        rsvpButtonText: {
            fontSize: 14,
            color: colors.default,
        },
        guestListButton: {
            alignSelf: 'center',
        },
        socialActions: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 8,
            borderTopWidth: 1,
            borderTopColor: colors.bottomTabsBorder,
        },
        socialAction: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            padding: 8,
        },
        socialIcon: {
            fontSize: 18,
        },
    });
};

export default EventScreen;
