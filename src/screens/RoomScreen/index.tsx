import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import HeaderComp from "../../components/HeaderComp";
import Card from "../../components/Card";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import SpaceComponent from "../../components/SpaceComponent";
import TextInputComp from "../../components/TextInputComp";
import SearchBarComp from "../../components/SearchBarComp";
import BackButton from "../../components/BackButton";

interface Room {
    id: string;
    title: string;
    description?: string;
    label?: string;
    icon: any;
}

const RoomScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const [searchText, setSearchText] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');

    const rooms: Room[] = [
        {
            id: '1',
            title: 'Conference Room A',
            description: 'Book a conference room for your meeting.',
            label: 'Built-in',
            icon: require('../../assets/icons/room.png'),
        },
        {
            id: '2',
            title: 'Conference Room B',
            description: 'Spacious room with video conferencing.',
            label: 'Built-in',
            icon: require('../../assets/icons/room.png'),
        },
        {
            id: '3',
            title: 'Meeting Room C',
            icon: require('../../assets/icons/room.png'),
        },
        {
            id: '4',
            title: 'Board Room',
            description: 'Executive board room with premium amenities.',
            icon: require('../../assets/icons/room.png'),
        },
        {
            id: '5',
            title: 'Training Room',
            icon: require('../../assets/icons/room.png'),
        },
        {
            id: '6',
            title: 'Collaboration Space',
            icon: require('../../assets/icons/room.png'),
        },
        {
            id: '7',
            title: 'Quiet Room',
            icon: require('../../assets/icons/room.png'),
        },
    ];

    const filters = ['All', 'Available', 'Booked'];

    const filteredRooms = rooms.filter(room => {
        if (selectedFilter === 'All') return true;
        return room.label === selectedFilter;
    });

    const searchFilteredRooms = filteredRooms.filter(room =>
        room.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderRoomCard = (room: Room) => (
        <TouchableOpacity
            key={room.id}
            style={styles.roomCard}
            activeOpacity={0.7}
        >
            <View style={styles.roomIconContainer}>
                <Image
                    source={room.icon}
                    style={[styles.roomIcon, { tintColor: colors.primaryDark }]}
                    resizeMode="contain"
                />
            </View>
            <TextComp fontSize={14} bold numberOfLines={2}>
                {room.title}
            </TextComp>
            {room.description && (
                <>
                    <TextComp center fontSize={10} color="muted" >
                        {room.description}
                    </TextComp>
                </>
            )}
            {room.label && (
                <>
                    <View style={styles.labelContainer}>
                        <TextComp fontSize={10} >
                            {room.label}
                        </TextComp>
                    </View>
                </>
            )}
        </TouchableOpacity>
    );

    return (
        <BackgroundContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerContent}>
                            <View style={styles.headerText}>
                                <BackButton />

                                <HeaderComp title="Rooms" />
                                <TextComp fontSize={14} color="muted">
                                    Book and manage conference rooms and meeting spaces.
                                </TextComp>
                            </View>
                        </View>
                    </View>

                    <SearchBarComp />

                    <View style={styles.filterContainer}>
                        {filters.map((filter) => (
                            <TouchableOpacity
                                key={filter}
                                style={[
                                    styles.filterButton,
                                    selectedFilter === filter && styles.filterButtonActive,
                                ]}
                                onPress={() => setSelectedFilter(filter)}
                            >
                                <TextComp
                                    fontSize={14}
                                >
                                    {filter}
                                </TextComp>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.roomsGrid}>
                        {searchFilteredRooms.map(renderRoomCard)}
                    </View>
                </View>
            </ScrollView>
        </BackgroundContainer>
    );
};

const createStyleSheet = (colors: ColorPalette) => {
    return StyleSheet.create({
        container: {
            gap: 20,
        },
        headerContainer: {
            gap: 12,
        },
        headerContent: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 12,
        },
        headerIcon: {
            width: 32,
            height: 32,
            marginTop: 4,
        },
        headerText: {
            flex: 1,
            gap: 4,
        },
        searchContainer: {
            width: '100%',
        },
        searchInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.secondaryBackground,
            borderRadius: 12,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: colors.bottomTabsBorder,
            gap: 12,
        },
        searchIcon: {
            width: 20,
            height: 20,
        },
        searchInput: {
            flex: 1,
            borderWidth: 0,
            backgroundColor: 'transparent',
            padding: 0,
        },
        filterContainer: {
            flexDirection: 'row',
            gap: 12,
        },
        filterButton: {
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: colors.secondaryBackground,
            borderWidth: 1,
            borderColor: colors.bottomTabsBorder,
        },
        filterButtonActive: {
            backgroundColor: colors.primaryLight,
            borderColor: colors.primaryLight,
        },
        roomsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'space-between',
        },
        roomCard: {
            width: '48%',
            backgroundColor: colors.secondaryBackground,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.bottomTabsBorder,
            minHeight: 140,
            alignItems: 'center',
            gap: 5,
            justifyContent: 'center',
        },
        roomIconContainer: {
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: colors.primaryLight,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
        },
        roomIcon: {
            width: 24,
            height: 24,
        },
        labelContainer: {
            backgroundColor: colors.backgroundThree,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
        },
    });
};

export default RoomScreen;

