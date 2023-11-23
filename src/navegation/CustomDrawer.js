import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Context as AuthContext } from './../context/AuthContext';
import DrawerNavigator from './DrawerNavigator';
import MapScreen from '../screens/MapScreen';
import UserScreen from '../screens/UserScreen';
import NavBar from '../components/NavBar';
import HomeScreen from './../screens/HomeScreen'

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
    const { signout } = useContext(AuthContext);


    return (
        <Drawer.Navigator
            screenOptions={{
                animationTypeForReplace: 'pop',
                drawerActiveBackgroundColor: '#1E0554',
                drawerInactiveBackgroundColor: '#FFFFFF',
                drawerActiveTintColor: '#FFFFFF',
                drawerInactiveTintColor: '#23233C',
                drawerLabelStyle: {
                    fontSize: 15,
                },
                header: (...props) => (
                    <NavBar navigation={props[0].navigation} />
                )
            }}
            drawerContent={props => <DrawerNavigator {...props} />}
            initialRouteName='Mapa'
            >
            <Drawer.Screen name="Mapa" component={MapScreen} />
            <Drawer.Screen name='Perfil' component={UserScreen} />

        </Drawer.Navigator>
    )
}

export default CustomDrawer