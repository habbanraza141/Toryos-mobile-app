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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EventStackParamList } from "../../navigation/EventStack";

type EventScreenNavigationProp = NativeStackNavigationProp<EventStackParamList, 'EventScreen'>;

const EventScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const navigation = useNavigation<EventScreenNavigationProp>();
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

    // Calendar state
    const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 8)); // December 2025
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 8)); // December 8, 2025

    // Dates with events (highlighted dates)
    const eventDates = [4, 19, 24, 25];

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Previous month's trailing days
        const prevMonth = new Date(year, month, 0);
        const prevMonthDays = prevMonth.getDate();
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            days.push({
                date: prevMonthDays - i,
                isCurrentMonth: false,
                isToday: false,
            });
        }

        // Current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                date: i,
                isCurrentMonth: true,
                isToday: false,
            });
        }

        // Next month's leading days
        const remainingDays = 42 - days.length; // 6 rows * 7 days
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: i,
                isCurrentMonth: false,
                isToday: false,
            });
        }

        return days;
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        if (direction === 'prev') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        setCurrentDate(newDate);
    };

    const handleDateSelect = (day: number, isCurrentMonth: boolean) => {
        if (isCurrentMonth) {
            const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            setSelectedDate(newDate);
        }
    };

    const renderCalendarView = () => {
        const days = getDaysInMonth(currentDate);
        const monthName = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        const selectedDay = selectedDate.getDate();
        const selectedMonth = selectedDate.getMonth();
        const selectedYear = selectedDate.getFullYear();
        const isSelectedMonth = selectedMonth === currentDate.getMonth() && selectedYear === currentDate.getFullYear();

        return (
            <>
                {/* Event Calendar Card */}
                <Card otherStyle={styles.calendarCard}>
                    <View style={styles.calendarHeader}>
                        <TextComp style={styles.calendarIcon}>📅</TextComp>
                        <TextComp bold style={styles.calendarTitle}>Event Calendar</TextComp>
                    </View>
                    <TextComp fontSize={12} style={styles.calendarInstruction}>
                        Dates with events are highlighted. Click any date to see events below.
                    </TextComp>

                    <SpaceComponent />

                    {/* Month Navigation */}
                    <View style={styles.monthNavigation}>
                        <TouchableOpacity onPress={() => navigateMonth('prev')}>
                            <TextComp style={styles.navArrow}>←</TextComp>
                        </TouchableOpacity>
                        <TextComp bold style={styles.monthYear}>
                            {monthName} {year}
                        </TextComp>
                        <TouchableOpacity onPress={() => navigateMonth('next')}>
                            <TextComp style={styles.navArrow}>→</TextComp>
                        </TouchableOpacity>
                    </View>

                    <SpaceComponent />

                    {/* Days of Week Header */}
                    <View style={styles.daysOfWeek}>
                        {dayNames.map((day, index) => (
                            <View key={index} style={styles.dayOfWeek}>
                                <TextComp fontSize={12} style={styles.dayOfWeekText}>
                                    {day}
                                </TextComp>
                            </View>
                        ))}
                    </View>

                    {/* Calendar Grid */}
                    <View style={styles.calendarGrid}>
                        {days.map((dayObj, index) => {
                            const isEventDate = eventDates.includes(dayObj.date) && dayObj.isCurrentMonth;
                            const isSelected = isSelectedMonth && dayObj.isCurrentMonth && dayObj.date === selectedDay;

                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.calendarDay,
                                        isEventDate && !isSelected && styles.eventDay,
                                        isSelected && styles.selectedDay,
                                    ]}
                                    onPress={() => handleDateSelect(dayObj.date, dayObj.isCurrentMonth)}
                                >
                                    <TextComp
                                        fontSize={14}
                                        style={[
                                            styles.dayText,
                                            !dayObj.isCurrentMonth && styles.otherMonthDay,
                                            isSelected && styles.selectedDayText,
                                        ]}
                                    >
                                        {dayObj.date}
                                    </TextComp>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </Card>

                {/* Selected Date Events Card */}
                <Card otherStyle={styles.eventsCard}>
                    <View style={styles.eventsCardHeader}>
                        <View style={styles.eventsCardHeaderLeft}>
                            <TextComp style={styles.calendarIcon}>📅</TextComp>
                            <TextComp bold style={styles.selectedDateTitle}>
                                {selectedDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </TextComp>
                        </View>
                        <View style={styles.eventBadge}>
                            <TextComp fontSize={12} style={styles.eventBadgeText}>
                                0 events
                            </TextComp>
                        </View>
                    </View>

                    <SpaceComponent />

                    {/* Empty State */}
                    <View style={styles.emptyState}>
                        <TextComp style={styles.emptyStateIcon}>📅</TextComp>
                        <TextComp bold style={styles.emptyStateTitle}>
                            No events on this date
                        </TextComp>
                        <TextComp style={styles.emptyStateMessage}>
                            Select a highlighted date to view events
                        </TextComp>
                    </View>
                </Card>
            </>
        );
    };

    const renderListView = () => {
        return (
            <>
                {/* New Event Button */}
                <Button
                    title="New Event"
                    btnStyle={styles.newEventButton}
                    onPress={() => navigation.navigate('CreateEvent')}
                />

                {/* Event Card */}
                <Card otherStyle={styles.eventCard}>
                    {/* Event Header */}
                    <View style={styles.eventHeader}>
                        <View style={styles.eventHeaderLeft}>
                            <View style={styles.avatar}>
                                <TextComp bold style={styles.avatarText}>AG</TextComp>
                            </View>
                            <View style={styles.eventHeaderInfo}>
                                <TextComp bold>Abby Graeter</TextComp>
                                <TextComp fontSize={12}>3 days ago</TextComp>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Image
                                source={require('../../assets/icons/threedots.png')}
                                style={{ tintColor: colors.iconBackground, width: 20, height: 20 }}
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

                    {/* RSVP Buttons */}
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

                    {/* View Guest List Button */}
                    <Button
                        title="View Guest List"
                        // variant="link"
                        btnStyle={styles.guestListButton}
                        btnTextStyle={styles.guestListButtonTextStyle}
                    />

                    <SpaceComponent />

                    {/* Social Actions */}
                    <View style={styles.socialActions}>
                        <TouchableOpacity style={styles.socialAction}>
                            <Image
                                source={require('../../assets/icons/reactionUnfilled.png')}
                                style={[styles.socialActionIcon, { tintColor: colors.iconBackground }]}
                            />
                            <TextComp fontSize={14}>React</TextComp>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialAction}>
                            <Image
                                source={require('../../assets/icons/commentIcon.png')}
                                style={[styles.socialActionIcon, { tintColor: colors.iconBackground }]}
                            />
                            <TextComp fontSize={14}>Add Comment</TextComp>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialAction}>
                            <Image
                                source={require('../../assets/icons/shareIcon.png')}
                                style={[styles.socialActionIcon, { tintColor: colors.iconBackground }]}
                            />
                            <TextComp fontSize={14}>Share</TextComp>
                        </TouchableOpacity>
                    </View>
                </Card>
            </>
        );
    };

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
                            <Image
                                source={require('../../assets/icons/menu.png')}
                                style={[styles.viewModeIcon, { tintColor: viewMode === 'list' ? colors.textPrimary : colors.iconBackground }]}
                            />
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
                            <Image
                                source={require('../../assets/icons/calendar.png')}
                                style={[styles.viewModeIcon, { tintColor: viewMode === 'calendar' ? colors.textPrimary : colors.iconBackground }]}
                            />
                            <TextComp style={[
                                styles.viewModeText,
                                viewMode === 'calendar' && styles.viewModeTextActive
                            ]}>
                                Calendar
                            </TextComp>
                        </TouchableOpacity>
                    </View>

                    {/* Conditional Rendering */}
                    {viewMode === 'calendar' ? renderCalendarView() : renderListView()}
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
            backgroundColor: colors.primaryLight,
            borderColor: colors.primaryLight,
        },
        viewModeIcon: {
            width: 18,
            height: 18,
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
        // Calendar View Styles
        calendarCard: {
            gap: 16,
        },
        calendarHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        calendarIcon: {
            fontSize: 18,
        },
        calendarTitle: {
            fontSize: 18,
        },
        calendarInstruction: {
            color: colors.muted,
            lineHeight: 18,
        },
        monthNavigation: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 8,
        },
        navArrow: {
            fontSize: 20,
            color: colors.default,
            padding: 8,
        },
        monthYear: {
            fontSize: 18,
            color: colors.default,
        },
        daysOfWeek: {
            flexDirection: 'row',
            marginBottom: 8,
        },
        dayOfWeek: {
            flex: 1,
            alignItems: 'center',
        },
        dayOfWeekText: {
            color: colors.muted,
            fontWeight: '600',
        },
        calendarGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 4,
        },
        calendarDay: {
            width: '13%',
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            marginBottom: 4,
        },
        eventDay: {
            backgroundColor: colors.primaryLight,
        },
        selectedDay: {
            backgroundColor: colors.textPrimary,
        },
        dayText: {
            color: colors.default,
            fontWeight: '500',
        },
        otherMonthDay: {
            color: colors.muted,
        },
        selectedDayText: {
            color: colors.white,
            fontWeight: '600',
        },
        eventsCard: {
            gap: 16,
        },
        eventsCardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        eventsCardHeaderLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            flex: 1,
        },
        selectedDateTitle: {
            fontSize: 16,
        },
        eventBadge: {
            backgroundColor: colors.muted35,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
        },
        eventBadgeText: {
            color: colors.default,
        },
        emptyState: {
            alignItems: 'center',
            paddingVertical: 40,
            gap: 12,
        },
        emptyStateIcon: {
            fontSize: 48,
            color: colors.muted,
        },
        emptyStateTitle: {
            fontSize: 16,
            color: colors.textPrimary,
        },
        emptyStateMessage: {
            fontSize: 14,
            color: colors.textPrimary,
        },
        // List View Styles
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
            backgroundColor: colors.primaryLight,
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
            fontSize: 16,
            color: colors.default,
        },
        rsvpButtonText: {
            fontSize: 14,
            color: colors.default,
        },
        guestListButton: {
            backgroundColor: colors.background,
            borderColor: colors.btnTextPrimary,
            borderWidth: 1
        },
        guestListButtonTextStyle: {
            color: colors.btnTextPrimary,
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
            fontSize: 16,
        },
        socialActionIcon: {
            width: 18,
            height: 18,
        },
    });
};

export default EventScreen;
