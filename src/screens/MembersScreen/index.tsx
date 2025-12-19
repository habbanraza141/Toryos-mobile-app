import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import HeaderComp from "../../components/HeaderComp";
import Card from "../../components/Card";
import Button from "../../components/Button";
import SearchBarComp from "../../components/SearchBarComp";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import BackButton from "../../components/BackButton";
import { useNavigation } from "@react-navigation/native";

interface Member {
    id: string;
    name: string;
    role: string;
    email: string;
    phone?: string;
    description?: string;
    initials: string;
    profileImage?: any;
}

const MembersScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");

    const members: Member[] = [
        { id: '1', name: 'Abby Graeter', role: 'Admin', email: 'remaxgraeter@gmail.com', initials: 'AG' },
        { id: '2', name: 'Admin User', role: 'Admin, Agent', email: 'admin.user@gmail.com', initials: 'AU' },
        { id: '3', name: 'Amy Ogletree', role: 'Agent', email: 'transactions@miamivalleysold.com', initials: 'AO' },
        { id: '4', name: 'Awais', role: 'Admin', email: 'contactatmuhammadawais@gmail.com', initials: 'A' },
        { id: '5', name: 'Carl Kappes', role: 'Agent', email: 'carl@carlkappes.com', initials: 'CK' },
        { id: '6', name: 'HARIS', role: 'Global Admin, Admin', email: 'iharisimran@gmail.com', phone: '+923117769834', description: 'Veniam voluptate mo', initials: 'H' },
        { id: '7', name: 'Jane Agent', role: 'Agent', email: 'jane.agent@gmail.com', initials: 'JA' },
        { id: '8', name: 'John Doe', role: 'Admin', email: 'john.doe@gmail.com', initials: 'JD' },
        { id: '9', name: 'Kent Dailey', role: 'Admin', email: 'kentdailey@rmxnky.com', initials: 'KD' },
    ];

    const filteredMembers = members.filter(member => {
        const searchLower = searchQuery.toLowerCase();
        return (
            member.name.toLowerCase().includes(searchLower) ||
            member.role.toLowerCase().includes(searchLower) ||
            member.email.toLowerCase().includes(searchLower)
        );
    });

    const handleMessage = (memberId: string) => {
        // TODO: Navigate to conversation with this member
        console.log('Message member:', memberId);
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const renderMemberCard = (member: Member) => (
        <Card key={member.id} otherStyle={styles.memberCard}>
            <View style={styles.memberContent}>
                <View style={styles.avatarContainer}>
                    {member.profileImage ? (
                        <Image
                            source={member.profileImage}
                            style={styles.avatarImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
                            <TextComp bold style={styles.avatarText}>
                                {member.initials}
                            </TextComp>
                        </View>
                    )}
                </View>
                <TextComp bold fontSize={16} style={styles.memberName}>
                    {member.name}
                </TextComp>
                {member.role && (
                    <TextComp fontSize={14} style={[styles.memberRole, { color: colors.text }]}>
                        {member.role}
                    </TextComp>
                )}
                <TouchableOpacity
                    style={[styles.messageButton, { borderColor: colors.text }]}
                    onPress={() => handleMessage(member.id)}
                    activeOpacity={0.7}
                >
                    <Image
                        source={require('../../assets/icons/message.png')}
                        style={[styles.messageIcon, { tintColor: colors.text }]}
                    />
                    <TextComp fontSize={14} style={[styles.messageButtonText, { color: colors.text }]}>
                        Message
                    </TextComp>
                </TouchableOpacity>
                {/* <View style={styles.contactInfo}>
                    <View style={styles.contactRow}>
                        <Image
                            source={require('../../assets/icons/message.png')}
                            style={[styles.contactIcon, { tintColor: colors.primary }]}
                        />
                        <TextComp fontSize={12} color="muted" style={styles.contactText}>
                            {member.email}
                        </TextComp>
                    </View>
                    {member.phone && (
                        <View style={styles.contactRow}>
                            <Image
                                source={require('../../assets/icons/message.png')}
                                style={[styles.contactIcon, { tintColor: colors.primary }]}
                            />
                            <TextComp fontSize={12} color="muted" style={styles.contactText}>
                                {member.phone}
                            </TextComp>
                        </View>
                    )}
                    {member.description && (
                        <TextComp fontSize={12} color="muted" style={styles.descriptionText}>
                            {member.description}
                        </TextComp>
                    )}
                </View> */}
            </View>
        </Card>
    );

    return (
        <BackgroundContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <BackButton />
                        <View style={styles.headerContent}>
                            <HeaderComp title="Members" />
                            <TextComp fontSize={14} color="muted">
                                Connect with team members and colleagues
                            </TextComp>
                        </View>
                    </View>

                    <View style={styles.searchContainer}>
                        <SearchBarComp
                            placeholderText="Search members by name, role, or office..."
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                    </View>

                    <View style={styles.membersGrid}>
                        {filteredMembers.map(renderMemberCard)}
                    </View>
                </View>
            </ScrollView>
        </BackgroundContainer>
    );
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_GAP = 12;
const CONTAINER_PADDING = 20;
const CARD_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING * 2 - CARD_GAP) / 2;

const createStyleSheet = (colors: ColorPalette) =>
    StyleSheet.create({
        container: {
            gap: 20,
            paddingBottom: 20,
            // paddingHorizontal: CONTAINER_PADDING,
        },
        headerContainer: {
            gap: 12,
        },
        headerContent: {
            gap: 4,
        },
        searchContainer: {
            width: '100%',
        },
        membersGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: CARD_GAP,
        },
        memberCard: {
            width: CARD_WIDTH,
            // padding: 12,
            alignItems: 'center',
        },
        memberContent: {
            width: '100%',
            alignItems: 'center',
            gap: 6,
        },
        avatarContainer: {
            marginBottom: 4,
        },
        avatar: {
            width: 56,
            height: 56,
            borderRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
        },
        avatarImage: {
            width: 56,
            height: 56,
            borderRadius: 28,
        },
        avatarText: {
            color: colors.primaryDark,
            fontSize: 18,
        },
        memberName: {
            color: colors.text,
            textAlign: 'center',
        },
        memberRole: {
            textAlign: 'center',
        },
        messageButton: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
            borderWidth: 1,
            backgroundColor: colors.secondaryBackground,
            marginTop: 4,
        },
        messageIcon: {
            width: 14,
            height: 14,
        },
        messageButtonText: {
            fontSize: 12,
        },
        contactInfo: {
            width: '100%',
            gap: 4,
            marginTop: 4,
        },
        contactRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
        },
        contactIcon: {
            width: 12,
            height: 12,
        },
        contactText: {
            flex: 1,
            fontSize: 11,
        },
        descriptionText: {
            fontSize: 11,
            marginTop: 2,
        },
    });

export default MembersScreen;

