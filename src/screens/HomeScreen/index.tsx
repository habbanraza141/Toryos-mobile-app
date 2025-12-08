import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import HeaderComp from "../../components/HeaderComp";
import Card from "../../components/Card";
import TextAreaComp from "../../components/TextAreaComp";
import Button from "../../components/Button";
import { ColorPalette, getColors } from "../../theme/colors";
import { shadows } from "../../theme/shadows";
import { useTheme } from "../../hooks/useTheme";
import SpaceComponent from "../../components/SpaceComponent";
import PostOptionsModal from "../../components/PostOptionsModal";
import ModalComp from "../../components/ModalComp";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";

interface Post {
    id: string;
    author: string;
    authorInitials: string;
    authorImage?: any;
    group: string;
    timeAgo: string;
    createdAt: Date;
    content: string;
    link?: string;
    reactions: number;
    comments: number;
    reactionEmoji?: string;
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

const HomeScreen = () => {
    const theme = useTheme();
    const isDark = theme === 'dark';
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const navigation = useNavigation();

    // Static posts with timestamps (for alpha version)
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

    const [posts, setPosts] = useState<Post[]>([
        {
            id: '1',
            author: 'Qitmeer Raza',
            authorInitials: 'QR',
            group: 'Company / Social',
            timeAgo: '4 days ago',
            createdAt: fourDaysAgo,
            content: 'test',
            reactions: 1,
            comments: 2,
            reactionEmoji: '🥹'
        },
        {
            id: '2',
            author: 'Tyler Morton',
            authorImage: require('../../assets/images/image.jpg'),
            group: 'Company / Announcements',
            timeAgo: '4 days ago',
            createdAt: fourDaysAgo,
            content: 'COE Final Deadline, 2025 Leadership Academy, RAGC Events, Professional Development, Advocacy News, Upcoming Events and more',
            link: 'https://qc5mddq5.r.us-east-1.awstrack.me/L0/https:%2F%2Fportal.cincyrealtoralliance.com%2Fcourses-and-events%3Fevent_id=3ac96ec0-6bce-11f0-bf07-b7fd97ccfbfe/1/01000199e7551d6c-911afcdc-647b-49f6-a5f9-0647e397dc6c-000000/4JZKXAfnQzYUBgZlk6Fzg-l9CwU=448',
            reactions: 0,
            comments: 2,
            reactionEmoji: '👍🏻',
            authorInitials: ""
        }
    ]);

    const [newPostText, setNewPostText] = useState('');
    const [optionsModalVisible, setOptionsModalVisible] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editPostText, setEditPostText] = useState('');

    const handlePublish = () => {
        if (newPostText.trim() && currentUser) {
            const now = new Date();
            const newPost: Post = {
                id: Date.now().toString(),
                author: currentUser.name,
                authorInitials: currentUser.initials || currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase(),
                group: 'Personal',
                timeAgo: 'Just now',
                createdAt: now,
                content: newPostText.trim(),
                reactions: 0,
                comments: 0
            };
            setPosts([newPost, ...posts]);
            setNewPostText('');
        }
    };

    const handleOpenOptions = (postId: string) => {
        setSelectedPostId(postId);
        setOptionsModalVisible(true);
    };

    const handleEdit = () => {
        const post = posts.find(p => p.id === selectedPostId);
        if (post) {
            setEditPostText(post.content);
            setEditModalVisible(true);
        }
    };

    const handleSaveEdit = () => {
        if (editPostText.trim() && selectedPostId) {
            setPosts(posts.map(post =>
                post.id === selectedPostId
                    ? { ...post, content: editPostText.trim() }
                    : post
            ));
            setEditPostText('');
            setEditModalVisible(false);
            setSelectedPostId(null);
        }
    };

    const handleDelete = () => {
        if (selectedPostId) {
            setPosts(posts.filter(post => post.id !== selectedPostId));
            setSelectedPostId(null);
        }
    };

