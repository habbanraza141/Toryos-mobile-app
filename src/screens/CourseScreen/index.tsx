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

interface Course {
    id: string;
    title: string;
    description?: string;
    label?: string;
    icon: any;
}

const CourseScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const [searchText, setSearchText] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');

    const courses: Course[] = [
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

    const filteredCourses = courses.filter(course => {
        if (selectedFilter === 'All') return true;
        return course.label === selectedFilter;
    });

    const searchFilteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderCourseCard = (course: Course) => (
        <TouchableOpacity
            key={course.id}
            style={styles.courseCard}
            activeOpacity={0.7}
        >
            <View style={styles.courseIconContainer}>
                <Image
                    source={course.icon}
                    style={[styles.courseIcon, { tintColor: colors.primaryDark }]}
                    resizeMode="contain"
                />
            </View>
            <TextComp fontSize={14} bold numberOfLines={2} center>
                {course.title}
            </TextComp>
            {course.description && (
                <>
                    <TextComp center fontSize={10} color="muted" >
                        {course.description}
                    </TextComp>
                </>
            )}
            {course.label && (
                <>
                    <View style={styles.labelContainer}>
                        <TextComp fontSize={10} >
                            {course.label}
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

                                <HeaderComp title="Courses" />
                                <TextComp fontSize={14} color="muted">
                                    Access training courses and educational resources.
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

                    <View style={styles.coursesGrid}>
                        {searchFilteredCourses.map(renderCourseCard)}
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
        coursesGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'space-between',
        },
        courseCard: {
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
        courseIconContainer: {
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: colors.primaryLight,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
        },
        courseIcon: {
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

export default CourseScreen;

