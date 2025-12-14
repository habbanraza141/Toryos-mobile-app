import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import SearchBarComp from "../../components/SearchBarComp";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import { shadows } from "../../theme/shadows";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MessagesStackParamList } from "../../navigation/MessagesStack";
import HeaderComp from "../../components/HeaderComp";

interface Conversation {
    id: string;
    name: string;
    email?: string;
    initials: string;
    lastMessage: string;
    lastMessageTime: Date;
    unreadCount: number;
}

// Helper function to format time ago
const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'Just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
        return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
};

type MessagesScreenNavigationProp = NativeStackNavigationProp<MessagesStackParamList, 'MessagesScreen'>;

const MessagesScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const navigation = useNavigation<MessagesScreenNavigationProp>();
    const [searchQuery, setSearchQuery] = useState("");

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const [conversations] = useState<Conversation[]>([
        {
            id: '1',
            name: 'Qitmeer Raza',
            initials: 'QR',
            lastMessage: 'Voice call (17s)',
            lastMessageTime: twoDaysAgo,
            unreadCount: 2,
        },
        {
            id: '2',
            name: 'toryos2025@gmail.com',
            email: 'toryos2025@gmail.com',
            initials: 'T',
            lastMessage: '',
            lastMessageTime: new Date(),
            unreadCount: 0,
        },
    ]);

    const filteredConversations = conversations.filter(conv => {
        const searchLower = searchQuery.toLowerCase();
        return (
            conv.name.toLowerCase().includes(searchLower) ||
            (conv.email && conv.email.toLowerCase().includes(searchLower)) ||
            conv.lastMessage.toLowerCase().includes(searchLower)
        );
    });

    const handleNewConversation = () => {
        navigation.navigate('NewConversation');
    };

    const handleConversationPress = (conversation: Conversation) => {
        console.log('Open conversation:', conversation.id);
    };

    const renderConversation = (conversation: Conversation) => (
        <TouchableOpacity
            key={conversation.id}
            style={styles.conversationItem}
            onPress={() => handleConversationPress(conversation)}
            activeOpacity={0.7}
        >
            <View style={styles.avatarContainer}>
                <View style={[styles.avatar, { backgroundColor: colors.primaryLight }]}>
                    <TextComp bold style={styles.avatarText}>
                        {conversation.initials}
                    </TextComp>
                </View>
            </View>
            <View style={styles.conversationContent}>
                <View style={styles.conversationHeader}>
                    <TextComp bold fontSize={16} style={styles.conversationName}>
                        {conversation.name}
                    </TextComp>
                    {conversation.lastMessageTime && conversation.lastMessage && (
                        <TextComp fontSize={12} color="muted" style={styles.timeAgo}>
                            {formatTimeAgo(conversation.lastMessageTime)}
                        </TextComp>
                    )}
                </View>
                {conversation.lastMessage ? (
                    <View style={styles.conversationFooter}>
                        <TextComp fontSize={14} color="muted" style={styles.lastMessage}>
                            {conversation.lastMessage}
                        </TextComp>
                        {conversation.unreadCount > 0 && (
                            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                                <TextComp bold fontSize={12} style={styles.badgeText}>
                                    {conversation.unreadCount} new
                                </TextComp>
                            </View>
                        )}
                    </View>
                ) : null}
            </View>
        </TouchableOpacity>
    );

    return (
        <BackgroundContainer>
            <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.topContainer}>
                    <HeaderComp title="Messages" />
                    <TextComp fontSize={14} color="muted">Start a conversation today and build connections</TextComp>
                </View>

                <View style={styles.content}>
                    <Button
                        title="+ New Conversation"
                        onPress={handleNewConversation}
                    />

                    <View style={styles.searchContainer}>
                        <SearchBarComp
                            placeholderText="Search messages and attachments..."
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                    </View>

                    <View style={styles.conversationsContainer}>
                        {filteredConversations.length > 0 ? (
                            filteredConversations.map(renderConversation)
                        ) : (
                            <View style={styles.emptyState}>
                                <TextComp fontSize={14} color="muted">
                                    No conversations found
                                </TextComp>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </BackgroundContainer>
    );
};

const createStyleSheet = (colors: ColorPalette) =>
    StyleSheet.create({
        scrollContainer: {
            flex: 1,
        },
        scrollContent: {
            paddingBottom: 20,
        },
        topContainer: {
            marginBottom: 20,
            gap: 5,
        },
        header: {
            // paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.bottomTabsBorder,
        },
        headerContent: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        title: {
            color: colors.textPrimary,
        },
        closeButton: {
            padding: 4,
        },
        closeIcon: {
            width: 20,
            height: 20,
        },
        content: {
            gap: 16,
        },
        newConversationButton: {
            backgroundColor: colors.primary,
            borderRadius: 8,
            paddingVertical: 12,
            marginBottom: 16,
        },
        newConversationButtonText: {
            color: colors.textPrimary,
            fontSize: 16,
            fontWeight: '600',
        },
        searchContainer: {
            marginBottom: 8,
        },
        conversationsContainer: {
            marginTop: 8,
        },
        conversationItem: {
            flexDirection: 'row',
            paddingVertical: 16,
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
        avatarText: {
            color: colors.primary,
            fontSize: 16,
        },
        conversationContent: {
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 4,
        },
        conversationHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
        },
        conversationName: {
            color: colors.textPrimary,
            flex: 1,
        },
        timeAgo: {
            marginLeft: 8,
        },
        conversationFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 2,
        },
        lastMessage: {
            flex: 1,
            marginRight: 8,
        },
        badge: {
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
            minWidth: 50,
            alignItems: 'center',
            justifyContent: 'center',
        },
        badgeText: {
            color: '#FFFFFF',
            fontSize: 12,
        },
        emptyState: {
            paddingVertical: 40,
            alignItems: 'center',
        },
    });

export default MessagesScreen;

