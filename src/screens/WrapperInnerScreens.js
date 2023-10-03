import React, { useContext } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { navigationRef } from '../helpers/rootNavigation';
import { Icon } from 'react-native-elements';
import { Provider as LocationProvider } from '../context/LocationContext';
import { Context as AuthContext } from '../context/AuthContext';
import CustomDrawer from '../navegation/CustomDrawer';
import tw from 'tailwind-react-native-classnames';

const Drawer = createDrawerNavigator();

const WrapperInnerScreens = () => {



    return (
        <LocationProvider>
            <CustomDrawer />
        </LocationProvider>
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