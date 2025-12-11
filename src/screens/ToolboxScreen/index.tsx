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

interface Tool {
    id: string;
    title: string;
    description?: string;
    label?: string;
    icon: any;
}

const ToolboxScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const [searchText, setSearchText] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');

    const tools: Tool[] = [
        {
            id: '1',
            title: 'Conference Rooms',
            description: 'Book a conference room for your meeting.',
            label: 'Built-in',
            icon: require('../../assets/icons/room.png'),
        },
        {
            id: '2',
            title: 'Logo Gallery',
            description: 'Download official ToryOS and Victoria logos.',
            label: 'Built-in',
            icon: require('../../assets/icons/tool.png'),
        },
        {
            id: '3',
            title: 'Dayton Realtors',
            icon: require('../../assets/icons/tool.png'),
        },
        {
            id: '4',
            title: 'CincyMLS',
            icon: require('../../assets/icons/tool.png'),
        },

        {
            id: '5',
            title: 'Experience.com',
            icon: require('../../assets/icons/experience.png'),
        },
        {
            id: '6',
            title: 'GIS',
            icon: require('../../assets/icons/gis.png'),
        },

        {
            id: '7',
            title: 'NKY MLS',
            icon: require('../../assets/icons/nky.png'),
        },

    ];

    const filters = ['All', 'User Interface Design'];

    const filteredTools = tools.filter(tool => {
        if (selectedFilter === 'All') return true;
        return tool.label === selectedFilter;
    });

    const searchFilteredTools = filteredTools.filter(tool =>
        tool.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderToolCard = (tool: Tool) => (
        <TouchableOpacity
            key={tool.id}
            style={styles.toolCard}
            activeOpacity={0.7}
        >
            <View style={styles.toolIconContainer}>
                <Image
                    source={tool.icon}
                    style={[styles.toolIcon, { tintColor: colors.primaryDark }]}
                    resizeMode="contain"
                />
            </View>
            <TextComp fontSize={14} bold numberOfLines={2}>
                {tool.title}
            </TextComp>
            {tool.description && (
                <>
                    <TextComp center fontSize={10} color="muted" >
                        {tool.description}
                    </TextComp>
                </>
            )}
            {tool.label && (
                <>
                    <View style={styles.labelContainer}>
                        <TextComp fontSize={10} >
                            {tool.label}
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
                                <HeaderComp title="Toolbox" />
                                <TextComp fontSize={14} color="muted">
                                    Quick access to all your essential tools and resources.
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

                    <View style={styles.toolsGrid}>
                        {searchFilteredTools.map(renderToolCard)}
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
        toolsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'space-between',
        },
        toolCard: {
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
        toolIconContainer: {
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: colors.primaryLight,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
        },
        toolIcon: {
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

export default ToolboxScreen;

