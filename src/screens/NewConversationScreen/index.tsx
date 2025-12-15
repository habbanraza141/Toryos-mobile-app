import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import BackButton from "../../components/BackButton";
import SearchBarComp from "../../components/SearchBarComp";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import HeaderComp from "../../components/HeaderComp";

interface Contact {
    id: string;
    name: string;
    email: string;
    initials: string;
    profileImage?: any;
}

type ConversationType = 'direct' | 'group';

const NewConversationScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const navigation = useNavigation();
    const [conversationType, setConversationType] = useState<ConversationType>('direct');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());

    const [contacts] = useState<Contact[]>([
        { id: '1', name: 'Abby Graeter', email: 'remaxgraeter@gmail.com', initials: 'AG' },
        { id: '2', name: 'Admin User', email: 'admin.user@gmail.com', initials: 'AU' },
        { id: '3', name: 'Amy Ogletree', email: 'transactions@miamivalleysold.com', initials: 'AO' },
        { id: '4', name: 'Awais', email: 'contactatmuhammadawais@gmail.com', initials: 'A' },
        { id: '5', name: 'Carl Kappes', email: 'carl@carlkappes.com', initials: 'CK' },
        { id: '6', name: 'Jane Agent', email: 'jane.agent@gmail.com', initials: 'JA' },
        { id: '7', name: 'John Doe', email: 'john.doe@gmail.com', initials: 'JD' },
        { id: '8', name: 'Kent Dailey', email: 'kentdailey@rmxnky.com', initials: 'KD' },
        { id: '9', name: 'Kristy Dailey', email: 'kristy.dailey@gmail.com', initials: 'KA' },
        { id: '10', name: 'Kyle Art', email: 'kyleart1@gmail.com', initials: 'KA' },
        { id: '11', name: 'Mark Burger', email: 'burgerman2@sbcglobal.net', initials: 'MB' },
    ]);

    const filteredContacts = contacts.filter(contact => {
        const searchLower = searchQuery.toLowerCase();
        return (
            contact.name.toLowerCase().includes(searchLower) ||
            contact.email.toLowerCase().includes(searchLower)
        );
    });

    const handleContactToggle = (contactId: string) => {
        if (conversationType === 'direct') {
            setSelectedContacts(new Set([contactId]));
        } else {
            const newSelected = new Set(selectedContacts);
            if (newSelected.has(contactId)) {
                newSelected.delete(contactId);
            } else {
                newSelected.add(contactId);
            }
            setSelectedContacts(newSelected);
        }
    };

    const handleStartConversation = () => {
        if (selectedContacts.size > 0) {
            console.log('Start conversation with:', Array.from(selectedContacts));
            navigation.goBack();
        }
    };

    const renderContact = (contact: Contact) => {
        const isSelected = selectedContacts.has(contact.id);
        return (
            <TouchableOpacity
                key={contact.id}
                style={styles.contactItem}
                onPress={() => handleContactToggle(contact.id)}
                activeOpacity={0.7}
            >
                <View style={styles.avatarContainer}>
                    {contact.profileImage ? (
                        <Image
                            source={contact.profileImage}
                            style={styles.avatarImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
                            <TextComp bold style={styles.avatarText}>
                                {contact.initials}
                            </TextComp>
                        </View>
                    )}
                </View>
                <View style={styles.contactInfo}>
                    <TextComp fontSize={16} style={styles.contactName}>
                        {contact.name}
                    </TextComp>
                    <TextComp fontSize={14} color="muted" style={styles.contactEmail}>
                        {contact.email}
                    </TextComp>
                </View>
                {isSelected && (
                    <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                        <TextComp bold style={styles.checkmarkText}>✓</TextComp>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <BackgroundContainer>
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackButton />
                    <HeaderComp title="New Conversation" />


                </View>

                <View style={styles.segmentedControl}>
                    <TouchableOpacity
                        style={[
                            styles.segment,
                            conversationType === 'direct' && styles.segmentActive
                        ]}
                        onPress={() => {
                            setConversationType('direct');
                            setSelectedContacts(new Set());
                        }}
                        activeOpacity={0.7}
                    >
                        <Image
                            source={require('../../assets/icons/message.png')}
                            style={[
                                styles.segmentIcon,
                                { tintColor: conversationType === 'direct' ? colors.textPrimary : colors.iconBackground }
                            ]}
                        />
                        <TextComp
                            fontSize={14}
                            style={[
                                styles.segmentText,
                                conversationType === 'direct' && styles.segmentTextActive
                            ]}
                        >
                            Direct Message
                        </TextComp>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.segment,
                            conversationType === 'group' && styles.segmentActive
                        ]}
                        onPress={() => {
                            setConversationType('group');
                            setSelectedContacts(new Set());
                        }}
                        activeOpacity={0.7}
                    >
                        <Image
                            source={require('../../assets/icons/members.png')}
                            style={[
                                styles.segmentIcon,
                                { tintColor: conversationType === 'group' ? colors.textPrimary : colors.iconBackground }
                            ]}
                        />
                        <TextComp
                            fontSize={14}
                            style={[
                                styles.segmentText,
                                conversationType === 'group' && styles.segmentTextActive
                            ]}
                        >
                            Group Chat
                        </TextComp>
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <SearchBarComp
                        placeholderText="Search contacts..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                </View>

                <ScrollView
                    style={styles.contactsList}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredContacts.length > 0 ? (
                        filteredContacts.map(renderContact)
                    ) : (
                        <View style={styles.emptyState}>
                            <TextComp fontSize={14} color="muted">
                                No contacts found
                            </TextComp>
                        </View>
                    )}
                </ScrollView>

                {/* Start Conversation Button */}
                {selectedContacts.size > 0 && (
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.startButton, { backgroundColor: colors.primary }]}
                            onPress={handleStartConversation}
                            activeOpacity={0.8}
                        >
                            <TextComp bold fontSize={16} style={styles.startButtonText}>
                                {conversationType === 'direct'
                                    ? 'Start Conversation'
                                    : `Start Group Chat (${selectedContacts.size})`}
                            </TextComp>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </BackgroundContainer>
    );
};

