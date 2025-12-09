import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import HeaderComp from "../../components/HeaderComp";
import BackButton from "../../components/BackButton";
import Card from "../../components/Card";
import TextInputComp from "../../components/TextInputComp";
import TextAreaComp from "../../components/TextAreaComp";
import Button from "../../components/Button";
import SpaceComponent from "../../components/SpaceComponent";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EventStackParamList } from "../../navigation/EventStack";

type CreateEventNavigationProp = NativeStackNavigationProp<EventStackParamList, 'CreateEvent'>;

const CreateEventScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    const navigation = useNavigation<CreateEventNavigationProp>();

    const [space, setSpace] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [startTime, setStartTime] = useState('12:00 PM');
    const [endTime, setEndTime] = useState('01:00 PM');
    const [coverImage, setCoverImage] = useState<any>(null);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleCreateEvent = () => {
        const newErrors: Record<string, string> = {};

        if (!space.trim()) {
            newErrors.space = 'Please select a space';
        }
        if (!eventTitle.trim()) {
            newErrors.eventTitle = 'Event title is required';
        }
        if (!eventDate.trim()) {
            newErrors.eventDate = 'Event date is required';
        }
        if (!startTime.trim()) {
            newErrors.startTime = 'Start time is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // TODO: Handle event creation
        console.log('Creating event:', {
            space,
            eventTitle,
            eventDetails,
            eventDate,
            startTime,
            endTime,
            coverImage,
        });

        // Navigate back after creation
        navigation.goBack();
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <BackgroundContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <BackButton />
                        <HeaderComp title="Create Event" />
                    </View>
                    <TextComp fontSize={14} color="muted" style={styles.subtitle}>
                        Add event details to your post. This will appear in the events calendar.
                    </TextComp>

                    <SpaceComponent />

                    <View style={styles.formCard}>
                        {/* Choose a Space */}
                        <View style={styles.fieldContainer}>
                            <TextComp fontSize={14} bold>
                                Choose a Space <TextComp color="danger">*</TextComp>
                            </TextComp>
                            <TouchableOpacity style={styles.selectInput}>
                                <TextComp fontSize={14} color={"muted"}>
                                    {space || "Select a space to post in"}
                                </TextComp>
                                <Image
                                    source={require('../../assets/icons/rightArrow.png')}
                                    style={[styles.chevronIcon, { tintColor: colors.iconBackground }]}
                                />
                            </TouchableOpacity>
                            {errors.space && (
                                <TextComp fontSize={12} color="danger" style={styles.errorText}>
                                    {errors.space}
                                </TextComp>
                            )}
                        </View>


                        {/* Event Title */}
                        <View style={styles.fieldContainer}>
                            <TextComp fontSize={14} bold>
                                Event Title <TextComp color="danger">*</TextComp>
                            </TextComp>
                            <TextInputComp
                                placeholderText="Enter event title"
                                value={eventTitle}
                                onChangeText={setEventTitle}
                                showToggleImage={false}
                            />
                            {errors.eventTitle && (
                                <TextComp fontSize={12} color="danger" style={styles.errorText}>
                                    {errors.eventTitle}
                                </TextComp>
                            )}
                        </View>


                        {/* Event Details */}
                        <View style={styles.fieldContainer}>
                            <TextComp fontSize={14} bold>Event Details</TextComp>
                            <TextAreaComp
                                placeholder="Add a description of the event..."
                                value={eventDetails}
                                onChangeText={setEventDetails}
                                inputStyle={styles.textArea}
                            />
                        </View>


                        {/* Cover Image */}
                        <View style={styles.fieldContainer}>
                            <TextComp fontSize={14} bold>Cover Image</TextComp>
                            <TouchableOpacity style={styles.imageUploadContainer}>
                                <View style={styles.imagePlaceholder}>
                                    <TextComp fontSize={18}>📷</TextComp>
                                    <TextComp fontSize={14} color="muted">Upload cover image</TextComp>
                                </View>
                            </TouchableOpacity>

                        </View>


                        {/* Event Date */}
                        <View style={styles.fieldContainer}>
                            <TextComp fontSize={14} bold>
                                Event Date <TextComp color="danger">*</TextComp>
                            </TextComp>
                            <TouchableOpacity style={styles.dateTimeInput}>
                                <Image
                                    source={require('../../assets/icons/clock.png')}
                                    style={[styles.inputIcon, { tintColor: colors.iconBackground }]}
                                />
                                <TextComp fontSize={14} color={"muted"}>
                                    {eventDate || "Pick a date"}
                                </TextComp>
                            </TouchableOpacity>
                            {errors.eventDate && (
                                <TextComp fontSize={12} color="danger" style={styles.errorText}>
                                    {errors.eventDate}
                                </TextComp>
                            )}
                        </View>


                        {/* Start Time */}
                        <View style={styles.fieldContainer}>
                            <TextComp fontSize={14} bold>
                                Start Time <TextComp color="danger">*</TextComp>
                            </TextComp>
                            <TouchableOpacity style={styles.dateTimeInput}>
                                <TextComp fontSize={14} color={"muted"}>
                                    {startTime || "12:00 PM"}
                                </TextComp>
                                <Image
                                    source={require('../../assets/icons/clock.png')}
                                    style={[styles.inputIcon, { tintColor: colors.iconBackground }]}
                                />
                            </TouchableOpacity>
                            {errors.startTime && (
                                <TextComp fontSize={12} color="danger" style={styles.errorText}>
                                    {errors.startTime}
                                </TextComp>
                            )}
                        </View>


                        {/* End Time */}
                        <View style={styles.fieldContainer}>
                            <TextComp fontSize={14} bold>End Time</TextComp>
                            <TouchableOpacity style={styles.dateTimeInput}>
                                <TextComp fontSize={14} color={"muted"}>
                                    {endTime || "01:00 PM"}
                                </TextComp>
                                <Image
                                    source={require('../../assets/icons/clock.png')}
                                    style={[styles.inputIcon, { tintColor: colors.iconBackground }]}
                                />
                            </TouchableOpacity>
                        </View>


                        {/* Action Buttons */}
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Cancel"
                                onPress={handleCancel}
                                outlined
                                btnStyle={styles.cancelButton}
                            />
                            <Button
                                title="Create Event and Publish"
                                onPress={handleCreateEvent}
                                btnStyle={styles.createButton}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </BackgroundContainer>
    );
};

