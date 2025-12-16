import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import TextComp from "../../components/TextComp";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { ColorPalette, getColors } from "../../theme/colors";
import { useTheme } from "../../hooks/useTheme";

const TutorialSettingsScreen = () => {
    const theme = useTheme();
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);

    const [tutorialProgress] = useState(8);
    const totalSteps = 11;

    return (
        <Card otherStyle={styles.sectionCard}>
            <TextComp bold fontSize={18}>Welcome Tutorial</TextComp>
            <TextComp fontSize={14} color="muted">
                Take a guided tour of the platform features
            </TextComp>

            <View style={styles.tutorialHeader}>
                <View style={styles.tutorialHeaderLeft}>
                    <Image
                        source={require('../../assets/icons/light.png')}
                        style={[styles.tutorialIcon, { tintColor: colors.primary }]}
                    />
                    <TextComp bold fontSize={16}>Getting Started</TextComp>
                </View>
                <TextComp fontSize={14} color="muted">{tutorialProgress}/{totalSteps}</TextComp>
            </View>

            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${(tutorialProgress / totalSteps) * 100}%`, backgroundColor: colors.primary }]} />
            </View>

            <View style={styles.stepsList}>
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                    <View key={step} style={styles.stepItem}>
                        <View style={[
                            styles.stepCircle,
                            step <= tutorialProgress
                                ? { backgroundColor: colors.primary }
                                : { backgroundColor: colors.muted35, borderWidth: 1, borderColor: colors.bottomTabsBorder }
                        ]}>
                            {step <= tutorialProgress && (
                                <TextComp style={styles.stepCheckmark} color="white">✓</TextComp>
                            )}
                        </View>
                        <TextComp fontSize={14}>Step {step}</TextComp>
                    </View>
                ))}
            </View>

            <Button
                title="Restart Tour"
                leftImage={require('../../assets/icons/light.png')}
            />
        </Card>
    );
};

const createStyleSheet = (colors: ColorPalette) =>
    StyleSheet.create({
        sectionCard: {
            gap: 20,
        },
        tutorialHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
        },
        tutorialHeaderLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        tutorialIcon: {
            width: 20,
            height: 20,
        },
        progressBarContainer: {
            height: 8,
            backgroundColor: colors.muted35,
            borderRadius: 4,
            marginTop: 12,
            overflow: 'hidden',
        },
        progressBar: {
            height: '100%',
            borderRadius: 4,
        },
        stepsList: {
            gap: 12,
            marginTop: 16,
        },
        stepItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        stepCircle: {
            width: 24,
            height: 24,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
        },
        stepCheckmark: {
            fontSize: 14,
        },
    });

export default TutorialSettingsScreen;

