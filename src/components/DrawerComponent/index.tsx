import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, View, } from 'react-native';
import TextComp from '../TextComp';

// interface DrawerTypes {
//     onPress: () => void;
//     label: string
// }

const DrawerComponent = (navigation: any) => {


    return (
        <DrawerContentScrollView style={{ backgroundColor: '#F5F5F5' }} >
            <View style={{ padding: 20 }}>
                {/* <Image
          style={{height: 60, width: 60, marginRight: 15}}
          source={require('../assets/icons/profile3.png')}
        /> */}
                <TextComp
                    style={{
                        fontSize: 20,
                        color: '#000',
                        fontWeight: 'bold',
                        marginTop: 10,
                    }}>
                    fullName
                </TextComp>
                <TextComp fontSize={12}
                    style={{ color: '#000' }}>
                    email
                </TextComp>
            </View>
            <View style={{ height: 0.5, backgroundColor: '#9A9A9A', marginBottom: 15 }}></View>

            <DrawerItem
                label="Home"
                labelStyle={styles.labelStyle}
                onPress={() => navigation.navigate('TabRoutes', {
                    screen: 'Home',
                    params: { screen: 'Bookmark' }
                })}
            />
            <DrawerItem
                label="Event"
                labelStyle={styles.labelStyle}
                onPress={() => navigation.navigate('TabRoutes', {
                    screen: 'Event',
                    params: { screen: 'EventScreen' }
                })}
            />
            <DrawerItem
                label="Schedule"
                labelStyle={styles.labelStyle}
                onPress={() => navigation.navigate('TabRoutes', {
                    screen: 'Schedule',
                    params: { screen: 'ScheduleScreen' }
                })}
            />
            <DrawerItem
                label="MoreStack"
                labelStyle={styles.labelStyle}
                onPress={() => navigation.navigate('TabRoutes', {
                    screen: 'MoreStack',
                    params: { screen: 'SearchScreen' }
                })} />

        </DrawerContentScrollView>
    );
};

export default DrawerComponent;

const styles = StyleSheet.create({
    labelStyle: {
        color: '#707070',
        fontWeight: 'bold',
    },
});