const createStyleSheet = (colors: ColorPalette) => {
    return StyleSheet.create({
        container: {
            // padding: 20,
            gap: 20,
        },
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        subtitle: {
            marginTop: 8,
        },
        formCard: {
            gap: 20,
        },
        fieldContainer: {
            gap: 8,
        },
        selectInput: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.secondaryBackground,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.bottomTabsBorder,
        },
        chevronIcon: {
            width: 16,
            height: 16,
            transform: [{ rotate: '90deg' }],
        },
        textArea: {
            minHeight: 100,
        },
        imageUploadContainer: {
            width: '100%',
        },
        imagePlaceholder: {
            width: '100%',
            minHeight: 200,
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: colors.bottomTabsBorder,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.secondaryBackground,
            padding: 20,
        },
        imageButtons: {
            flexDirection: 'row',
            gap: 12,
        },
        chooseImageButton: {
            padding: 12,
            backgroundColor: colors.secondaryBackground,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.bottomTabsBorder,
        },
        dateTimeInput: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.secondaryBackground,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.bottomTabsBorder,
        },
        inputIcon: {
            width: 20,
            height: 20,
        },
        errorText: {
            marginTop: 4,
        },
        buttonContainer: {
            flexDirection: 'row',
            gap: 12,
            marginTop: 8,
        },
        cancelButton: {
            flex: 1,
        },
        createButton: {
            flex: 2,
        },
    });
};

export default CreateEventScreen;