const createStyleSheet = (colors: ColorPalette) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 4,
            marginBottom: 20,
            gap: 12,

        },
        headerTitle: {
            // flex: 1,
            // textAlign: 'center',
            // color: colors.textPrimary,
        },
        closeButton: {
            padding: 4,
            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
        },
        closeIcon: {
            width: 20,
            height: 20,
        },
        segmentedControl: {
            flexDirection: 'row',
            gap: 12,
            marginBottom: 20,
        },
        segment: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.bottomTabsBorder,
            backgroundColor: colors.secondaryBackground,
            gap: 8,
        },
        segmentActive: {
            backgroundColor: colors.primaryLight,
            borderColor: colors.primaryLight,
        },
        segmentIcon: {
            width: 18,
            height: 18,
        },
        segmentText: {
            fontSize: 14,
            color: colors.default,
        },
        segmentTextActive: {
            color: colors.textPrimary,
            fontWeight: '600',
        },
        searchContainer: {
            marginBottom: 16,
        },
        contactsList: {
            flex: 1,
        },
        contactItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 4,
            borderBottomWidth: 1,
            borderBottomColor: colors.bottomTabsBorder,
        },
        avatarContainer: {
            marginRight: 12,
        },
        avatar: {
            width: 48,
            height: 48,
            borderRadius: 24,
            justifyContent: 'center',
            alignItems: 'center',
        },
        avatarImage: {
            width: 48,
            height: 48,
            borderRadius: 24,
        },
        avatarText: {
            color: colors.primaryDark,
            fontSize: 16,
        },
        contactInfo: {
            flex: 1,
        },
        contactName: {
            // color: colors.textPrimary,
            marginBottom: 4,
        },
        contactEmail: {
            color: colors.muted,
        },
        checkmark: {
            width: 24,
            height: 24,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
        },
        checkmarkText: {
            color: '#FFFFFF',
            fontSize: 14,
        },
        emptyState: {
            paddingVertical: 40,
            alignItems: 'center',
        },
        footer: {
            paddingVertical: 16,
            paddingHorizontal: 4,
            borderTopWidth: 1,
            borderTopColor: colors.bottomTabsBorder,
        },
        startButton: {
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
        },
        startButtonText: {
            color: '#FFFFFF',
        },
    });

export default NewConversationScreen;

