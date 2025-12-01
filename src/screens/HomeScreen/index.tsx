import React from "react";
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

const HomeScreen = () => {
    const theme = useTheme();
    const isDark = theme === 'dark';
    const colors = getColors(theme);
    const styles = createStyleSheet(colors);
    return (
        <BackgroundContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container} >
                    <View style={styles.topContainer} >
                        <HeaderComp title="All Posts" />
                        <TextComp>Posts from all your groups and spaces</TextComp>
                    </View>


                    <Card >
                        <TextAreaComp placeholder="Share an update" />
                        <Button title="Publish" />
                    </Card>
                    <Card >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', gap: 10 }}>

                                <View style={{ backgroundColor: colors.primary, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                                    <TextComp zero bold style={{ color: colors.textPrimary, textAlign: 'center', fontSize: 16 }}>QR</TextComp>
                                </View>
                                <View style={{ justifyContent: 'space-between' }}>
                                    <TextComp bold >Qitmeer Raza</TextComp>
                                    <TextComp fontSize={12} >Company / Social</TextComp>
                                    <TextComp fontSize={12} >4 days ago</TextComp>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Image source={require('../../assets/icons/threedots.png')} style={{ tintColor: colors.white }} />
                            </TouchableOpacity>
                        </View>
                        <TextComp>test</TextComp>
                        <SpaceComponent />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            <View style={{ padding: 10, backgroundColor: colors.reaction, borderRadius: 20 }}>
                                {/* <Image source={require('../../assets/icons/threedots.png')} style={{ tintColor: colors.white }} /> */}
                                <TextComp>🥹  1 reaction</TextComp>
                            </View>
                            <View style={{ padding: 10 }}>
                                <TextComp>💬  2 comments</TextComp>
                            </View>
                            <View style={{ padding: 10 }}>
                                <TextComp>➢  Share</TextComp>
                            </View>
                        </View>
                    </Card>
                    <Card >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', gap: 10 }}>

                                <View style={{ width: 50, height: 50 }}>
                                    <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={require('../../assets/images/image.jpg')} resizeMode="cover" />

                                </View>
                                <View style={{ justifyContent: 'space-between' }}>
                                    <TextComp bold >Qitmeer Raza</TextComp>
                                    <TextComp fontSize={12} >Company / Social</TextComp>
                                    <TextComp fontSize={12} >4 days ago</TextComp>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Image source={require('../../assets/icons/threedots.png')} style={{ tintColor: colors.white }} />
                            </TouchableOpacity>
                        </View>
                        <TextComp>COE Final Deadline, 2025 Leadership Academy, RAGC Events, Professional
                            Development, Advocacy News, Upcoming Events and more</TextComp>
                        <TextComp style={{ color: colors.textPrimary, fontStyle: 'italic' }}>
                            https://qc5mddq5.r.us-east-1.awstrack.me/L0/https:%2F%2Fportal.cincyrealtoralliance.com%2Fcourses-and-events%3Fevent_id=3ac96ec0-6bce-11f0-bf07-b7fd97ccfbfe/1/01000199e7551d6c-911afcdc-647b-49f6-a5f9-0647e397dc6c-000000/4JZKXAfnQzYUBgZlk6Fzg-l9CwU=448
                        </TextComp>
                        <SpaceComponent />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            <View style={{ padding: 10 }}>
                                {/* <Image source={require('../../assets/icons/threedots.png')} style={{ tintColor: colors.white }} /> */}
                                <TextComp>👍🏻  React</TextComp>
                            </View>
                            <View style={{ padding: 10 }}>
                                <TextComp>💬  2 comments</TextComp>
                            </View>
                            <View style={{ padding: 10 }}>
                                <TextComp>➢  Share</TextComp>
                            </View>
                        </View>
                    </Card>
                </View>
            </ScrollView>

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