import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import HeaderComp from "../../components/HeaderComp";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import SearchBarComp from "../../components/SearchBarComp";

interface Profile {
    id: string;
    title: string;
    description?: string;
    label?: string;
    icon: any;
}

const ProfileScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const [searchText, setSearchText] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');

    const profiles: Profile[] = [
        {
            id: '1',
            title: 'Real Estate Fundamentals',
            description: 'Learn the basics of real estate transactions.',
            label: 'Built-in',
            icon: require('../../assets/icons/topi.png'),
        },
        {
            id: '2',
            title: 'Advanced Negotiation',
            description: 'Master the art of real estate negotiation.',
            label: 'Built-in',
            icon: require('../../assets/icons/topi.png'),
        },
        {
            id: '3',
            title: 'Property Management',
            icon: require('../../assets/icons/topi.png'),
        },
        {
            id: '4',
            title: 'Market Analysis',
            description: 'Understand market trends and pricing strategies.',
            icon: require('../../assets/icons/topi.png'),
        },
        {
            id: '5',
            title: 'Legal Compliance',
            icon: require('../../assets/icons/topi.png'),
        },
        {
            id: '6',
            title: 'Client Relations',
            icon: require('../../assets/icons/topi.png'),
        },
        {
            id: '7',
            title: 'Digital Marketing',
            icon: require('../../assets/icons/topi.png'),
        },
    ];

    const filters = ['All', 'In Progress', 'Completed'];

    const filteredProfiles = profiles.filter(profile => {
        if (selectedFilter === 'All') return true;
        return profile.label === selectedFilter;
    });

    const searchFilteredProfiles = filteredProfiles.filter(profile =>
        profile.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderProfileCard = (profile: Profile) => (
        <TouchableOpacity
            key={profile.id}
            style={styles.profileCard}
            activeOpacity={0.7}
        >
            <View style={styles.profileIconContainer}>
                <Image
                    source={profile.icon}
                    style={[styles.profileIcon, { tintColor: colors.primaryDark }]}
                    resizeMode="contain"
                />
            </View>
            <TextComp fontSize={14} bold numberOfLines={2} center>
                {profile.title}
            </TextComp>
            {profile.description && (
                <TextComp center fontSize={10} color="muted">
                    {profile.description}
                </TextComp>
            )}
            {profile.label && (
                <View style={styles.labelContainer}>
                    <TextComp fontSize={10}>{profile.label}</TextComp>
                </View>
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
                                <HeaderComp title="Profiles" />
                                <TextComp fontSize={14} color="muted">
                                    Access training profiles and educational resources.
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
                                <TextComp fontSize={14}>{filter}</TextComp>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.profilesGrid}>
                        {searchFilteredProfiles.map(renderProfileCard)}
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
        headerText: {
            flex: 1,
            gap: 4,
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

        profilesGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'space-between',
        },

        profileCard: {
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

        profileIconContainer: {
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: colors.primaryLight,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
        },
        profileIcon: {
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

export default ProfileScreen;
