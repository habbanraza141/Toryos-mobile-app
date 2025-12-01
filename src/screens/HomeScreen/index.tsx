import React from "react";
import { StyleSheet, View } from "react-native";
import TextComp from "../../components/TextComp";
import BackgroundContainer from "../../components/BackgroundContainer";
import HeaderComp from "../../components/HeaderComp";
import Card from "../../components/Card";
import TextAreaComp from "../../components/TextAreaComp";
import Button from "../../components/Button";
import { ColorPalette, getColors } from "../../theme/colors";
import { shadows } from "../../theme/shadows";
import { useTheme } from "../../hooks/useTheme";

const HomeScreen = () => {
    const theme = useTheme();
    const isDark = theme === 'dark';
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    return (
        <BackgroundContainer>
            <View style={styles.container} >
                <View style={styles.topContainer} >
                    <HeaderComp title="All Posts" />
                    <TextComp>Posts from all your groups and spaces</TextComp>
                </View>


                <Card >
                    <TextAreaComp placeholder="Share an update" />
                    <Button title="Publish" />
                </Card>
            </View>

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
    });
};

export default HomeScreen