    const handleBookmark = () => {
        console.log('Bookmark post:', selectedPostId);
    };
    const renderPost = (post: Post) => (
        <Card key={post.id}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    {post.authorImage ? (
                        <View style={{ width: 50, height: 50 }}>
                            <Image
                                style={{ width: 50, height: 50, borderRadius: 25 }}
                                source={post.authorImage}
                                resizeMode="cover"
                            />
                        </View>
                    ) : (
                        <View style={{ backgroundColor: colors.primary, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                            <TextComp zero bold style={{ color: colors.textPrimary, textAlign: 'center', fontSize: 16 }}>
                                {post.authorInitials}
                            </TextComp>
                        </View>
                    )}
                    <View style={{ justifyContent: 'space-between' }}>
                        <TextComp bold>{post.author}</TextComp>
                        <TextComp fontSize={12}>{post.group}</TextComp>
                        <TextComp fontSize={12}>{formatTimeAgo(post.createdAt)}</TextComp>
                    </View>
                </View>
                <TouchableOpacity onPress={() => handleOpenOptions(post.id)}>
                    <Image
                        source={require('../../assets/icons/threedots.png')}
                        style={{ tintColor: colors.white }}
                    />
                </TouchableOpacity>
            </View>
            <TextComp>{post.content}</TextComp>
            {post.link && (
                <TextComp style={{ color: colors.textPrimary, fontStyle: 'italic' }}>
                    {post.link}
                </TextComp>
            )}
            <SpaceComponent />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={[post.reactions > 0 && { padding: 10, backgroundColor: colors.reaction, borderRadius: 20 }, !post.reactions && { padding: 10 }]}>
                    <TextComp>
                        {post.reactionEmoji || '👍🏻'}  {post.reactions > 0 ? `${post.reactions} reaction${post.reactions > 1 ? 's' : ''}` : 'React'}
                    </TextComp>
                </View>
                <View style={{ padding: 10 }}>
                    <TextComp>💬  {post.comments} comment{post.comments !== 1 ? 's' : ''}</TextComp>
                </View>
                <View style={{ padding: 10 }}>
                    <TextComp>➢  Share</TextComp>
                </View>
            </View>
        </Card>
    );

    return (
        <BackgroundContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <HeaderComp title="All Posts" />
                        <TextComp>Posts from all your groups and spaces</TextComp>
                    </View>

                    <Card>
                        <TextAreaComp
                            placeholder="Share an update"
                            value={newPostText}
                            onChangeText={setNewPostText}
                        />
                        <Button title="Publish" onPress={handlePublish} />
                    </Card>

                    {posts.map(renderPost)}
                </View>
            </ScrollView>

            <PostOptionsModal
                visible={optionsModalVisible}
                onClose={() => {
                    setOptionsModalVisible(false);
                    setSelectedPostId(null);
                }}
                onBookmark={handleBookmark}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ModalComp
                isVisible={editModalVisible}
                onClose={() => {
                    setEditModalVisible(false);
                    setEditPostText('');
                    setSelectedPostId(null);
                }}
                style={styles.editModalContainer}
            >
                <View style={styles.editModalContent}>
                    <TextComp bold style={styles.editModalTitle}>Edit Post</TextComp>
                    <TextAreaComp
                        placeholder="Edit your post"
                        value={editPostText}
                        onChangeText={setEditPostText}
                        inputStyle={styles.editTextArea}
                    />
                    <View style={styles.editButtonContainer}>
                        <Button
                            title="Cancel"
                            variant="link"
                            onPress={() => {
                                setEditModalVisible(false);
                                setEditPostText('');
                                setSelectedPostId(null);
                            }}
                            btnStyle={styles.cancelButton}
                        />
                        <Button
                            title="Save"
                            onPress={handleSaveEdit}
                            btnStyle={styles.saveButton}
                        />
                    </View>
                </View>
            </ModalComp>
        </BackgroundContainer>
    )
}

const createStyleSheet = (colors: ColorPalette) => {
    return StyleSheet.create({
        topContainer: {
            gap: 5
        },
        container: {
            gap: 20
        },
        editModalContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        editModalContent: {
            backgroundColor: colors.secondaryBackground,
            borderRadius: 16,
            padding: 20,
            width: '90%',
            maxWidth: 400,
            gap: 16,
        },
        editModalTitle: {
            fontSize: 20,
            marginBottom: 8,
        },
        editTextArea: {
            minHeight: 100,
        },
        editButtonContainer: {
            flexDirection: 'row',
            gap: 12,
            justifyContent: 'flex-end',
        },
        cancelButton: {
            flex: 1,
        },
        saveButton: {
            flex: 1,
        },
    });
};

export default HomeScreen