import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableOpacity,
    Text, ActivityIndicator, Animated
} from 'react-native';
import { Context as RegistrationContext } from '../../context/RegistrationContext';
import { general } from '../../theme/customTheme';
import { Icon, Button, Slider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import MenuItem from '../../components/MenuItem';
import moment from 'moment';

const ShoppingHome = () => {


    const navigation = useNavigation();
    const { state, getCatalog } = useContext(RegistrationContext);
    useEffect(() => {

        const unsubscribe = navigation.addListener('blur', () => {
            getCatalog();
        });
        return unsubscribe;
    }, [navigation]);


    return (
        <View style={{ flex: 1, backgroundColor: '#F7F8FAF', padding: 20, }}>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', padding: 20, borderWidth: 1, borderColor: '#7F7F7F', borderRadius: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', width: '100%' }}>
                    <MenuItem
                        title='SEYES CIRUGÍA'
                        icon='clockcircle'
                        color='#003C71'
                        fontFamily='antdesign'
                        navigateScreen='SurgeryScreen' />
                    <MenuItem
                        title='SEYES HOJA DE CARGO'
                        icon='checklist'
                        color='#003C71'
                        fontFamily='octicon'
                        navigateScreen='ExpedienteRegistrationScreen' />
                    <MenuItem
                        title='LABORATORIO'
                        icon='laboratory'
                        color='#003C71'
                        fontFamily='fontisto'
                        navigateScreen='ShoppingHome' />
                    <MenuItem
                        title='FARMACIA'
                        icon='pill'
                        color='#003C71'
                        fontFamily='material-community'
                        navigateScreen='ShoppingHome' />
                </View>
            </View >
        </View >

    )
}
export default ShoppingHome

const styles = StyleSheet.create({})

