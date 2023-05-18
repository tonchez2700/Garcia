import React, { useContext } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { navigationRef } from '../helpers/rootNavigation';

import { Provider as RegistrationProvider } from '../context/RegistrationContext';
import { Context as AuthContext } from '../context/AuthContext';

import HomeScreen from './HomeScreen';

import ShoppingHome from './Shopping/ShoppingHome';

import tw from 'tailwind-react-native-classnames';
import Images from '@assets/images';
import NavBar from '../components/NavBar'
import SimpleNavBar from '../components/SimpleNavBar'


const Drawer = createDrawerNavigator();

const WrapperInnerScreens = () => {

    const { signout } = useContext(AuthContext);
    const CustomDrawerContent = (props) => {
        return (
            <View style={[tw`flex-1`, { backgroundColor: '#ECECEC' }]}>
                <SimpleNavBar />
                <DrawerContentScrollView {...props}
                    style={{ paddingVertical: 0, marginTop: -5, backgroundColor: '#ECECEC' }}>
                    <DrawerItem
                        label="Inicio"
                        onPress={() => props.navigation.navigate('HomeScreen')}
                    />
                    <DrawerItem
                        label="Salir"
                        onPress={() => {
                            signout()
                            props.navigation.closeDrawer()
                        }}
                    />
                </DrawerContentScrollView>
            </View>
        )
    }

    return (
        <SafeAreaView style={[tw`flex-1 `]}>
            <RegistrationProvider>
                <Drawer.Navigator
                    screenOptions={{
                        drawerActiveBackgroundColor: '#005691',
                        drawerInactiveBackgroundColor: '#FFFFFF',
                        drawerActiveTintColor: '#FFFFFF',
                        drawerInactiveTintColor: '#23233C',
                        header: (...props) => (

                            <NavBar navigation={props[0].navigation} />
                        )
                    }}
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                    initialRouteName='HomeScreen'
                    useLegacyImplementation>
                    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
                </Drawer.Navigator>
            </RegistrationProvider>
        </SafeAreaView>
    )
}

export default WrapperInnerScreens

const styles = StyleSheet.create({
    card_content: {
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 20,
        shadowColor: 'black',
    },
    content_text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})