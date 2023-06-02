import React, { useContext } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { navigationRef } from '../helpers/rootNavigation';

import { Provider as RegistrationProvider } from '../context/RegistrationContext';
import { Context as AuthContext } from '../context/AuthContext';

import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';

import tw from 'tailwind-react-native-classnames';
import Images from '@assets/images';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavBar from '../components/NavBar'
import SimpleNavBar from '../components/SimpleNavBar'
import UserScreen from './UserScreen';

const Drawer = createDrawerNavigator();

const WrapperInnerScreens = () => {

    const { signout } = useContext(AuthContext);
    const CustomDrawerContent = (props) => {
        return (
            <View style={[tw`flex-1`, { backgroundColor: '#fff' }]}>
                {
                    Platform.OS === "android" ? <SimpleNavBar /> : null
                }
                <DrawerContentScrollView {...props}
                    style={{ paddingVertical: 0, marginTop: -5, backgroundColor: '#fff' }}>
                    <DrawerItem
                        label="Mapa"
                        onPress={() => props.navigation.navigate('MapScreen')}
                    />
                    <DrawerItem
                        label="Mi perfil"
                        onPress={() => props.navigation.navigate('UserScreen')}
                    />
                    <DrawerItem
                        label="Salir"
                        onPress={() => {
                            signout()
                            props.navigation.closeDrawer()
                        }}
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="exit-run" size={24} color="#1E0554" />
                        )}
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
                        animationTypeForReplace: 'pop',
                        drawerActiveBackgroundColor: '#005691',
                        drawerInactiveBackgroundColor: '#FFFFFF',
                        drawerActiveTintColor: '#FFFFFF',
                        drawerInactiveTintColor: '#23233C',
                        header: (...props) => (

                            <NavBar navigation={props[0].navigation} />
                        )
                    }}
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                    initialRouteName='MapScreen'
                    useLegacyImplementation>
                    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
                    <Drawer.Screen name="MapScreen" component={MapScreen} />
                    <Drawer.Screen name='UserScreen' component={UserScreen} />
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