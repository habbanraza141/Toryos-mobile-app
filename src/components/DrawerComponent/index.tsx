import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import TextComp from '../TextComp';
import Button from '../Button';
import { useTheme } from '../../hooks/useTheme';
import { ColorPalette, getColors } from '../../theme/colors';
import { DrawerActions, CommonActions } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerStackParamList } from '../../navigation/DrawerStack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { clearCurrentUser } from '../../store/slices/userSlice';

interface DrawerComponentProps {
    navigation: DrawerNavigationProp<DrawerStackParamList>;
}

const DrawerComponent = ({ navigation }: DrawerComponentProps) => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const dispatch = useDispatch<AppDispatch>();

    const handleClose = () => {
        navigation.dispatch(DrawerActions.closeDrawer());
    };

    const handleLogout = () => {
        dispatch(clearCurrentUser());
        navigation.dispatch(DrawerActions.closeDrawer());
    };

    const handleNavigate = (tabScreen: string, nestedParams?: any) => {
        // Close drawer first
        navigation.dispatch(DrawerActions.closeDrawer());

        // Navigate to TabRoutes with nested screen params
        setTimeout(() => {
            navigation.navigate('TabRoutes', {
                screen: tabScreen,
                params: nestedParams,
            });
        }, 100);
    };

    return (
        <DrawerContentScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header with Logo and Close Button */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                    <View style={styles.closeButtonCircle}>
                        <TextComp style={styles.closeButtonText}>✕</TextComp>
                    </View>
                </TouchableOpacity>
            </View>

            {/* QUICK ACCESS Section */}
            <View style={styles.section}>
                <TextComp style={styles.sectionTitle}>QUICK ACCESS</TextComp>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleNavigate('More', { screen: 'ToolStack' })}
                >
                    <Image
                        source={require('../../assets/icons/tool.png')}
                        style={styles.menuIcon}
                    />
                    <TextComp style={styles.menuItemText}>Toolbox</TextComp>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleNavigate('More', { screen: 'RoomStack' })}
                >
                    <Image
                        source={require('../../assets/icons/room.png')}
                        style={styles.menuIcon}
                    />
                    <TextComp style={styles.menuItemText}>Rooms</TextComp>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleNavigate('More', { screen: 'CourseStack' })}
                >
                    <Image
                        source={require('../../assets/icons/topi.png')}
                        style={styles.menuIcon}
                    />
                    <TextComp style={styles.menuItemText}>Courses</TextComp>
                </TouchableOpacity>
            </View>

            {/* FEED Section */}
            <View style={styles.section}>
                <TextComp style={styles.sectionTitle}>FEED</TextComp>
                <TouchableOpacity
                    style={[styles.menuItem, styles.activeMenuItem]}
                    onPress={() => handleNavigate('Home', { screen: 'HomeScreen' })}
                >
                    <Image
                        source={require('../../assets/icons/home.png')}
                        style={styles.menuIcon}
                    />
                    <TextComp style={styles.menuItemText}>All Posts</TextComp>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleNavigate('Event', { screen: 'EventScreen' })}
                >
                    <Image
                        source={require('../../assets/icons/event.png')}
                        style={styles.menuIcon}
                    />
                    <TextComp style={styles.menuItemText}>Events</TextComp>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleNavigate('Schedule', { screen: 'ScheduleScreen' })}
                >
                    <Image
                        source={require('../../assets/icons/clock.png')}
                        style={styles.menuIcon}
                    />
                    <TextComp style={styles.menuItemText}>Scheduled</TextComp>
                </TouchableOpacity>
            </View>

            {/* Logout Button */}
            <View style={styles.logoutSection}>
                <Button
                    title="Logout"
                    onPress={handleLogout}
                    btnStyle={styles.logoutButton}
                    btnTextStyle={styles.logoutButtonText}
                />
            </View>
        </DrawerContentScrollView>
    );
};

const createStyleSheet = (colors: ColorPalette) => {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.background,
        },
        contentContainer: {
            paddingTop: 40,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingBottom: 20,
        },
        logoContainer: {
            // flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
            // gap: 12,
        },
        logo: {
            width: 100,
            height: 60,
        },
        logoText: {
            fontSize: 16,
            fontWeight: '600',
            color: colors.textPrimary,
            letterSpacing: 0.5,
        },
        closeButton: {
            padding: 4,
        },
        closeButtonCircle: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        closeButtonText: {
            color: colors.textPrimary,
            fontSize: 18,
            fontWeight: 'bold',
        },
        section: {
            paddingHorizontal: 20,
            marginBottom: 24,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: '700',
            color: colors.textPrimary,
            letterSpacing: 1,
            marginBottom: 12,
            textTransform: 'uppercase',
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 8,
            gap: 12,
        },
        activeMenuItem: {
            backgroundColor: colors.secondaryBackground,
            borderRadius: 8,
        },
        menuIcon: {
            width: 20,
            height: 20,
            tintColor: colors.iconBackground
        },
        menuItemText: {
            fontSize: 16,
            color: colors.text,
            fontWeight: '500',
        },
        logoutSection: {
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 40,
            marginTop: 'auto',
        },
        logoutButton: {
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.textPrimary,
            width: '100%',
        },
        logoutButtonText: {
            fontSize: 18,
            color: colors.textPrimary

        },
    });
};

export default DrawerComponent;
